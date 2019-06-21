<template>
  <div class="meetup-create-page">
    <AppHero/>
    <section class="section">
      <div class="container">
        <MeetupCreateWizard/>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard';
export default {
  components: {
    MeetupCreateWizard,
  },
  created() {
    if (this.categories.length) {
      return;
    } else this.fetchCategories();
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
  },
};
</script>

<style scoped lang="scss">
.meetup-create-page {
  min-height: 100vh;
}
</style>