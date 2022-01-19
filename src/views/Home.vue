<template>
  <div class="container box">
    <div class="title">Welcome to E-Voting</div>
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Please enter you ID Number</label>
        <div class="control">
          <input
            class="input"
            :class="userID ? valid.status ? 'is-success' : 'is-danger' : ''"
            type="text"
            v-model="userID"
            placeholder="e.g. TC Kimlik"
          />
          <p v-if="!valid.status" class="help is-danger">{{ valid.display }}</p>
        </div>
      </div>
      <div class="control">
        <button type="submit" :disabled="!valid.status" class="button is-link">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { checkId, generateId } from "turkish-id-checker";
export default {
  data() {
    return {
      userID: generateId(),
    };
  },
  computed: {
    valid() {
      return this.userID == '' ? true : checkId(this.userID);
    },
  },
  methods: {
    submit() {
      if (this.userID && this.valid) {
        this.$store.state.TCKimlik = this.userID;
        this.$router.push("/verify");
      }
    },
  }
};
</script>
