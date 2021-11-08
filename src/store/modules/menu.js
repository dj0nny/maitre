import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    menuList: [],
    singleMenu: [],
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
    setMenu(state, payload) {
      state.singleMenu = payload;
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
    addMenu({ commit }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.from('menus').insert({
          menuName: payload.menuName,
          menuDescription: payload.menuDescription,
        }).then((item) => {
          if (item.error) {
            commit('setError', item.error.message);
            commit('setLoading', false);
            reject(item.error);
          }
          commit('setLoading', false);
          resolve(item.data);
        });
      });
    },
    async deleteMenu({ commit, state }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.from('menus').delete().eq('id', payload.menuId).then((menu) => {
          if (menu.error) {
            commit('setError', menu.error.message);
            commit('setLoading', false);
            reject(menu.error);
          }
          const list = [...state.menuList];
          const filteredList = list.filter((menuItem) => menuItem.id !== payload);
          commit('setMenuList', filteredList);
          commit('setLoading', false);
          resolve(menu);
        });
      });
    },
    async getMenu({ commit }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      try {
        const { data: menu, error } = await supabase.from('menus').select('*').eq('id', payload.menuId);
        if (error) throw error;
        commit('setMenu', menu[0]);
      } catch (error) {
        commit('setError', error.message);
      }

      commit('setLoading', false);
    },
  },
};
