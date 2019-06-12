import Vue from 'vue';
import Router from 'vue-router';

import PageHome from '@/pages/PageHome.vue';
import PageMeetupDetail from '@/pages/PageMeetupDetail.vue';
import PageMeetupFind from '@/pages/PageMeetupFind.vue';
import PageLogin from '@/pages/PageLogin.vue';
import PageRegister from '@/pages/PageRegister.vue';
import PageNotFound from '@/pages/PageNotFound.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome,
    },
    {
      path: '/meetups/:id',
      name: 'PageMeetupDetail',
      component: PageMeetupDetail,
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: PageMeetupFind,
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
  mode: 'history',
});

export default router;
