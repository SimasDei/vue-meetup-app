<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image header-icon user-profile-image">
              <img class="is-rounded" :src="user.avatar" />
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <span class="title is-bold">{{user.name}}</span>
              <br />
              <!-- Here will be user update functionality -->
              <user-update-modal :authUser="user" @userSubmitted="requestUserUpdate"></user-update-modal>
              <br />
            </p>
            <p class="tagline">{{user.info}}</p>
          </div>
          <div
            :class="{isActive: activeTab === 'meetups'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
            @click="activeTab = 'meetups'"
          >
            <p class="stat-val">{{meetups.count}}</p>
            <p class="stat-key">Meetups</p>
          </div>
          <div
            :class="{isActive: activeTab === 'threads'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
            @click="activeTab = 'threads'"
          >
            <p class="stat-val">{{threads.count}}</p>
            <p class="stat-key">Threads</p>
          </div>
          <div
            :class="{isActive: activeTab === 'posts'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
            @click="activeTab = 'posts'"
          >
            <p class="stat-val">{{posts.count}}</p>
            <p class="stat-key">Posts</p>
          </div>
        </div>
      </div>
      <div class="columns is-mobile is-multiline" v-if="activeTab === 'meetups'">
        <div
          class="column is-3-tablet is-6-mobile"
          v-for="meetup in meetups.data"
          :key="meetup._id"
        >
          <!-- MEETUPS -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="meetup.image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{meetup.title}}</p>
                  <p class="subtitle is-6">
                    <span class="tag is-dark subtitle">{{meetup.category.name}}</span>
                  </p>
                </div>
              </div>
              <div class="content">
                <p>{{meetup.shortInfo}}</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br />
        </div>
      </div>
      <div class="columns is-mobile is-multiline" v-if="activeTab === 'threads'">
        <div
          class="column is-3-tablet is-6-mobile"
          v-for="thread in threads.data"
          :key="thread._id"
        >
          <!-- THREADS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{thread.title}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br />
        </div>
      </div>
      <div class="columns is-mobile is-multiline" v-if="activeTab === 'posts'">
        <div class="column is-3-tablet is-6-mobile" v-for="post in posts.data" :key="post._id">
          <!-- THREADS -->
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{post.text}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import UserUpdateModal from '@/components/UserUpdateModal.vue';

export default {
  name: 'PageProgile',
  components: {
    UserUpdateModal,
  },
  data() {
    return {
      activeTab: 'meetups',
    };
  },
  created() {
    this.fetchUserStats().then(stats => console.log(stats));
  },
  computed: {
    ...mapGetters('stats', ['meetups', 'threads', 'posts']),
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('stats', ['fetchUserStats']),
    ...mapActions('auth', ['updateUser']),
    requestUserUpdate({ user, done }) {
      this.updateUser(user)
        .then(() => {
          this.$toasted.success('Profile successfuly Updated', {
            duration: 3000,
          });
          done();
        })
        .catch(error => {
          console.log(error);
          done();
        });
    },
  },
};
</script>
<!-- Styles -->
<style scoped>
body {
  background: #f5f7fa;
}
.stats-tab {
  border-bottom: 2px solid transparent;
  transition: 0.5s;
}
.stats-tab:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}
.stats-tab.isActive {
  border-bottom: 2px solid black;
}
.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}
.container.profile {
  margin-top: 1%;
}
.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}
.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}
.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>