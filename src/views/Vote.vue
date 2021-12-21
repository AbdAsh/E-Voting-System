<template>
  <div class="container box">
    <h1 class="title">Pick your Vote</h1>
    <div class="columns is-multiline">
      <div
        class="column is-one-third"
        v-for="(candidate, index) in candidates"
        :key="index"
      >
        <div class="card">
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                :id="`candidate-${index}`"
                :value="candidate"
                v-model="vote"
              />
            </label>
          </div>
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ candidate.name }}</p>
              </div>
            </div>
            <div class="content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-primary"
          @click="vote ? (confirmed = true) : ''"
        >
          Submit Vote
        </button>
      </div>
    </div>
    <div class="modal" :class="confirmed ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <span class="title">Confirm Vote</span>
          <p>
            Are you sure you want to vote for <strong>{{ vote.name }}</strong> ?
          </p>
          <div class="tile" style="justify-content: center">
            <div class="field">
              <div class="control">
                <router-link to="/post-vote" class="button is-primary">
                  Confirm Vote
                </router-link>
              </div>
            </div>
            &nbsp;
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="confirmed = flase">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vote",
  data() {
    return {
      vote: "",
      confirmed: false,
      candidates: [
        { name: "John", id: 1 },
        { name: "Jane", id: 2 },
        { name: "Jack", id: 3 },
        { name: "Jill", id: 4 },
        { name: "Joe", id: 5 },
      ],
    };
  },
  methods: {
    confirmVote() {
      if (this.vote) {
        this.confirmed = true;
      }
    },
  },
};
</script>
