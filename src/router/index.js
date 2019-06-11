import Vue from 'vue';
import Router from 'vue-router';

import PageHome from '@/pages/PageHome.vue';
import PageMeetupDetail from '@/pages/PageMeetupDetail.vue';

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
  ],
  mode: 'history',
});

export default router;
