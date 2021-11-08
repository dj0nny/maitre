<template>
  <div class="menu-details mt-5" v-if="!isLoading">
    <div class="row d-flex justify-content-center">
      <div class="col-10">
        <div class="h1">{{ singleMenu.menuName }}</div>
        <div class="menu-description my-3" v-if="singleMenu.menuDescription">
          {{ singleMenu.menuDescription }}
        </div>
        <div class="dishes-list-wrapper my-3">
          <div class="h3">Dishes</div>
          <div v-if="dishesList.length > 0" class="dishes-list">
            <ul class="list-group">
              <li class="list-group-item mt-2" v-for="dish in dishesList" :key="dish.id">
                {{ dish.name }} <br>
                <div class="fst-italic">{{ dish.ingredients }}</div>
              </li>
            </ul>
          </div>
          <div v-else>
            The dishes list is empty 😅
          </div>
        </div>
        <div class="menu-actions mt-3">
          <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addDishModal">Add dish</button>
          <button @click="deleteMenu" type="button" class="btn btn-outline-danger ms-3">Delete menu</button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addDishModal" tabindex="-1" aria-labelledby="addDishModal" aria-hidden="true" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add new dish to {{ singleMenu.menuName }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addDishToMenu">
              <div class="mb-3">
                <label for="dish-name" class="col-form-label">Dish name</label>
                <input type="text" v-model="dishName" class="form-control" v-bind:class="{ 'input-error': blankInputError }" id="dish-name">
              </div>
              <div class="mb-3">
                <label for="dish-ingredients" class="col-form-label">Dish ingredients</label>
                <textarea v-model="dishIngredients" class="form-control" v-bind:class="{ 'input-error': blankInputError }" id="dish-ingredients"></textarea>
              </div>
              <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Add dish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
  <Spinner v-else />
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Spinner from '../components/Spinner.vue';

export default {
  name: 'Menu Details',
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isLoading = computed(() => store.state.menu.isLoading);
    const singleMenu = computed(() => store.state.menu.singleMenu);
    const dishesList = computed(() => store.state.dishes.dishes);

    const { menuId } = route.params;

    const dishName = ref('');
    const dishIngredients = ref('');
    const blankInputError = ref(false);

    store.dispatch('menu/getMenu', { menuId });
    store.dispatch('dishes/getDishes', { menuId });

    const deleteMenu = () => {
      store.dispatch('menu/deleteMenu', { menuId }).then(() => {
        router.push({ name: 'Home' });
      });
    };

    const addDishToMenu = () => {
      console.log(dishName.value, dishIngredients.value);

      if (dishName.value === '' || dishIngredients.value === '') {
        blankInputError.value = true;
        return;
      }
      console.log('aa');
    };

    return {
      isLoading, singleMenu, deleteMenu, menuId, dishName, dishIngredients, addDishToMenu, blankInputError, dishesList,
    };
  },
};
</script>
