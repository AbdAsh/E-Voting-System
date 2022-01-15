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
                style="width: 100%"
                :src="candidate[3]"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ candidate[1] }}</p>
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
          v-if="!loading"
          class="button is-primary"
          @click="vote ? confirmVote() : warning()"
        >
          Submit Vote
        </button>
        <button v-if="loading" class="button is-primary" disabled>Loading...</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Vote",
  computed: {
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters("drizzle", ["drizzleInstance"]),
    candidates() {
      let data = this.getContractData({
        contract: "Election",
        method: "getCandidates",
      });
      if (data === "loading") return false;
      return data;
    },
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "Election",
      method: "getCandidates",
      methodArgs: [],
    });
  },
  data() {
    return {
      vote: "",
      confirmed: false,
      loading: false,
    };
  },
  methods: {
    warning() {
      this.$buefy.toast.open({
        message: "Please select a candidate",
        type: "is-danger",
        queue: false,
        duration: 3000,
        position: "is-bottom",
      });
    },
    confirmVote() {
      console.log(this.drizzleInstance);
      if (this.vote) {
        this.$buefy.dialog.confirm({
          message: `Confirm Vote for ${this.vote[1]}?`,
          onConfirm: () => {
            this.loading = true;
            this.drizzleInstance.contracts["Election"].methods
              .vote(this.vote[0])
              .send()
              .then(() => {
                this.$buefy.toast.open({
                  message: "Vote submitted",
                  type: "is-success",
                  queue: false,
                  duration: 3000,
                  position: "is-bottom",
                });
                this.$router.push("/result");
              })
              .catch((err) => {
                this.loading = false;
                this.$buefy.toast.open({
                  message: `${err.message}`,
                  type: "is-danger",
                  queue: false,
                  duration: 3000,
                  position: "is-bottom",
                });
              });
          },
        });
      }
    },
  },
};
</script>
