<script setup>
import { computed, ref } from "vue";

const filter = ref("All");
const newTaskTitle = ref("");

const filterOptions = ["All", "Completed", "Incomplete"];

const tasks = ref([
  {
    id: 1,
    title: "Create Todo UI",
    time: "19:21 PM, 26/05/2026",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React 🖤",
    time: "19:22 PM, 26/05/2026",
    completed: false,
  },
  {
    id: 3,
    title: "Create a react project 👆",
    time: "19:23 PM, 26/05/2026",
    completed: false,
  },
]);

const filteredTasks = computed(() => {
  if (filter.value === "Completed") {
    return tasks.value.filter((task) => task.completed);
  }

  if (filter.value === "Incomplete") {
    return tasks.value.filter((task) => !task.completed);
  }

  return tasks.value;
});

function addTask() {
  if (newTaskTitle.value.trim() === "") return;

  tasks.value.unshift({
    id: Date.now(),
    title: newTaskTitle.value,
    time: new Date().toLocaleString(),
    completed: false,
  });

  newTaskTitle.value = "";
}

function deleteTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

function editTask(task) {
  const updatedTitle = prompt("Edit task", task.title);

  if (updatedTitle && updatedTitle.trim() !== "") {
    task.title = updatedTitle;
  }
}
</script>

<template>
  <v-container class="todo-page">
    <h1 class="todo-title">TODO LIST</h1>

    <v-row class="top-row" align="center">
      <v-col cols="12" md="3">
        <v-btn
          color="primary"
          size="x-large"
          class="add-btn"
          @click="addTask"
        >
          Add Task
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="newTaskTitle"
          label="Add a new task"
          variant="outlined"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="filter"
          :items="filterOptions"
          variant="solo-filled"
          hide-details
          class="filter-select"
        />
      </v-col>
    </v-row>

    <v-card class="tasks-wrapper" elevation="0">
      <v-list class="task-list">
        <v-list-item
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-list-item"
        >
          <v-card
            class="task-card"
            elevation="0"
            :class="{ completed: task.completed }"
          >
            <v-row align="center" no-gutters>
              <v-col cols="1">
                <v-checkbox
                  v-model="task.completed"
                  hide-details
                  color="primary"
                />
              </v-col>

              <v-col cols="8">
                <h3 class="task-title">{{ task.title }}</h3>
                <p class="task-time">{{ task.time }}</p>
              </v-col>

              <v-col cols="3" class="actions">
                <v-btn
                  icon
                  variant="tonal"
                  class="action-btn"
                  @click="deleteTask(task.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn
                  icon
                  variant="tonal"
                  class="action-btn"
                  @click="editTask(task)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.todo-page {
  max-width: 1100px;
  padding-top: 70px;
}

.todo-title {
  text-align: center;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #333645;
  margin-bottom: 65px;
}

.top-row {
  margin-bottom: 28px;
}

.add-btn {
  height: 64px;
  min-width: 160px;
  font-size: 20px;
  font-weight: 700;
  text-transform: none;
  border-radius: 8px;
}

.filter-select {
  font-size: 20px;
}

.tasks-wrapper {
  background: #d9dfdf;
  padding: 24px 28px;
  border-radius: 8px;
}

.task-list {
  background: transparent;
  padding: 0;
}

.task-list-item {
  padding: 0;
  margin-bottom: 22px;
}

.task-list-item:last-child {
  margin-bottom: 0;
}

.task-card {
  background: #f4f7f6;
  padding: 14px 18px;
  border-radius: 4px;
}

.task-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.task-time {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.action-btn {
  border-radius: 6px;
}

.completed .task-title {
  text-decoration: line-through;
}

.completed {
  opacity: 0.75;
}
</style>