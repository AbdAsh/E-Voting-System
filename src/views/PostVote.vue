<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Thank you for voting.</h1>
      <label class="label">Your vote has been recorded.</label>
    </div>
    <div v-if="this.candidates" class="box">
      <label class="title">Current Statistics</label>
      <DonutChart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DonutChart from "../components/DonutChart.vue";
export default {
  components: {
    DonutChart,
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
      return data.filter((e) => e[0] != 0);
    },
    chartData() {
      let labels = [];
      let datasets = [
        {
          label: [],
          backgroundColor: [],
          data: [],
        },
      ];
      this.candidates ? this.candidates.map((e) => {
        labels.push(e[1]);
        datasets[0].label.push(e[1]);
        datasets[0].data.push(e[2]);
        datasets[0].backgroundColor.push("#" + Math.random().toString(16).slice(2, 8));
      }) : null;
      let processeedData = {
        labels: labels,
        datasets: datasets
      };
      return processeedData
    },
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "Election",
      method: "getCandidates",
      methodArgs: [],
    });
  },
};
</script>
