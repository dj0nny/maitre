<template>
  <Navigation />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>
