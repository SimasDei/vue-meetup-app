<template>
  <form class="post-create">
    <div class="field">
      <textarea
        v-autoExpand="'¯\\_(ツ)_/¯'"
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
      ></textarea>
      <button :disabled="true" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>
<script>
import autoExpand from '@/directives/autoExpand';

export default {
  name: 'PostCreate',
  directives: { autoExpand },
};
</script>
<style scoped>
.textarea-post {
  padding-bottom: 30px;
}
.post-create {
  margin-bottom: 15px;
}
</style>
