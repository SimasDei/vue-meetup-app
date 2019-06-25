<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title is-4">VueMeetuper</h1>
      </router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleNav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="['navbar-menu', {'is-active': navOpen}]">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>

        <router-link class="navbar-item" to="/find">Find</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" to="/more">More</router-link>

          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/about">About</router-link>
            <router-link class="navbar-item" to="/jobs">Jobs</router-link>
            <router-link class="navbar-item" to="/contact">Contact</router-link>
            <hr class="navbar-divider">
            <router-link class="navbar-item" to="/report">Report an issue</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">Welcome {{user.username}}</div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Account</a>
          <div class="navbar-dropdown">
            <router-link to="/profile" class="navbar-item">Profile</router-link>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="onLogout">Logout</a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown">
          <div class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link to="/login" class="button is-light">Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TheNavbar',
  data() {
    return {
      navOpen: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    onLogout() {
      this.logout()
        .then(() => this.$router.history.push('/login'))
        .catch(error => console.log(error));
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
  },
};
</script>

<style scoped>
</style>
