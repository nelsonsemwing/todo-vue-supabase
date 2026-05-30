<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const successMessage = ref("");

const handleSignUp = async () => {
  userStore.errorMessage = "";
  successMessage.value = "";

  if (!email.value) {
    userStore.errorMessage = "Email is required.";
    return;
  }

  if (!password.value) {
    userStore.errorMessage = "Password is required.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    userStore.errorMessage = "Passwords do not match.";
    return;
  }

  await userStore.signUp(email.value, password.value);

  if (!userStore.errorMessage) {
    successMessage.value =
      "Please check your email and click the confirmation link.";

    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  }
};
</script>

<template>
  <v-card class="pa-6 mb-6">
    <h2 class="mb-4">Create Account</h2>

    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      variant="outlined"
    />

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
    />

    <v-text-field
      v-model="confirmPassword"
      label="Confirm password"
      type="password"
      variant="outlined"
    />

    <v-btn color="primary" block size="large" @click="handleSignUp">
      Register
    </v-btn>

    <p v-if="userStore.errorMessage" class="error-message">
      {{ userStore.errorMessage }}
    </p>

    <p v-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
  </v-card>
</template>

<style scoped>
.error-message {
  color: #c62828;
  margin-top: 16px;
}

.success-message {
  color: #2e7d32;
  margin-top: 16px;
}
</style>