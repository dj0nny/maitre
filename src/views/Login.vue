<template>
  <div class="login mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-8">
        <div class="no-account mb-3">
          Don't have an account? <router-link :to="{ name: 'Register' }">Register here</router-link>
        </div>
        <form @submit.prevent="fireLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" v-model="email" v-bind:class="{ 'input-error': blankInputError }" class="form-control" id="email" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Your email address</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="password" v-bind:class="{ 'input-error': blankInputError }" class="form-control" id="password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const blankInputError = ref(null);

    const fireLogin = () => {
      if (email.value === '' || password.value === '') {
        blankInputError.value = true;
        return;
      }
      console.log(email.value, password.value);
    };

    return {
      email, password, blankInputError, fireLogin,
    };
  },
};
</script>
