<template>
  <img
    v-bind:class="{ [$style.loading]: !isLoaded }"
    v-bind:src="url"
    v-bind:title="name"
    v-on:load="isLoaded = true"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoaded: false,
    };
  },
};
</script>

<style lang="scss" module>
.loading {
  height: 28px;
  width: 28px;
}
</style>
