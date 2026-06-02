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
        this.user = null;
      } else {
        this.user = data.user;
      }

      this.loading = false;
    },

    async signIn(email, password) {
      this.loading = true;
      this.errorMessage = "";

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.errorMessage = error.message;
        this.user = null;
      } else {
        this.user = data.user;
      }

      this.loading = false;
    },

    async signOut() {
      this.loading = true;
      this.errorMessage = "";

      const { error } = await supabase.auth.signOut();

      if (error) {
        this.errorMessage = error.message;
      } else {
        this.user = null;
      }

      this.loading = false;
    },

    async getUser() {
      this.loading = true;
      this.errorMessage = "";

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        this.errorMessage = error.message;
        this.user = null;
      } else {
        this.user = data.user;
      }

      this.loading = false;
    },
  },
});