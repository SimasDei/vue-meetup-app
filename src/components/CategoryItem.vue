<template>
  <div
    class="column is-one-quarter is-rounded"
    :key="category._id"
    :style="{'min-height': '160px'}"
  >
    <a href="#">
      <span class="is-primary is-top is-medium tooltip">
        <figure class="image is-4by3 imageFade">
          <img class="is-rounded" :src="category.image" :alt="category.name">
        </figure>
        <div class="subtitle m-t-xs bold">{{category.name | capitalize}}</div>
      </span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'CategoryItem',
  props: ['category'],
};
</script>
<style scoped>
.is-rounded {
  border-radius: 10px !important;
}
</style>
