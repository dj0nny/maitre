import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    menuList: [],
    errors: false,
    successMsg: false,
    isLoading: false,
  },
  actions: {
    async fetchMenuList({ state }) {
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
        state.successMsg = 'Menu Created!';
      } catch (error) {
        console.log(error.message);
        state.errors = error.message;
      }
      state.isLoading = false;
    },
  },
};
