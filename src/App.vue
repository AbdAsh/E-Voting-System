<template>
  <div>
    <nav
      class="navbar"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <div class="navbar-brand">
        <router-link to="/">
          <img
            src="https://www.evoter.com.ng/dist/img/evoting.png"
            alt="Evoting logo"
            style="filter: hue-rotate(180deg)"
          />
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>
      </div>
    </nav>
    &nbsp;
    <div v-if="isDrizzleInitialized" id="app">
      <router-view />
    </div>
    <div v-else>Loading application...</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    getCandidates() {
      let data = this.getContractData({
        contract: "Election",
        method: "getCandidates",
      });
      if (data === "loading") return false;
      return data;
    },
  },
  created() {
    this.$store
      .dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "Election",
        method: "getCandidates",
        methodArgs: [],
      })
  },
  mounted() {
    setInterval(() => {
      console.log(this.getCandidates)}, 5000);
},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  text-align: center;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
