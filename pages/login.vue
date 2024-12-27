<template>
    <div class="flex items-center justify-center w-full min-h-screen">
      <div class="wrapper w-[400px] mx-auto bg-sidebar rounded-xl p-10">
        <h1 class="text-center text-3xl font-bold text-white">Login</h1>
        <form class="flex flex-col gap-4 p-4">
          <Input v-model="nameRef" type="text" placeholder="Name" class="input" />
          <Input v-model="emailRef" type="email" placeholder="Email" class="input" />
          <Input v-model="passwordRef" type="password" placeholder="Password" class="input" />
          <div class="flex justify-center gap-2">
            <Button type="button" size="lg" @click="login">Login</Button>
            <Button type="button" variant="link" size="lg" @click="register">Sign up</Button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from "vue";
import { Account, ID } from "appwrite";
import client from "@/lib/appwrite";

useHead({
title: "Login",
});

const account = new Account(client);

const nameRef = ref("");
const emailRef = ref("");
const passwordRef = ref("");

const isLoading = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const validateEmail = (email) => {
    console.log("Validating email:", email);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email.trim());
    console.log("Email valid:", isValid);
    return isValid;
};
  
const register = async () => {
console.log("Register function called");
try {
    if (!validateEmail(emailRef.value)) {
    throw new Error("Invalid email format");
    }

    console.log("Creating user with email:", emailRef.value, "and password:", passwordRef.value);

    await account.create(ID.unique(), emailRef.value, passwordRef.value, nameRef.value);

    console.log("User registered successfully. Proceeding to login.");
    await login();
} catch (error) {
    if (error.code === 409) {
    console.error("Register error: User already exists. Redirecting to login.");
    await login(); 
    } else if (error.code === 429) {
    console.error("Register error: Rate limit exceeded. Please wait and try again.");
    } else {
    console.error("Register error:", error.message);
    }
}
};
  
const login = async () => {
  try {
    console.log("Login function called");
    console.log("Validating email:", emailRef.value);

    if (!validateEmail(emailRef.value)) {
      throw new Error("Invalid email format");
    }

    // Проверка текущей активной сессии
    console.log("Checking active session...");
    const currentSession = await account.getSession('current');
    if (currentSession) {
      console.log("Active session found:", currentSession);

      // Можно сразу получить данные пользователя, если сессия активна
      const resp = await account.get();
      console.log("User already logged in:", resp);
      authStore.set({
        email: resp.email,
        name: resp.name || "Anonymous",
        status: true,
      });

      // Перенаправление на главную страницу
      await router.push("/");
      return;
    }

    // Если сессия отсутствует, создаём новую
    console.log("Creating session with email:", emailRef.value, "and password:", passwordRef.value);
    const session = await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
    console.log("Session created:", session);

    // Получаем данные пользователя
    const resp = await account.get();
    if (resp) {
      console.log("User logged in:", resp);
      authStore.set({
        email: resp.email,
        name: resp.name || "Anonymous",
        status: true,
      });
    }

    // Очистка полей
    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";

    // Перенаправление на главную страницу
    await router.push("/");
  } catch (error) {
    if (error.message.includes("Creation of a session is prohibited")) {
      console.error("Login error: Active session exists. No need to login again.");
    } else if (error.code === 401) {
      console.error("Login error: Unauthorized. Check your credentials.");
    } else if (error.code === 429) {
      console.error("Login error: Rate limit exceeded. Please wait and try again.");
    } else {
      console.error("Login error:", error.message);
    }
  }
};
</script>
  
  <style lang="scss" scoped>
  .bg-background {
    background-color: transparent;
  }
  </style>