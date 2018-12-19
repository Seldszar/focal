<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.author">
      <span v-bind:class="$style.badges" v-if="Object.keys(badges).length > 0">
        <span v-bind:class="$style.badge" v-for="(revision, type) in badges" v-bind:key="type">
          <Badge v-bind:type="type" v-bind:revision="revision" />
        </span>
      </span>
      <span v-bind:class="$style.displayName" v-bind:style="{ color }">
        {{ event.data.tags.displayName }}
      </span>
    </div>
    <div v-bind:class="$style.message" v-bind:style="{ color: event.data.isAction && color }">
      <button
        v-if="event.isDeleted && !isRestored"
        v-on:click="isRestored = true"
        v-bind:class="$style.deletedNotice"
      >
        Message Deleted
      </button>
      <Message v-else v-bind:tokens="event.data.messageTokens" />
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
import Badge from "../Badge.vue";
import Message from "../Message.vue";

export default {
  components: {
    Badge,
    Message,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRestored: false,
    };
  },
  computed: {
    color() {
      return this.$store.state.userColors[this.event.data.tags.userId];
    },
    badges() {
      return pick(this.event.data.tags.badges, [
        "broadcaster",
        "global_mod",
        "moderator",
        "subscriber",
        "staff",
      ]);
    },
  },
};
</script>

<style lang="scss" module>
.author {
  margin-bottom: 4px;
}

.badges {
  // ...
}

.badge {
  display: inline-block;
  margin-right: rem-calc(2);

  &:last-child {
    margin-right: 0;
  }
}

.displayName {
  color: $secondary-color;
  font-weight: $global-weight-bold;
}

.message {
  hyphens: auto;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  word-wrap: break-word;
}

.deletedNotice {
  @include button-base;
  @include button-hollow;
  @include button-hollow-style($secondary-color, 100%);
  @include button-expand;

  border-radius: 3px;
  border-style: dashed;
  margin: 0;
  text-transform: uppercase;
}
</style>
