<template>
  <div v-bind:class="$style.wrapper" v-bind:style="{ borderColor }">
    <div v-bind:class="$style.time">
      <small> {{ time }} </small>
    </div>
    <div v-bind:class="$style.event"><component v-bind:event="event" v-bind:is="component" /></div>
  </div>
</template>

<script>
import BanEvent from "./events/BanEvent.vue";
import CheerEvent from "./events/CheerEvent.vue";
import GiftPaidUpgradeEvent from "./events/GiftPaidUpgradeEvent.vue";
import MessageEvent from "./events/MessageEvent.vue";
import NoticeEvent from "./events/NoticeEvent.vue";
import RaidEvent from "./events/RaidEvent.vue";
import RawEvent from "./events/RawEvent.vue";
import RitualEvent from "./events/RitualEvent.vue";
import ResubscriptionEvent from "./events/ResubscriptionEvent.vue";
import SubscriptionEvent from "./events/SubscriptionEvent.vue";
import SubscriptionGiftEvent from "./events/SubscriptionGiftEvent.vue";
import SubscriptionGiftCommunityEvent from "./events/SubscriptionGiftCommunityEvent.vue";
import TimeoutEvent from "./events/TimeoutEvent.vue";

export default {
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    time() {
      return this.event.data.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
      });
    },
    borderColor() {
      return this.$store.state.eventColors[this.event.type];
    },
    component() {
      switch (this.event.type) {
        case "ban":
          return BanEvent;

        case "cheer":
          return CheerEvent;

        case "giftPaidUpgrade":
          return GiftPaidUpgradeEvent;

        case "message":
          return MessageEvent;

        case "notice":
          return NoticeEvent;

        case "raid":
          return RaidEvent;

        case "ritual":
          return RitualEvent;

        case "resubscription":
          return ResubscriptionEvent;

        case "subscription":
          return SubscriptionEvent;

        case "subscriptionGift":
          return SubscriptionGiftEvent;

        case "subscriptionGiftCommunity":
          return SubscriptionGiftCommunityEvent;

        case "timeout":
          return TimeoutEvent;

        default:
          return RawEvent;
      }
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  // background-color: scale-color($body-background, $lightness: 5%);
  // border-left: 4px solid scale-color($body-background, $lightness: 10%);
  border-left: 4px solid transparent;
  // box-shadow: inset 1px 0 0 $body-background;
  display: flex;
  padding: 0.5rem;

  // &:focus,
  // &:hover {
  //   background-color: scale-color($body-background, $lightness: 10%);
  // }
}

.time {
  color: $dark-gray;
  flex-shrink: 0;
  padding-right: 0.5rem;
}

.event {
  flex: 1;
}
</style>
