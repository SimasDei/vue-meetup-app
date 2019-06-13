<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <form @submit="onSubmit">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autofocus
                    autocomplete="email"
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                  >
                  <div class="form-error" v-if="$v.form.email.$error">
                    <span class="help is-danger" v-if="!$v.form.email.required">Email is Required</span>
                    <span class="help is-danger" v-if="!$v.form.email.email">Invalid email address</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="current-password"
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                  >
                  <div class="form-error" v-if="$v.form.password.$error">
                    <span class="help is-danger">Password is Required</span>
                  </div>
                </div>
              </div>
              <button
                class="button is-block is-info is-large is-fullwidth"
                :disabled="isValid"
              >Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a>Sign In With Google</a> &nbsp;·&nbsp;
            <a>Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      valid: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isValid() {
      return this.$v.form.$invalid;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    onSubmit(e) {
      e.preventDefault();
      if (!this.$v.form.email.$error && !this.$v.form.password.$error) {
        this.login(this.form);
      }
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>