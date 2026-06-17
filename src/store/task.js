import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        this.tasks = data;
      }
    },

    async addTask(title, userId) {
      const { error } = await supabase
        .from("tasks")
        .insert([
          {
            title,
            user_id: userId,
            completed: false,
          },
        ]);

      if (!error) {
        await this.fetchTasks();
      }
    },

    async updateTask(id, title) {
      const { error } = await supabase
        .from("tasks")
        .update({ title })
        .eq("id", id);

      if (!error) {
        await this.fetchTasks();
      }
    },

    async toggleComplete(id, completed) {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !completed })
        .eq("id", id);

      if (!error) {
        await this.fetchTasks();
      }
    },

    async deleteTask(id) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (!error) {
        await this.fetchTasks();
      }
    },
  },
});