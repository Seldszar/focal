<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.systemMessage">
      {{ event.data.systemMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  // ...
}

.systemMessage {
  color: $medium-gray;
}
</style>
