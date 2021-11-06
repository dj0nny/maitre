import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    menuList: [],
    errors: false,
    successMsg: false,
    isLoading: null,
  },
  actions: {
    async fetchMenuList({ state }) {
      state.errors = false;
      state.isLoading = true;
      try {
        const { data: menus, error } = await supabase.from('menus').select('*');
        if (error) throw error;
        state.menuList = menus;
      } catch (error) {
        state.errors = error.message;
      }
      state.isLoading = false;
    },
    async addMenu({ state }, payload) {
      state.errors = false;
      state.isLoading = true;
      try {
        // console.log('dispatched with', payload);
        const { error } = await supabase.from('menus').insert([
          {
            menuName: payload.menuName,
            menuDescription: payload.menuDescription,
          },
        ]);
        if (error) throw error;
      } catch (error) {
        console.log(error.message);
        state.errors = error.message;
      }
      state.isLoading = false;
    },
  },
};
