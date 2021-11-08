import { createStore } from 'vuex';

import menu from './modules/menu';
import auth from './modules/auth';
import dishes from './modules/dishes';

export default createStore({
  modules: {
    menu,
    auth,
    dishes,
  },
});
