<template>
  <div class="container box">
    <div class="title">Welcome to E-Voting</div>
    <div class="subtitle">
      <p>This is a simple voting system built with Vue.js.</p>
      <p>You can vote for any of the candidates below.</p>
      <p>But please verify you identity first.</p>
    </div>
    <form>
      <div class="field">
        <label class="label">ID Number</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g. TC Kimlik" />
        </div>
      </div>
      <div class="control">
        <router-link to="/verify" class="button is-link">Submit</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    
  },
};
</script>
