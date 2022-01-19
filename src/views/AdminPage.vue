<template>
  <div>
    <form class="container box" @submit.prevent="addCandidate">
      <label class="label is-size-5"> Add Candidate </label>
      <div class="field">
        <label class="label has-text-left">Candidate Name</label>
        <div class="control">
          <input class="input" type="text" v-model="candidate.name" />
          &nbsp;
          <label class="label has-text-left">Candidate Image</label>
          <input class="input" type="text" v-model="candidate.image" />
        </div>
        <p v-if="error" class="help is-danger">An Error Occurred</p>
      </div>
      <div class="control">
        <button
          type="submit"
          :disabled="!(candidate.name && candidate.image)"
          class="button is-link"
        >
          Add Candidate
        </button>
      </div>
    </form>
    <div class="container box">
      <label class="label is-size-5"> Current Candidates </label>
      <div
        class="container box tile is-justify-content-space-between"
        v-for="(candidate, i) in candidates"
        :key="i"
      >
        <label class="label m-0 has-text-left">{{ candidate[1] }}</label>
        <button @click="removeCandidate(candidate[0])" class="button is-danger">
          Remove Candidate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      candidate: {
        name: "",
        image: "",
      },
      error: false,
    };
  },
  computed: {
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters("drizzle", ["drizzleInstance"]),
    candidates() {
      let data = this.getContractData({
        contract: "Election",
        method: "getCandidates",
      });
      if (data === "loading") return false;
      return data.filter(e => e[0] != 0);
    },
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "Election",
      method: "getCandidates",
      methodArgs: [],
    });
  },
  methods: {
    addCandidate() {
      this.loading = true;
      this.drizzleInstance.contracts["Election"].methods
        .addCandidate(this.candidate.name, this.candidate.image)
        .send()
        .then((res) => {
          res.status
            ? this.$buefy.toast.open({
                message: "Vote submitted",
                type: "is-success",
                queue: false,
                duration: 3000,
                position: "is-bottom",
              })
            : (this.error = true);
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
        });
    },
    removeCandidate(id) {
      this.loading = true;
      this.drizzleInstance.contracts["Election"].methods
        .deleteCandidate(id)
        .send()
        .then((res) => {
          res.status
            ? this.$buefy.toast.open({
                message: "Vote submitted",
                type: "is-success",
                queue: false,
                duration: 3000,
                position: "is-bottom",
              })
            : (this.error = true);
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
        });
    },
  },
};
</script>
