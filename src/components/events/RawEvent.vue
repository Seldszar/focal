<template>
  <div v-bind:class="$style.wrapper">
    <pre v-bind:class="$style.payload" v-html="event" />
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

.payload {
  color: $medium-gray;
}
</style>
