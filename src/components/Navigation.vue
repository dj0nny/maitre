<template>
  <nav class="bg-light py-3">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-4">
          <div class="h1">Maitre</div>
        </div>
        <div class="col-8">
          <ul class="menu">
            <li class="menu-item">
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li class="menu-item" v-if="user">
              <router-link :to="{ name: 'Create' }">Create</router-link>
            </li>
            <li class="menu-item" v-if="!user">
              <router-link :to="{ name: 'Login' }">Login</router-link>
            </li>
            <li class="menu-item" v-if="!user">
              <router-link :to="{ name: 'Register' }">Register</router-link>
            </li>
            <li class="menu-item" v-if="user">
              <a href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import supabase from '../supabase';

export default {
  name: 'Navigation',
  setup() {
    const store = useStore();

    const user = computed(() => store.state.auth.user);

    const logout = async () => {
      await supabase.auth.signOut();
    };

    return { user, logout };
  },
};
</script>
