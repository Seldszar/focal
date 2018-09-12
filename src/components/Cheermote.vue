<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.emote">
      <Emote v-bind:name="name" v-bind:url="url" />
    </div>
    <div v-bind:class="$style.amount" v-bind:style="{ color }">
      {{ amount }}
    </div>
  </div>
</template>

<script>
import Emote from "./Emote.vue";

export default {
  components: {
    Emote,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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
.wrapper {
  align-items: baseline;
  display: inline-flex;
  padding-right: 4px;
}

.emote {
  align-self: center;
  margin: -0.5rem 0;
  margin-right: 4px;
}

.amount {
  font-weight: $global-weight-bold;
}
</style>
