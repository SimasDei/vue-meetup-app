<template>
  <div class="column is-one-third">
    <router-link class="card large" :to="`/meetups/${meetup._id}`">
      <div class="card-image">
        <figure class="image is-4by3">
          <!-- Meetup image -->
          <img :src="meetup.image" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="level m-b-md">
          <div class="media-left">
            <div class="level-item has-text-centered">
              <div>
                <!-- Meetup Start Date, Format with moment -->
                <p class="title">{{meetup.startDate | formatDate('MMM')}}</p>
                <p class="title">{{meetup.startDate | formatDate('D')}}</p>
              </div>
            </div>
          </div>
          <div class="media-content">
            <!-- Meetup Title -->
            <p class="title is-4 no-padding is-marginless">{{meetup.title}}</p>
            <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
            <!-- Meetup Category -->
            <span class="tag is-success">{{meetup.category.name}}</span>
            <!-- Meetup start date formated, Meetup Location -->
            <p class="subtitle is-7">Tomorrow · {{meetup.location}}</p>
          </div>
        </div>
        <!-- Meetup Description -->
        <div class="content">
          {{meetup.description}}
          <div class="background-icon">
            <span class="icon-twitter"></span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'MeetupItem',
  props: ['meetup'],
};
</script>

