<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div>
        <span class="result-title">Location</span>
        <p>{{form.location || 'location'}}</p>
      </div>
      <div>
        <span class="result-title">Title</span>
        <p>{{form.title || 'title'}}</p>
      </div>
      <div>
        <span class="result-title">Start Date</span>
        <p>{{form.startDate || 'Start Date'}}</p>
      </div>
      <div>
        <span class="result-title">From</span>
        <p>{{form.timeFrom || 'From'}}</p>
      </div>
      <div>
        <span class="result-title">To</span>
        <p>{{form.timeTo || 'To'}}</p>
      </div>
      <div>
        <span class="result-title">Category</span>
        <p>{{form.category.name || 'Category'}}</p>
      </div>
      <div>
        <span class="result-title">Image</span>
        <p>{{form.image || 'image'}}</p>
      </div>
      <div>
        <span class="result-title">Short Info</span>
        <p>{{form.shortInfo || 'Short Info'}}</p>
      </div>
      <div>
        <span class="result-title">Description</span>
        <p>{{form.description || 'Description'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupConfirmation',
  props: ['form'],
  validations: {},
};
</script>

<style scoped>
.result-title {
  font-size: 29px;
  font-weight: bold;
}
.result-title + p {
  font-size: 20px;
}
</style>