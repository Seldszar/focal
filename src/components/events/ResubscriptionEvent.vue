<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.systemMessage">{{ event.data.systemMessage }}</div>
    <div v-bind:class="$style.message" v-if="event.data.message">
      <MessageEvent v-bind:event="event" />
    </div>
  </div>
</template>

<script>
import MessageEvent from "./MessageEvent.vue";

export default {
  components: {
    MessageEvent,
  },
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

.message {
  margin-top: 4px;
}
</style>
