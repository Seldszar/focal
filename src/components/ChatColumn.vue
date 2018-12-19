<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.header">
      <div v-bind:class="$style.title">
        {{ title }}
      </div>
      <div v-bind:class="$style.actions">
        <button v-on:click="$emit('clear')">
          <svg viewBox="0 0 24 24">
            <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z" />
          </svg>
        </button>
      </div>
    </div>
    <transition-group v-bind:class="$style.lines" ref="lines" tag="div" tabindex="0" v-bind:css="false">
      <div v-bind:class="$style.line" v-for="event in events" v-bind:key="event.id">
        <ChatLine v-bind:event="event" />
      </div>
    </transition-group>
    <div v-bind:class="$style.scrollNotice" v-if="!isAutoScrolling">
      <button v-on:click="isAutoScrolling = true">
        New Messages
      </button>
    </div>
  </div>
</template>

<script>
import ChatLine from "./ChatLine.vue";

export default {
  components: {
    ChatLine,
  },
  props: {
    title: {
      type: String,
    },
    events: {
      type: Array,
    },
  },
  data() {
    return {
      isUserScrolling: false,
      isAutoScrolling: true,
    };
  },
  mounted() {
    const eventNames = ["wheel", "keydown", "scroll"];
    const element = this.$refs.lines.$el;

    eventNames.forEach(eventName => {
      element.addEventListener(eventName, this.handleScrollEvent);
    });

    window.addEventListener("mousedown", () => {
      this.isUserScrolling = true;
    });

    window.addEventListener("mouseup", () => {
      this.isUserScrolling = false;
    });
  },
  updated() {
    if (this.isAutoScrolling) {
      this.$refs.lines.$el.scrollTop = this.$refs.lines.$el.scrollHeight;
    }
  },
  methods: {
    updateAutoScrolling(isAutoScrolling) {
      this.isAutoScrolling =
        isAutoScrolling ||
        this.$refs.lines.$el.scrollHeight -
          this.$refs.lines.$el.scrollTop -
          this.$refs.lines.$el.offsetHeight <=
          0;
    },
    handleScrollEvent(event) {
      if (event.type === "wheel") {
        event.preventDefault();

        if (event.deltaY < 0) {
          this.$refs.lines.$el.scrollTop -= 100;
          this.updateAutoScrolling();
        }

        if (event.deltaY > 0) {
          this.$refs.lines.$el.scrollTop += 100;
          this.updateAutoScrolling();
        }
      }

      if (event.type === "keydown") {
        if (event.keyCode === 33) {
          event.preventDefault();

          this.$refs.lines.$el.scrollTop -= 100;
          this.updateAutoScrolling(false);
        }

        if (event.keyCode === 34) {
          event.preventDefault();

          this.$refs.lines.$el.scrollTop += 100;
          this.updateAutoScrolling();
        }

        if (event.keyCode === 35) {
          event.preventDefault();

          this.$refs.lines.$el.scrollTop = this.$refs.lines.$el.scrollHeight;
          this.updateAutoScrolling(true);
        }

        if (event.keyCode === 36) {
          event.preventDefault();

          this.$refs.lines.$el.scrollTop = 0;
          this.updateAutoScrolling(false);
        }
      }

      if (event.type === "scroll" && this.isUserScrolling) {
        this.updateAutoScrolling();
      }
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  border-right: 1px solid $body-background;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: rem-calc(360);
}

.header {
  border-bottom: 1px solid $body-background;
  color: $dark-gray;
  display: flex;
  flex-shrink: 0;
}

.title {
  align-items: center;
  display: flex;
  flex: 1;
  font-size: $small-font-size;
  height: rem-calc(36);
  padding: 0 12px;
  text-transform: uppercase;
}

.actions {
  border-left: 1px solid $body-background;

  button {
    align-items: center;
    color: inherit;
    cursor: pointer;
    display: flex;
    height: rem-calc(36);
    justify-content: center;
    outline: none;
    width: rem-calc(36);

    svg {
      color: inherit;
      display: block;
      height: 24px;

      path {
        fill: currentColor;
      }
    }

    &:hover,
    &:focus {
      color: $primary-color;
    }
  }
}

.lines {
  flex: auto;
  outline: none;
  overflow-y: scroll;
  padding: 0.5rem 0;

  &:not(:hover) {
    &::-webkit-scrollbar-thumb {
      visibility: hidden;
    }
  }
}

.line {
  overflow-x: auto;
  margin-bottom: 1px;

  &:last-child {
    margin-bottom: 0;
  }
}

.scrollNotice {
  bottom: 0.5rem;
  left: 0.5rem;
  position: absolute;
  right: 0.5rem;

  button {
    @include button-base;
    @include button-style($secondary-color, auto, $body-font-color);
    @include button-expand;

    border-radius: 3px;
    margin: 0;
    padding: 0.75rem;
    text-transform: uppercase;
  }
}
</style>
