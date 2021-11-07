import supabase from '../../supabase';

export default {
  namespaced: true,
  state: {
    user: null,
    errors: null,
    isLoading: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.errors = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    checkUser({ commit }, payload) {
      commit('setLoading', true);
      commit('setUser', payload);
      commit('setLoading', false);
    },
    registerUser({ commit }, payload) {
      commit('setError', false);
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
        }).then((user) => {
          console.log('resolve', user);
          commit('setUser', user);
          if (user.error) {
            commit('setError', user.error.message);
            commit('setLoading', false);
            reject(user.error);
          }
          commit('setLoading', false);
          resolve(user);
        });
      });
    },
  },
};
