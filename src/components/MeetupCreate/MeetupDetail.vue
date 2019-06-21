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
      <label class="title m-b-sm">Start Date</label>
      <vue-datepicker
        :input-class="'input'"
        v-model="form.startDate"
        placeholder="Starts At"
        @blur="$v.form.startDate.$touch()"
        @input="setDate"
        :disabledDates="disabledDates"
      ></vue-datepicker>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <vue-timepicker
        type="text"
        placeholder="Time From"
        @blur="$v.form.timeFrom.$touch()"
        @change="changeTime($event,'timeFrom')"
        :minute-interval="10"
      />
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <vue-timepicker
        type="text"
        placeholder="Time to"
        @blur="$v.form.timeTo.$touch()"
        @change="changeTime($event,'timeTo')"
        :minute-interval="10"
      />
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
import VueDatepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker';
import moment from 'moment';

export default {
  name: 'MeetupDetail',
  components: {
    VueDatepicker,
    VueTimepicker,
  },
  data() {
    return {
      disabledDates: {
        customPredictor(date) {
          const today = new Date();
          const yesterday = today.setDate(today.getDate() - 1);
          return date < yesterday;
        },
      },
      form: {
        title: null,
        startDate: new Date(),
        timeTo: null,
        timeFrom: null,
        category: null,
      },
    };
  },
  created() {
    this.emitFormData();
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
    setDate(date) {
      this.form.startDate = moment(date).format();
      this.emitFormData();
    },
    changeTime({ data }, field) {
      const hours = data.HH || '00';
      const minutes = data.mm || '00';
      this.form[field] = `${hours}:${minutes}`;
      this.emitFormData();
    },
  },
};
</script>

<style scoped>
.time-picker {
  display: block;
}
</style>