<template>
  <div class="menu-list-wrapper mt-5" v-if="!isLoading">
    <div v-if="menuList.length === 0" class="message empty text-center h4">
      Sorry...this is empty
    </div>
    <div v-else-if="errors" class="message error text-center h4">
      {{ errors }}
    </div>
    <div v-else class="menu-list-content">
      <div class="row">
        <div class="col-4" v-for="menu in menuList" :key="menu.id">
          <div class="menu-card-item shadow mx-1 text-center">
            <div class="menu-name pt-4 h5">
              {{ menu.menuName }}
            </div>
            <router-link class="btn btn-outline-primary mt-3" :to="{ name: '' }">Discover</router-link>
            <button @click="deleteMenu(menu.id)" type="button" class="btn btn-outline-danger ms-2 mt-3">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center mt-5">
    <div class="spinner-border" style="width: 3.5em; height: 3.5rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MenuList',
  setup() {
    const store = useStore();

    const menuList = computed(() => store.state.menu.menuList);
    const isLoading = computed(() => store.state.menu.isLoading);
    const errors = computed(() => store.state.menu.errors);

    store.dispatch('menu/fetchMenuList');

    const deleteMenu = (id) => {
      store.dispatch('menu/deleteMenu', id);
    };

    return {
      menuList, errors, isLoading, deleteMenu,
    };
  },
};
</script>
