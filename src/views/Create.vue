<template>
  <div class="create-wrapper mt-4">
    <div class="row d-flex justify-content-center">
      <div class="col-10">
        <div v-if="successMsg" class="alert alert-success">
          {{ successMsg }}
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
    const menuName = ref(null);
    const menuDescription = ref(null);
    const blankInputError = ref(null);
    const store = useStore();

    const isLoading = computed(() => store.state.menu.isLoading);
    const errors = computed(() => store.state.menu.errors);
    const successMsg = computed(() => store.state.menu.successMsg);

    const addMenuSubmit = async () => {
      if (blankInputError.value !== null) blankInputError.value = null;
      if (menuName.value === '' || menuName.value === null) {
        blankInputError.value = true;
        return;
      }

      await store.dispatch('menu/addMenu', { menuName: menuName.value, menuDescription: menuDescription.value });
      menuName.value = null;
      menuDescription.value = null;
    };

    return {
      menuName, menuDescription, addMenuSubmit, isLoading, errors, blankInputError, successMsg,
    };
  },
};
</script>
