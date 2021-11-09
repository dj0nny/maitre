<template>
    <div class="register mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-8">
        <div v-if="errors" class="alert alert-danger">
          {{ errors }}
        </div>
        <div class="no-account mb-3">
          Already an account? <router-link :to="{ name: 'Login' }">Login here</router-link>
        </div>
        <form @submit.prevent="fireRegister">
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
  name: 'Register',
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const blankInputError = ref(null);

    const isLoading = computed(() => store.state.auth.isLoading);
    const errors = computed(() => store.state.auth.errors);

    const fireRegister = () => {
      if (email.value === '' || password.value === '') {
        blankInputError.value = true;
        return;
      }

      blankInputError.value = false;

      store.dispatch('auth/registerUser', { email: email.value, password: password.value }).then(() => {
        email.value = '';
        password.value = '';
        router.push({ name: 'Home' });
      }).catch(() => {
        email.value = '';
        password.value = '';
      });
    };

    return {
      email, password, blankInputError, fireRegister, isLoading, errors,
    };
  },
};
</script>
