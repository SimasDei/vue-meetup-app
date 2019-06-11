<template>
  <div class="container">
    <error-view
      :title="'Ooooops, page you are trying to access doesn\'t exist'"
      :status="'404'"
      :navigateToPage="'/'"
      :navigateToText="'Home'"
    ></error-view>
  </div>
</template>

<script>
import ErrorView from '@/components/ErrorView.vue';

export default {
  name: 'PageNotFoud',
  components: {
    ErrorView,
  },
};
</script>
