<template>
  <div id="app">
    <TheNavbar/>
    <main class="page-wrapper">
      <router-view></router-view>
    </main>
    <TheFooter/>
  </div>
</template>

<script>
import TheNavbar from '@/components/shared/TheNavbar';
import TheFooter from '@/components/shared/TheFooter';
export default {
  name: 'app',
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import 'assets/css/spacing.css';
@import '~bulma/bulma.sass';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.page-wrapper {
  min-height: 62vh;
}

.bold {
  font-weight: bold;
}
.cover {
  background-size: cover;
  /*background-position: center;*/
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url('https://images.unsplash.com/photo-1560153058-c0b578291652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: 34%;
}
</style>
