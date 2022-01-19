<template>
  <div class="container box">
    <div class="title">Admin Login</div>
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" v-model="username" />
          &nbsp;
          <label class="label">Password</label>
          <input class="input" type="password" v-model="password" />
        </div>
        <p v-if="error" class="help is-danger">Incorrect Credintials</p>
      </div>
      <div class="control">
        <button
          type="submit"
          :disabled="!(username && password && !loading)"
          class="button is-link"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters("drizzle", ["drizzleInstance"]),
  },
  methods: {
    submit() {
      this.loading = true;
      this.drizzleInstance.contracts["Election"].methods
        .isAdmin(this.username, this.password)
        .send()
        .then((lol) => {
          lol.status ? this.$router.push("/admin-page") : (this.error = true);
        })
        .catch((err) => {
          this.error = err;
          this.loading = false
        });
    },
  },
};
</script>
