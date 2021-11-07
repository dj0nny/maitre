<template>
  <Navigation />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import supabase from './supabase';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  setup() {
    const store = useStore();

    supabase.auth.onAuthStateChange((_, session) => {
      console.log('session', session);
      store.dispatch('auth/checkUser', session);
    });
  },
};
</script>
