import { createStore } from 'vuex';

import menu from './modules/menu';
import auth from './modules/auth';

export default createStore({
  modules: {
    menu,
    auth,
  },
});
