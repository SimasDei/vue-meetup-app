<template>
  <div>
    <AppHero/>
    <div class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meetups in "Location"</h1>
          <AppDropdown/>
          <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
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
</template>

<script>
import axios from 'axios';

import CategoryItem from '@/components/CategoryItem.vue';
import MeetupItem from '@/components/MeetupItem.vue';

export default {
  name: 'PageHome',
  components: {
    CategoryItem,
    MeetupItem,
  },
  data() {
    return {
      meetups: [],
      categories: [],
    };
  },
  created() {
    axios
      .get('/api/v1/meetups')
      .then(res => {
        this.meetups = res.data;
      })
      .catch(error => console.log(error));

    axios
      .get('/api/v1/categories')
      .then(res => {
        this.categories = res.data;
      })
      .catch(error => console.log(error));
  },
};
</script>
