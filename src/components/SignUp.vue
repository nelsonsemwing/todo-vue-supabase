<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  await userStore.signUp(email.value, password.value);
};
</script>

<template>
  <div>
    <h2>Sign Up</h2>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <button @click="handleSignUp">
      Sign Up
    </button>

    <p v-if="userStore.errorMessage">
      {{ userStore.errorMessage }}
    </p>
  </div>
</template>