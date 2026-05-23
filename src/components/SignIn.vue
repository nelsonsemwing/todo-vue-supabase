<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSignIn = async () => {
  await userStore.signIn(email.value, password.value);
};
</script>

<template>
  <div>
    <h2>Sign In</h2>

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

    <button @click="handleSignIn">
      Sign In
    </button>

    <p v-if="userStore.errorMessage">
      {{ userStore.errorMessage }}
    </p>
  </div>
</template>