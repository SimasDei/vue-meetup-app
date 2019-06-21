<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">{{currentStep}} of 4</div>
    <!-- Form Steps -->
    <keep-alive>
      <component
        :is="formSteps[currentStep -1]"
        @stepUpdated="mergeStepData"
        ref="currentComponent"
        :form="form"
      />
    </keep-alive>
    <progress class="progress" :value="currentProgress" max="100">{{currentProgress}}</progress>
    <div class="controll-btns m-b-md">
      <button class="button is-primary m-r-sm" @click="moveToPrevStep" v-if="currentStep !== 1">Back</button>
      <button
        class="button is-primary"
        @click="moveToNextStep"
        v-if="currentStep !== allStepsCount"
        :disabled="!canProceed"
      >Next</button>
      <button v-else class="button is-primary" @click="submitData">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import MeetupLocation from './MeetupLocation.vue';
import MeetupDetail from './MeetupDetail.vue';
import MeetupDescription from './MeetupDescription.vue';
import MeetupConfirmation from './MeetupConfirmation.vue';
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation,
  },
  data() {
    return {
      currentStep: 1,
      canProceed: false,
      formSteps: [
        'MeetupLocation',
        'MeetupDetail',
        'MeetupDescription',
        'MeetupConfirmation',
      ],
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null,
      },
    };
  },
  computed: {
    currentProgress() {
      return (100 / this.allStepsCount) * this.currentStep;
    },
    allStepsCount() {
      return this.formSteps.length;
    },
  },
  methods: {
    ...mapActions('meetups', ['createMeetup']),
    mergeStepData(stepData) {
      this.form = {
        ...this.form,
        ...stepData.data,
      };
      this.canProceed = stepData.isValid;
    },
    moveToNextStep() {
      if (this.currentStep >= this.allStepsCount) return;
      this.currentStep++;
      if (this.$refs && this.$refs['currentComponent']) {
        this.$nextTick(
          () => (this.canProceed = this.$refs['currentComponent'].$v.invalid),
        );
      }
    },
    moveToPrevStep() {
      if (this.currentStep === 1) return;
      this.currentStep--;
      this.canProceed = true;
    },
    submitData() {
      this.createMeetup(this.form)
        .then(meetup => this.$router.push(`/meetups/${meetup._id}`))
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}
</style>