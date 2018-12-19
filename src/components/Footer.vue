<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.spacer">
      Version &laquo;{{ version }}&raquo; by
      <a href="https://seldszar.fr" target="_blank">Seldszar</a>
    </div>
    <div v-bind:class="$style.support">
      You like this project?
      <a href="https://www.paypal.me/seldszar" target="_blank">Please consider donating</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: process.env.GIT_VERSION || "development",
    };
  },
};
</script>

<style lang="scss" module>
.wrapper {
  align-items: center;
  color: $dark-gray;
  display: flex;
  font-size: $small-font-size;
  height: 2rem;
  line-height: 1;
  padding: 0 12px;
  text-transform: uppercase;
}

.spacer {
  flex: 1;
}

.support {
  // ...
}
</style>
