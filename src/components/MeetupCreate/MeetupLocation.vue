<template>
  <div>
    <h1 class="title m-b-sm">What's your new Meetup location?</h1>
    <div class="m-b-lg">
      <span class="subtitle" v-if="location && !locationChangeRequest">{{location}}</span>
      <a v-if="location && !locationChangeRequest" @click="toggleLocation">(change location)</a>
      <a
        v-if="location && locationChangeRequest"
        @click="toggleLocation"
      >(change to current location)</a>
      <input
        v-if="!location || locationChangeRequest"
        v-model="form.location"
        type="text"
        class="input"
        @input="emitFormData"
        @blur="$v.form.location.$touch()"
      />
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      locationChangeRequest: false,
      form: {
        location: null,
      },
    };
  },
  created() {
    if (this.location) {
      this.form.location = this.location;
      this.emitFormData();
    }
  },
  validations: {
    form: {
      location: { required },
    },
  },
  computed: {
    ...mapGetters('meta', ['location']),
  },
  methods: {
    emitFormData() {
      this.$emit('stepUpdated', {
        data: this.form,
        isValid: !this.$v.$invalid,
      });
    },
    toggleLocation() {
      if (this.location) {
        this.form.location = this.location;
        this.emitFormData();
      }
      this.locationChangeRequest = !this.locationChangeRequest;
    },
  },
};
</script>

<style scoped>
.m-b-lg a {
  margin-left: 0.6rem;
}
</style>