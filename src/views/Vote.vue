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
                style="width: 100%, height: auto"
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
          class="button is-primary"
          @click="vote ? confirmVote() : warning()"
        >
          Submit Vote
        </button>
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
    async performTx() {
      new Promise((resolve, reject) => {
        try {
          let voteContractMethod =
            this.drizzleInstance.contracts["Election"].methods["vote"];
          voteContractMethod.cacheSend(this.vote[0]);
          resolve(true);
        } catch {
          reject(false);
        }
      });
    },
    confirmVote() {
      console.log(this.drizzleInstance);
      if (this.vote) {
        this.$buefy.dialog.confirm({
          message: `Confirm Vote for ${this.vote[1]}?`,
          onConfirm: () => {
            this.performTx()
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
              .catch(() => {
                this.$buefy.toast.open({
                  message: "Vote failed",
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
