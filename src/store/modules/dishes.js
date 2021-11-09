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
    addDish({ commit, state }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.from('dishes').insert({
          name: payload.dishName,
          ingredients: payload.dishIngredients,
          menuId: payload.menuId,
        }).then((dish) => {
          if (dish.error) {
            commit('setError', dish.error.message);
            commit('setLoading', false);
            reject(dish.error);
          }
          const newDishesList = [...state.dishes, dish.data[0]];
          commit('setDishes', newDishesList);
          commit('setLoading', false);
          resolve(dish);
        });
      });
    },
    deleteDish({ commit, state }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.from('dishes').delete().eq('id', payload.dishId).then((dish) => {
          if (dish.error) {
            commit('setError', dish.error.message);
            commit('setLoading', false);
            reject(dish.error);
          }

          const dishes = [...state.dishes];
          const filteredDishList = dishes.filter((dishItem) => dishItem.id !== payload.dishId);
          commit('setDishes', filteredDishList);
          commit('setLoading', false);
          resolve(dish);
        });
      });
    },
    deleteDishesOfMenu({ commit }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.from('dishes').delete().eq('menuId', payload.menuId).then((dish) => {
          if (dish.error) {
            commit('setError', dish.error.message);
            commit('setLoading', false);
            reject(dish.error);
          }
          commit('setDishes', []);
          commit('setLoading', false);
          resolve(dish);
        });
      });
    },
  },
};
