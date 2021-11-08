<template>
  <div class="login mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-8">
        <div v-if="errors" class="alert alert-danger">
          {{ errors }}
        </div>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const blankInputError = ref(null);

    const errors = computed(() => store.state.auth.errors);

    const fireLogin = () => {
      if (email.value === '' || password.value === '') {
        blankInputError.value = true;
        return;
      }

      store.dispatch('auth/loginUser', { email: email.value, password: password.value }).then(() => {
        email.value = '';
        password.value = '';
        router.push({ name: 'Home' });
      }).catch(() => {
        email.value = '';
        password.value = '';
      });
    };

    return {
      email, password, blankInputError, fireLogin, errors,
    };
  },
};
</script>
