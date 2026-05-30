import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
    errorMessage: "",
  }),

  actions: {
    async signUp(email, password) {
      this.loading = true;
      this.errorMessage = "";

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        this.errorMessage = error.message;
      } else {
        this.user = data.user;
      }

      this.loading = false;
    },

    async signIn(email, password) {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        this.errorMessage = error.message;
      } else {
        this.user = data.user;
      }
    },

    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },

    async getUser() {
      const { data } = await supabase.auth.getUser();
      this.user = data.user;
    },
  },
});