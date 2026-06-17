<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import SignUp from "../components/SignUp.vue";
import SignIn from "../components/SignIn.vue";

const hour = ref(new Date().getHours());

let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    hour.value = new Date().getHours();
  }, 60000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const greeting = computed(() => {
  if (hour.value < 12) return "Good morning";
  if (hour.value < 18) return "Good afternoon";
  return "Good evening";
});

const greetingIcon = computed(() => {
  if (hour.value < 12) return "mdi-weather-sunset-up";
  if (hour.value < 18) return "mdi-white-balance-sunny";
  return "mdi-weather-night";
});

const today = computed(() => {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <main class="auth-layout">
    <section class="hero-section">
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>

      <div class="hero-content">
        <header class="brand-row">
          <div class="brand-left">
            <span class="brand-icon">
              <v-icon>mdi-format-list-checks</v-icon>
            </span>
            <span class="brand-text">todo·list</span>
          </div>

          <span class="today-text">{{ today }}</span>
        </header>

        <div class="hero-copy">
          <div class="greeting-pill">
            <v-icon size="18">{{ greetingIcon }}</v-icon>
            {{ greeting }}
          </div>

          <h1>
            The quiet way to
            <span>finish things.</span>
          </h1>

          <p>
            Capture, plan and ship. One list, beautifully out of the way —
            so your day stays in focus.
          </p>
        </div>

        <div class="signin-wrapper">
          <SignIn />
        </div>

        <footer class="hero-footer">
          © {{ new Date().getFullYear() }} TODO-LIST · Built for quiet productivity
        </footer>
      </div>
    </section>

    <aside class="signup-section">
      <div class="signup-top">New here?</div>

      <div class="signup-content">
        <h2>
          Start your<br />
          first list.
        </h2>

        <p class="signup-subtitle">
          Free forever. No clutter. Just the next thing to do.
        </p>

        <ul class="feature-list">
          <li>
            <v-icon size="18">mdi-check-circle-outline</v-icon>
            Unlimited tasks & projects
          </li>
          <li>
            <v-icon size="18">mdi-check-circle-outline</v-icon>
            Daily focus view
          </li>
          <li>
            <v-icon size="18">mdi-check-circle-outline</v-icon>
            Syncs across all your devices
          </li>
        </ul>

        <SignUp />
      </div>

      <div class="signup-footer">
        Vue · Vuetify · Pinia · Supabase
      </div>
    </aside>
  </main>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  background: #f6f8fb;
}

.hero-section {
  position: relative;
  overflow: hidden;
  padding: 56px 64px;
  color: white;
  background: linear-gradient(140deg, #1a3a5c 0%, #2b5f8a 45%, #3c9eb0 100%);
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  pointer-events: none;
}

.orb-one {
  right: -120px;
  top: -120px;
  height: 380px;
  width: 380px;
  background: rgba(110, 203, 199, 0.45);
}

.orb-two {
  left: -90px;
  bottom: -120px;
  height: 420px;
  width: 420px;
  background: rgba(110, 203, 199, 0.2);
}

.hero-content {
  position: relative;
  min-height: calc(100vh - 112px);
  display: flex;
  flex-direction: column;
}

.brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  height: 44px;
  width: 44px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
}

.brand-text {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.75);
}

.today-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.hero-copy {
  max-width: 600px;
  margin-top: 80px;
}

.greeting-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 7px 13px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}

.hero-copy h1 {
  margin-top: 24px;
  font-size: 72px;
  line-height: 1.02;
  font-weight: 800;
}

.hero-copy h1 span {
  display: block;
  font-style: italic;
  color: #6ecbc7;
}

.hero-copy p {
  margin-top: 22px;
  max-width: 460px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.signin-wrapper {
  max-width: 440px;
  margin-top: 46px;
}

.hero-footer {
  margin-top: auto;
  padding-top: 48px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.signup-section {
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.signup-top {
  text-align: right;
  font-size: 13px;
  color: #777;
}

.signup-content h2 {
  font-size: 46px;
  line-height: 1.05;
  color: #1a3a5c;
  margin-bottom: 14px;
}

.signup-subtitle {
  color: #777;
  font-size: 15px;
  margin-bottom: 26px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
}

.feature-list li {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
  font-size: 15px;
  color: #344;
}

.feature-list .v-icon {
  color: #3c9eb0;
}

.signup-footer {
  font-size: 13px;
  color: #777;
}

@media (max-width: 960px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }

  .hero-section,
  .signup-section {
    padding: 36px 24px;
  }

  .hero-copy h1 {
    font-size: 48px;
  }

  .today-text,
  .hero-footer,
  .signup-footer {
    display: none;
  }
}
</style>