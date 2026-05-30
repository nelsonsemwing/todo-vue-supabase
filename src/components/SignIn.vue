<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSignIn = async () => {
  await userStore.signIn(email.value, password.value);

  if (userStore.user) {
    router.push("/dashboard");
  }
};
</script>

<template>
  <v-card class="auth-card" elevation="4">
    <h2>Sign In</h2>

    <v-text-field v-model="email" label="Email" type="email" variant="outlined" />

    <v-text-field v-model="password" label="Password" type="password" variant="outlined" />

    <v-btn color="primary" block size="large" @click="handleSignIn">
      Sign In
    </v-btn>
  </v-card>
</template>

<style scoped>
.auth-card {
  padding: 28px;
  border-radius: 16px;
}

h2 {
  margin-bottom: 24px;
}
</style>