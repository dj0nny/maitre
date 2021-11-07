import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    menuList: [],
    errors: false,
    isLoading: null,
  },
  mutations: {
    setError(state, payload) {
      state.errors = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setMenuList(state, payload) {
      state.menuList = payload;
    },
  },
  actions: {
    async fetchMenuList({ commit }) {
      commit('setError', false);
      commit('setLoading', true);
      try {
        const { data: menus, error } = await supabase.from('menus').select('*');
        if (error) throw error;
        commit('setMenuList', menus);
      } catch (error) {
        commit('setError', error.message);
      }
      commit('setLoading', false);
    },
    async addMenu({ commit }, payload) {
      commit('setErrors', false);
      commit('setLoading', true);
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
        // console.log(error.message);
        commit('setErrors', error.message);
      }
      commit('setLoading', false);
    },
    async deleteMenu({ commit, state }, payload) {
      commit('setErrors', false);
      commit('setLoading', true);
      try {
        const { error } = await supabase.from('menus').delete().eq('id', payload);
        if (error) throw error;
      } catch (error) {
        commit('setErrors', error.message);
      }
      const list = [...state.menuList];
      const filteredList = list.filter((menuItem) => menuItem.id !== payload);
      commit('setMenuList', filteredList);
      commit('setLoading', false);
    },
  },
};
