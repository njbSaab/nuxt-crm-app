<template>
    <div class="flex items-center justify-center w-full relative">
      <div class="main-wrapper h-screen w-full flex items-center justify-center">

      
      <div class="main-title absolute top-[60px] flex items-center gap-[10px]">
        <svg data-v-59e6b9e2="" class="" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-59e6b9e2="" d="M56.4706 67.2269H93.7815C94.9722 67.227 96.1117 66.8086 97.1429 66.2185C98.174 65.6284 99.2368 64.8876 99.8319 63.8655C100.427 62.8434 100.841 61.6839 100.84 60.5039C100.84 59.3238 100.428 58.1647 99.8319 57.1431L74.6218 13.7815C74.0268 12.7597 73.2998 12.0186 72.2689 11.4286C71.238 10.8386 69.7618 10.4202 68.5714 10.4202C67.381 10.4202 66.241 10.8386 65.2101 11.4286C64.1792 12.0186 63.4522 12.7597 62.8571 13.7815L56.4706 24.8739L43.6975 3.36055C43.1019 2.33877 42.3757 1.26216 41.3445 0.672269C40.3134 0.0823822 39.1738 0 37.9832 0C36.7926 0 35.653 0.0823822 34.6218 0.672269C33.5907 1.26216 32.5283 2.33877 31.9328 3.36055L0.672269 57.1431C0.0762955 58.1647 0.000518695 59.3238 6.41992e-07 60.5039C-0.000517411 61.6839 0.0771927 62.8433 0.672269 63.8654C1.26735 64.8875 2.33024 65.6284 3.36134 66.2185C4.39245 66.8086 5.53202 67.227 6.72269 67.2269H30.2521C39.5753 67.2269 46.3614 63.0446 51.0924 55.126L62.521 35.2941L68.5714 24.8739L87.0588 56.4706H62.521L56.4706 67.2269ZM29.916 56.4706H13.4454L37.9832 14.1176L50.4202 35.2941L42.1819 49.6554C39.0401 54.7932 35.458 56.4706 29.916 56.4706Z" fill="#00DC82"></path></svg>
        <h1 class="text-4xl font-bold text-white">- CRM</h1>
      </div>

      <div class="wrapper w-[400px] mx-auto bg-sidebar rounded-xl p-10">
        <h2 class="text-center text-3xl font-bold text-white">Login</h2>
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
  .wrapper:hover{
    cursor: pointer;
    box-shadow: 0 0 20px #00DC82;
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(5px);
  }
  .border-input {
	border-color: transparent;
    background: #031728;
    transition: all 0.3s ease-in-out;
 }
 .border-input:hover {  
  border-color: #00dc804e;
  transition: all 0.3s ease-in-out;
 }
 .focus-visible\:ring-2:focus-visible {
	--tw-ring-color: hsl(var(--ring));
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
 }
</style>