<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <form @submit="onSubmit">
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.username.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Username"
                    v-model="form.username"
                  >
                  <div class="form-error" v-if="$v.form.username.$error">
                    <span
                      class="help is-danger"
                      v-if="!$v.form.username.required"
                    >Username is Required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.name.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Name"
                    v-model="form.name"
                  >
                  <div class="form-error" v-if="$v.form.name.$error">
                    <span class="help is-danger" v-if="!$v.form.name.required">Name is Required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.email.$touch()"
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    v-model="form.email"
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
                    type="text"
                    placeholder="Avatar"
                    autocomplete
                    v-model="form.avatar"
                  >
                  <div class="form-error" v-if="$v.form.email.$error">
                    <span class="help is-danger" v-if="!$v.form.avatar.url">Invalid URL format</span>
                    <span
                      class="help is-danger"
                      v-if="!$v.form.avatar.supportedFileType"
                    >Invalid file type</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.password.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="new-password"
                    v-model="form.password"
                  >
                  <div class="form-error" v-if="$v.form.password.$error">
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password.required"
                    >Password is Required</span>
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password.minLength"
                    >Password must be at least 6 characters long</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.password2.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Password Confirmation"
                    autocomplete="off"
                    v-model="form.password2"
                  >
                  <div class="form-error" v-if="$v.form.password2.$error">
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password2.required"
                    >Password Confirmation is Required</span>
                    <span
                      class="help is-danger"
                      v-if="!$v.form.password2.sameAs"
                    >Passwords must match</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="button is-block is-info is-large is-fullwidth"
                :disabled="isValid"
              >Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Login</a> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from 'vuelidate/lib/validators';

import { supportedFileType } from '@/helpers/validators';

export default {
  data() {
    return {
      form: {
        username: null,
        name: null,
        email: null,
        avatar: null,
        password: null,
        password2: null,
      },
      valid: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      avatar: {
        url,
        supportedFileType,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      password2: {
        required,
        sameAs: sameAs('password'),
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
    ...mapActions('auth', ['register']),
    onSubmit(e) {
      e.preventDefault();
      this.register(this.form)
        .then(() => this.$router.push('/login'))
        .catch(error => console.log(error));
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