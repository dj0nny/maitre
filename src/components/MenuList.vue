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
            <router-link class="btn btn-outline-primary mt-3" :to="{ name: 'MenuDetails', params: { menuId: menu.id } }">Discover</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-else />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import Spinner from './Spinner.vue';

export default {
  name: 'MenuList',
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();

    const menuList = computed(() => store.state.menu.menuList);
    const isLoading = computed(() => store.state.menu.isLoading);
    const errors = computed(() => store.state.menu.errors);

    store.dispatch('menu/fetchMenuList');

    return {
      menuList, errors, isLoading,
    };
  },
};
</script>
