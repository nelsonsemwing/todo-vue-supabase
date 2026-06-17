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
  <v-card class="signup-card" elevation="0">
    <v-form @submit.prevent="handleSignUp">
      <label class="field-label">Email</label>
      <v-text-field
        v-model="email"
        type="email"
        placeholder="you@todolist.app"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-email-outline"
        hide-details
        class="mb-4"
      />

      <label class="field-label">Password</label>
      <v-text-field
        v-model="password"
        type="password"
        placeholder="Create a password"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-lock-outline"
        hide-details
        class="mb-4"
      />

      <label class="field-label">Confirm password</label>
      <v-text-field
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-lock-check-outline"
        hide-details
        class="mb-4"
      />

      <v-btn
        type="submit"
        block
        size="large"
        class="signup-btn"
        :loading="userStore.loading"
      >
        Create account
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>

      <p class="terms">
        By creating an account you agree to our Terms and Privacy Policy.
      </p>

      <p v-if="userStore.errorMessage" class="error-message">
        {{ userStore.errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>
    </v-form>
  </v-card>
</template>

<style scoped>
.signup-card {
  background: transparent;
  color: #1a3a5c;
}

.field-label {
  display: block;
  margin-bottom: 7px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  font-weight: 700;
  color: #777;
}

.signup-btn {
  height: 52px;
  border-radius: 14px;
  color: white;
  background: linear-gradient(135deg, #3c9eb0, #6ecbc7);
  text-transform: none;
  font-weight: 800;
}

.terms {
  margin-top: 14px;
  text-align: center;
  font-size: 12px;
  color: #777;
}

.error-message {
  color: #c62828;
  margin-top: 16px;
}

.success-message {
  color: #2e7d32;
  margin-top: 16px;
}
</style>