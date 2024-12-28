<template>
    <div class="flex items-center justify-center w-full min-h-screen relative">
      <div class="wrapper w-[400px] mx-auto bg-sidebar rounded-xl p-10">
        <h1 class="text-center text-3xl font-bold text-white">Login</h1>
        <form class="flex flex-col gap-4 p-4 relative">
          <Input v-model="nameRef" type="text" placeholder="Name" class="input" />
          <Input v-model="emailRef" type="email" placeholder="Email" class="input" />
          <Input v-model="passwordRef" type="password" placeholder="Password" class="input" />
          <div v-if="!isLoading" class="flex justify-center gap-2">
            <Button type="button" size="lg" @click="login">Login</Button>
            <Button type="button" variant="link" size="lg" @click="register">Sign up</Button>
          </div>
          <div v-else>
            <Loader />
          </div>
        </form>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from "vue";
  import { Account, ID } from "appwrite";
  import client from "@/lib/appwrite";
  import Loader from "@/components/ui/Loader.vue";
  
  const account = new Account(client);
  const nameRef = ref("");
  const emailRef = ref("");
  const passwordRef = ref("");
  const isLoading = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  
  const clearFields = () => {
    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";
  };
  
  const handleSessionError = async () => {
    try {
      console.log("Deleting current session...");
      await account.deleteSession("current");
      console.log("Session deleted.");
    } catch (error) {
      console.warn("No active session to delete:", error.message);
    }
  };
  
  const register = async () => {
    isLoading.value = true;
    try {
      if (!validateEmail(emailRef.value)) throw new Error("Invalid email format");
      console.log("Registering user...");
      await account.create(ID.unique(), emailRef.value, passwordRef.value, nameRef.value);
      console.log("User registered. Logging in...");
      await login();
    } catch (error) {
      if (error.code === 409) {
        console.warn("User already exists. Attempting login...");
        await login();
      } else {
        console.error("Register error:", error.message);
      }
    } finally {
      isLoading.value = false;
    }
  };
  
  const login = async () => {
    isLoading.value = true;
    try {
      if (!validateEmail(emailRef.value)) throw new Error("Invalid email format");
      await handleSessionError(); // Удаляем активную сессию перед созданием новой
      console.log("Creating session...");
      await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
      const user = await account.get();
      authStore.set({
        email: user.email,
        name: user.name || "Anonymous",
        status: true,
      });
      clearFields();
      await router.push("/");
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      isLoading.value = false;
    }
  };
</script>
  
<style scoped>
  .bg-background {
    background-color: transparent;
  }
</style>