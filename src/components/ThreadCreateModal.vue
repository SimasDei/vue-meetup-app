<template>
  <div>
    <button class="button is-success" @click="toggleModal">{{btnTitle}}</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create</p>
          <button class="delete" aria-label="close" @click="toggleModal"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">What would you like to ask?</label>
              <!-- TODO: Create "form" object in data containing "title" and bind it to textarea -->
              <textarea
                v-model="form.title"
                class="textarea"
                placeholder="Just write something that interest you (:"
                rows="10"
              ></textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <!-- TODO: Emit thread Create -->
          <button class="button is-success" @click="threadSubmitted">Save changes</button>
          <!-- TODO: Close Modal set isOpen to false -->
          <button class="button" @click="toggleModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreadCreateModal',
  props: ['btnTitle', 'title'],
  data() {
    return {
      isOpen: false,
      form: {
        title: null,
      },
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    threadSubmitted() {
      const { title } = this.form;
      this.$emit('threadSubmitted', {
        title,
        done: () => {
          this.isOpen = false;
          this.form.title = null;
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
