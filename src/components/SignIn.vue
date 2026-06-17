<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
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
  <v-card class="signin-card" elevation="10">
    <div class="card-head">
      <h2>Welcome back</h2>
      <span>Sign in</span>
    </div>

    <v-form @submit.prevent="handleSignIn">
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
        placeholder="••••••••"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-lock-outline"
        hide-details
        class="mb-3"
      />

      <div class="signin-options">
        <v-checkbox
          v-model="rememberMe"
          label="Remember me"
          hide-details
          density="compact"
        />

        <a href="#">Forgot password?</a>
      </div>

      <v-btn
        type="submit"
        block
        size="large"
        class="signin-btn"
        :loading="userStore.loading"
      >
        Sign in
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>

      <p v-if="localError" class="error-message">
        {{ localError }}
      </p>

      <p v-if="userStore.errorMessage" class="error-message">
        {{ userStore.errorMessage }}
      </p>
    </v-form>
  </v-card>
</template>

<style scoped>
.signin-card {
  padding: 28px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.96);
  color: #1a3a5c;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
}

.card-head h2 {
  font-size: 28px;
  color: #1a3a5c;
}

.card-head span {
  font-size: 13px;
  color: #777;
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

.signin-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.signin-options a {
  font-size: 13px;
  color: #2b5f8a;
  text-decoration: none;
  font-weight: 700;
}

.signin-btn {
  height: 52px;
  border-radius: 14px;
  background: #1a3a5c;
  color: white;
  text-transform: none;
  font-weight: 800;
}

.error-message {
  color: #c62828;
  margin-top: 16px;
}
</style>