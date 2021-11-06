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
            <li class="menu-item">
              <router-link :to="{ name: 'Create' }">Create</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: '' }">Login</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: '' }">Register</router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: '' }">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>
