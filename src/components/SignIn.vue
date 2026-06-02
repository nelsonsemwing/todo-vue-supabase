<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const localError = ref("");

const handleSignIn = async () => {
  localError.value = "";
  userStore.errorMessage = "";

  if (!email.value) {
    localError.value = "Email is required.";
    return;
  }

  if (!password.value) {
    localError.value = "Password is required.";
    return;
  }

  await userStore.signIn(email.value, password.value);

  if (userStore.user) {
    router.push("/dashboard");
  }
};
</script>

<template>
  <v-card class="auth-card" elevation="4">
    <h2>Log In</h2>

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

    <v-btn
      color="primary"
      block
      size="large"
      :loading="userStore.loading"
      @click="handleSignIn"
    >
      Log In
    </v-btn>

    <p v-if="localError" class="error-message">
      {{ localError }}
    </p>

    <p v-if="userStore.errorMessage" class="error-message">
      {{ userStore.errorMessage }}
    </p>
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

.error-message {
  color: #c62828;
  margin-top: 16px;
}
</style>