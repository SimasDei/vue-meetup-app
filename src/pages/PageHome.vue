<template>
  <div v-if=" pageLoader_dataLoaded">
    <AppHero/>
    <div class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meetups in "Location"</h1>
          <AppDropdown/>
          <router-link
            tag="button"
            to="/meetups/new"
            class="button is-primary is-pulled-right m-r-sm"
            v-if="user"
          >Create Meetups</router-link>
          <button class="button is-primary is-pulled-right m-r-sm">All</button>
        </div>
        <div class="row columns is-multiline">
          <!-- Meetup -->
          <meetup-item v-for="meetup in meetups" :key="meetup._id" :meetup="meetup"></meetup-item>
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <!-- Category -->
            <category-item v-for="category in categories" :key="category._id" :category="category"></category-item>
          </div>
        </div>
      </section>
    </div>
  </div>
  <app-spinner v-else></app-spinner>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import pageLoader from '@/mixins/pageLoader';

import CategoryItem from '@/components/CategoryItem.vue';
import MeetupItem from '@/components/MeetupItem.vue';

export default {
  name: 'PageHome',
  components: {
    CategoryItem,
    MeetupItem,
  },
  mixins: [pageLoader],
  created() {
    this.fetchMeetups().then(() =>
      this.fetchCategories().then(() =>
        setTimeout(() => {
          this.pageLoader_resolveData();
        }, 1500),
      ),
    );
  },
  computed: {
    ...mapGetters('meetups', ['meetups']),
    ...mapGetters('categories', ['categories']),
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('meetups', ['fetchMeetups']),
    ...mapActions('categories', ['fetchCategories']),
  },
};
</script>
