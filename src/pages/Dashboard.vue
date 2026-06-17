<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

const taskStore = useTaskStore();
const userStore = useUserStore();
const router = useRouter();

const filter = ref("All");
const newTaskTitle = ref("");
const isAdding = ref(false);

const filterOptions = ["All", "Incomplete", "Completed"];

onMounted(async () => {
  await userStore.getUser();
  await taskStore.fetchTasks();
});

const filteredTasks = computed(() => {
  if (filter.value === "Completed") return taskStore.tasks.filter((t) => t.completed);
  if (filter.value === "Incomplete") return taskStore.tasks.filter((t) => !t.completed);
  return taskStore.tasks;
});

const stats = computed(() => {
  const total = taskStore.tasks.length;
  const done = taskStore.tasks.filter((t) => t.completed).length;
  return { total, done, remaining: total - done, percent: total ? Math.round((done / total) * 100) : 0 };
});

const userInitial = computed(() => {
  const e = userStore.user?.email || "?";
  return e.charAt(0).toUpperCase();
});

async function addTask() {
  if (newTaskTitle.value.trim() === "") return;
  isAdding.value = true;
  try {
    await taskStore.addTask(newTaskTitle.value, userStore.user.id);
    newTaskTitle.value = "";
  } finally {
    isAdding.value = false;
  }
}

async function deleteTask(id) {
  await taskStore.deleteTask(id);
}

async function editTask(task) {
  const updatedTitle = prompt("Edit task", task.title);
  if (updatedTitle && updatedTitle.trim() !== "") {
    await taskStore.updateTask(task.id, updatedTitle);
  }
}

async function toggleTask(task) {
  await taskStore.toggleComplete(task.id, task.completed);
}

async function handleLogout() {
  try {
    if (typeof userStore.logout === "function") {
      await userStore.logout();
    } else if (typeof userStore.signOut === "function") {
      await userStore.signOut();
    }
  } finally {
    router.push("/login");
  }
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
</script>

<template>
  <div class="page-shell">
    <!-- Top bar -->
    <header class="topbar">
      <div class="brand">
        <span class="brand-dot" />
        <span class="brand-name">Tasks</span>
      </div>

      <v-menu offset="8">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text" class="user-chip">
            <div class="avatar">{{ userInitial }}</div>
            <span class="user-email d-none d-sm-inline">
              {{ userStore.user?.email || "Account" }}
            </span>
            <v-icon size="18">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list density="comfortable" rounded="lg">
          <v-list-item @click="handleLogout" class="logout-item">
            <template #prepend>
              <v-icon color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </header>

    <v-container class="todo-page">
      <!-- Hero -->
      <section class="hero">
        <p class="eyebrow">Your day, organized</p>
        <h1 class="todo-title">Good to see you back.</h1>
        <p class="subtitle">
          {{ stats.remaining }} task{{ stats.remaining === 1 ? '' : 's' }} left ·
          {{ stats.done }} done · {{ stats.percent }}% complete
        </p>
        <div class="progress">
          <div class="progress-fill" :style="{ width: stats.percent + '%' }" />
        </div>
      </section>

      <!-- Add + filter -->
      <section class="composer">
        <div class="input-wrap">
          <v-icon class="input-icon" size="20">mdi-plus-circle-outline</v-icon>
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="What needs doing?"
            class="task-input"
            @keydown.enter="addTask"
          />
          <v-btn
            class="add-btn"
            :loading="isAdding"
            :disabled="!newTaskTitle.trim()"
            @click="addTask"
          >
            Add
          </v-btn>
        </div>

        <div class="filters">
          <button
            v-for="opt in filterOptions"
            :key="opt"
            class="chip"
            :class="{ 'chip-active': filter === opt }"
            @click="filter = opt"
          >
            {{ opt }}
          </button>
        </div>
      </section>

      <!-- Tasks -->
      <section class="tasks-wrapper">
        <transition name="fade" mode="out-in">
          <div v-if="filteredTasks.length === 0" key="empty" class="empty-state">
            <v-icon size="48" color="grey-lighten-1">mdi-clipboard-text-outline</v-icon>
            <p class="empty-message">Nothing here yet — add your first task above.</p>
          </div>

          <transition-group v-else key="list" name="task" tag="ul" class="task-list">
            <li
              v-for="task in filteredTasks"
              :key="task.id"
              class="task-card"
              :class="{ completed: task.completed }"
            >
              <button
                class="check"
                :class="{ 'check-on': task.completed }"
                :aria-label="task.completed ? 'Mark incomplete' : 'Mark complete'"
                @click="toggleTask(task)"
              >
                <v-icon v-if="task.completed" size="16" color="white">mdi-check</v-icon>
              </button>

              <div class="task-body">
                <p class="task-title">{{ task.title }}</p>
                <p class="task-time">
                  <v-icon size="14">mdi-clock-outline</v-icon>
                  {{ formatDate(task.created_at) }}
                </p>
              </div>

              <div class="actions">
                <button class="icon-btn" @click="editTask(task)" aria-label="Edit">
                  <v-icon size="18">mdi-pencil-outline</v-icon>
                </button>
                <button class="icon-btn danger" @click="deleteTask(task.id)" aria-label="Delete">
                  <v-icon size="18">mdi-trash-can-outline</v-icon>
                </button>
              </div>
            </li>
          </transition-group>
        </transition>
      </section>
    </v-container>
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  background:
    radial-gradient(1000px 500px at 90% -10%, rgba(99, 102, 241, 0.18), transparent 60%),
    radial-gradient(800px 400px at -10% 10%, rgba(236, 72, 153, 0.12), transparent 60%),
    linear-gradient(180deg, #f7f8fc 0%, #eef1f7 100%);
}

/* Topbar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  position: sticky;
  top: 0;
  z-index: 5;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.65);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}
.brand { display: flex; align-items: center; gap: 10px; }
.brand-dot {
  width: 12px; height: 12px; border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  box-shadow: 0 0 14px rgba(99, 102, 241, 0.6);
}
.brand-name { font-weight: 700; letter-spacing: 0.3px; color: #1e293b; }

.user-chip {
  display: flex; align-items: center; gap: 10px;
  border-radius: 999px !important;
  padding: 6px 14px 6px 6px !important;
  text-transform: none !important;
  font-weight: 600;
  color: #334155 !important;
}
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white; display: grid; place-items: center;
  font-weight: 700;
}
.user-email { font-size: 14px; }
.logout-item :deep(.v-list-item-title) { color: #dc2626; font-weight: 600; }

/* Hero */
.todo-page { max-width: 880px; padding-top: 48px; }
.hero { text-align: center; margin-bottom: 36px; }
.eyebrow {
  text-transform: uppercase; letter-spacing: 3px;
  font-size: 12px; color: #6366f1; font-weight: 700; margin-bottom: 8px;
}
.todo-title {
  font-size: 44px; font-weight: 800;
  background: linear-gradient(135deg, #0f172a, #6366f1);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 10px;
}
.subtitle { color: #64748b; font-size: 15px; margin-bottom: 18px; }
.progress {
  max-width: 360px; height: 6px; margin: 0 auto;
  background: rgba(15, 23, 42, 0.08); border-radius: 999px; overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Composer */
.composer {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 30px -18px rgba(15, 23, 42, 0.25);
  margin-bottom: 22px;
}
.input-wrap {
  display: flex; align-items: center; gap: 10px;
  background: #f8fafc; border-radius: 12px;
  padding: 6px 6px 6px 14px;
  transition: box-shadow 0.2s, background 0.2s;
}
.input-wrap:focus-within {
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
}
.input-icon { color: #94a3b8; }
.task-input {
  flex: 1; border: none; outline: none; background: transparent;
  font-size: 16px; padding: 14px 4px; color: #0f172a;
}
.add-btn {
  height: 44px !important;
  border-radius: 10px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  color: white !important;
  box-shadow: 0 8px 20px -8px rgba(99, 102, 241, 0.7);
}
.add-btn:disabled { opacity: 0.5; }

.filters { display: flex; gap: 8px; padding: 12px 4px 2px; }
.chip {
  border: none; cursor: pointer;
  padding: 8px 16px; border-radius: 999px;
  font-size: 13px; font-weight: 600; color: #475569;
  background: transparent; transition: all 0.2s;
}
.chip:hover { background: rgba(99, 102, 241, 0.08); color: #6366f1; }
.chip-active {
  background: #0f172a; color: white;
}

/* Tasks */
.tasks-wrapper {
  display: flex; flex-direction: column; gap: 10px;
}
.empty-state {
  text-align: center; padding: 60px 20px;
  background: white; border-radius: 18px;
  border: 1px dashed rgba(15, 23, 42, 0.12);
}
.empty-message { color: #64748b; font-size: 15px; margin-top: 12px; }

.task-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }

.task-card {
  display: flex; align-items: center; gap: 14px;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  padding: 14px 16px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
}
.task-card:hover {
  transform: translateY(-1px);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 12px 28px -18px rgba(15, 23, 42, 0.35);
}
.check {
  flex-shrink: 0;
  width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid #cbd5e1; background: white;
  display: grid; place-items: center;
  cursor: pointer; transition: all 0.2s;
}
.check:hover { border-color: #6366f1; }
.check-on {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: transparent;
}
.task-body { flex: 1; min-width: 0; }
.task-title {
  font-size: 15px; font-weight: 600; color: #0f172a;
  margin: 0 0 4px; transition: color 0.2s;
}
.task-time {
  font-size: 12px; color: #94a3b8; margin: 0;
  display: flex; align-items: center; gap: 4px;
}
.completed .task-title { text-decoration: line-through; color: #94a3b8; }

.actions { display: flex; gap: 6px; }
.icon-btn {
  width: 34px; height: 34px; border-radius: 8px;
  border: none; background: #f1f5f9; color: #475569;
  display: grid; place-items: center; cursor: pointer;
  transition: all 0.18s;
}
.icon-btn:hover { background: #e2e8f0; color: #0f172a; }
.icon-btn.danger:hover { background: #fee2e2; color: #dc2626; }

/* Transitions */
.task-enter-from { opacity: 0; transform: translateY(-6px); }
.task-leave-to { opacity: 0; transform: translateX(20px); }
.task-enter-active, .task-leave-active { transition: all 0.25s ease; }
.task-move { transition: transform 0.3s ease; }

.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }

@media (max-width: 600px) {
  .todo-title { font-size: 32px; }
  .topbar { padding: 14px 18px; }
}
</style>
