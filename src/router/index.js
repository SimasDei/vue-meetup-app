import Vue from 'vue';
import Router from 'vue-router';

import PageHome from '@/pages/PageHome.vue';
import PageMeetupDetail from '@/pages/PageMeetupDetail.vue';
import PageMeetupFind from '@/pages/PageMeetupFind.vue';

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
  ],
  mode: 'history',
});

export default router;
