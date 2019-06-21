<template>
  <form @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input
        v-model="form.title"
        class="input"
        type="text"
        placeholder="Enter Title"
        @blur="$v.form.title.$touch()"
      >
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Starts At</label>
      <input
        v-model="form.startDate"
        class="input"
        type="text"
        placeholder="Starts At"
        @blur="$v.form.startDate.$touch()"
      >
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <input
        v-model="form.timeFrom"
        class="input"
        type="text"
        placeholder="Time From"
        @blur="$v.form.timeFrom.$touch()"
      >
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <input
        v-model="form.timeTo"
        class="input"
        type="text"
        placeholder="Time to"
        @blur="$v.form.timeTo.$touch()"
      >
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <select v-model="form.category" @change="emitFormData" @blur="$v.form.category.$touch()">
            <option :value="null" disabled>Categories</option>
            <option
              v-for="category of categories"
              :value="category"
              :key="category.id"
            >{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {
        title: null,
        startDate: null,
        timeTo: null,
        timeFrom: null,
        category: null,
      },
    };
  },
  validations: {
    form: {
      title: { required },
      startDate: { required },
      category: { required },
      timeTo: { required },
      timeFrom: { required },
    },
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    emitFormData() {
      this.$emit('stepUpdated', {
        data: this.form,
        isValid: !this.$v.$invalid,
      });
    },
  },
};
</script>

<style scoped>
.time-picker {
  display: block;
}
</style>