<template>
  <div class="create-wrapper mt-4">
    <div class="row d-flex justify-content-center">
      <div class="col-10">
        <div v-if="successMsg" class="alert alert-success">
            Menu created!
        </div>
        <div v-if="errors" class="alert alert-danger">
          {{ errors }}
        </div>
        <form @submit.prevent="addMenuSubmit">
          <div class="mb-3">
            <label for="menuName" class="form-label">Menu name</label>
            <input type="text" v-model="menuName" class="form-control" v-bind:class="{ 'input-error': blankInputError }" id="menuName" aria-describedby="menuNameHelp">
            <div id="menuNameHelp" class="form-text">The name of the menu</div>
          </div>
          <div class="mb-3">
            <label for="menuDescription" class="form-label">Menu description</label>
            <textarea v-model="menuDescription" class="form-control" id="menuDescription" aria-describedby="menuDescriptionHelp"></textarea>
            <div id="menuDescriptionHelp" class="form-text">The description of the menu</div>
          </div>
          <button type="submit" :disabled="isLoading" class="btn btn-primary">Add menu</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Create',
  setup() {
    const menuName = ref('');
    const menuDescription = ref('');
    const blankInputError = ref(null);
    const successMsg = ref(null);
    const store = useStore();

    const isLoading = computed(() => store.state.menu.isLoading);
    const errors = computed(() => store.state.menu.errors);

    const addMenuSubmit = () => {
      if (blankInputError.value !== null) blankInputError.value = null;
      if (menuName.value === '' || menuName.value === '') {
        blankInputError.value = true;
        return;
      }

      store.dispatch('menu/addMenu', { menuName: menuName.value, menuDescription: menuDescription.value }).then(() => {
        menuName.value = '';
        menuDescription.value = '';
        successMsg.value = true;
      });

      setTimeout(() => {
        successMsg.value = null;
      }, 2500);
    };

    return {
      menuName, menuDescription, addMenuSubmit, isLoading, errors, blankInputError, successMsg,
    };
  },
};
</script>
