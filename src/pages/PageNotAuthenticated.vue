<template>
  <div class="container">
    <error-view
      :title="'You are not authorized to access this page'"
      :status="'401'"
      :navigateToPage="'/login'"
      :navigateToText="'Login'"
    ></error-view>
  </div>
</template>

<script>
import ErrorView from '@/components/ErrorView.vue';

export default {
  name: 'PageNotAuthenticated',
  components: {
    ErrorView,
  },
};
</script>
