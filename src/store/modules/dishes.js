import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    dishes: [],
    isLoading: null,
    errors: false,
  },
  mutations: {
    setError(state, payload) {
      state.errors = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setDishes(state, payload) {
      state.dishes = payload;
    },
  },
  actions: {
    async getDishes({ commit }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      try {
        const { data: dishes, error } = await supabase.from('dishes').select('*').eq('menuId', payload.menuId);
        if (error) throw error;
        commit('setDishes', dishes);
      } catch (error) {
        commit('setError', error.message);
      }
      commit('setLoading', false);
    },
  },
};
