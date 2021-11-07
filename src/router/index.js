import { createRouter, createWebHashHistory } from 'vue-router';
// import supabase from '../supabase';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue'),
    meta: {
      title: 'Create Menu',
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register',
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Maitre`;
  next();
});

/* eslint-disable no-unused-vars */
// router.beforeEach((to, from, next) => {
//   const user = supabase.auth.user();
//   if (to.matched.some((res) => res.meta.auth)) {
//     if (user) {
//       next();
//       return;
//     }
//     next({ name: 'Login' });
//     return;
//   }
//   next();
// });

export default router;
