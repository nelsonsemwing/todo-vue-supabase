<script setup>
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";
</script>

<template>
  <v-container class="auth-page">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <h1 class="auth-title">Welcome to Todo App</h1>
        <p class="auth-subtitle">Create an account or sign in to manage your tasks.</p>

        <v-row>
          <v-col cols="12" md="6">
            <SignUp />
          </v-col>

          <v-col cols="12" md="6">
            <SignIn />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding-top: 70px;
}

.auth-title {
  text-align: center;
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 8px;
}

.auth-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}
</style>