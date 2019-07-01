<template>
  <div>
    <button class="button is-primary is-outlined m-t-sm" @click="isOpen = !isOpen">Update Info</button>
    <div :class="['modal', {'is-active': isOpen === true }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button class="delete" aria-label="close" @click="isOpen = !isOpen"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Name</label>
              <input class="input" v-model="user.name" />
            </div>
            <div class="field">
              <label class="title">Username</label>
              <input class="input" v-model="user.username" />
            </div>
            <div class="field">
              <label class="title">Avatar</label>
              <input class="input" v-model="user.avatar" />
            </div>
            <div class="field">
              <label class="title">Info</label>
              <input class="input" v-model="user.info" />
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" @click="isOpen = !isOpen">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserUpdateModal',
  props: ['authUser'],
  data() {
    return {
      isOpen: false,
      user: { ...this.authUser },
    };
  },
};
</script>
