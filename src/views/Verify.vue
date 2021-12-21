<template>
  <div class="container box">
    <div class="field">
      <label class="label">Verification Code</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Verification Code"
          v-model="verificationCode"
        />
      </div>
    </div>
    <div class="tile" style="justify-content: center">
      <div class="field">
        <div class="control">
          <router-link to="/vote" class="button is-primary" @click="verify">
            Vote
          </router-link>
        </div>
      </div>
      &nbsp;
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="verify">Resend Code</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      verificationCode: "",
    };
  },
  methods: {
    verify() {
      this.$store.dispatch("verify", this.verificationCode);
    },
    resendCode() {
      this.$store.dispatch("resendCode");
    },
  },
};
</script>
