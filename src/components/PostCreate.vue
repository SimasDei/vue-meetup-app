<template>
  <form class="post-create" @submit="submitPost">
    <div class="field">
      <textarea
        v-autoExpand="'¯\\_(ツ)_/¯'"
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
        v-model="text"
      ></textarea>
      <button :disabled="!text" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>
<script>
import { mapActions } from 'vuex';

import autoExpand from '@/directives/autoExpand';

export default {
  name: 'PostCreate',
  directives: { autoExpand },
  props: ['threadId'],
  data() {
    return {
      text: null,
    };
  },
  methods: {
    ...mapActions('threads', ['sendPost']),
    submitPost(e) {
      e.preventDefault();
      const formData = {
        text: this.text,
        threadId: this.threadId,
      };
      this.sendPost(formData).then(createdPost => {
        this.$root.socket.emit('meetup/postSave', createdPost);
        this.text = null;
      });
    },
  },
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
