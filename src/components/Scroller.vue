<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.content" ref="content" v-html="content" />
  </div>
</template>

<script>
import { easing, styler, timeline } from "popmotion";

export default {
  props: {
    content: String,
  },
  mounted() {
    window.addEventListener("resize", this.tween);
    this.tween();
  },
  updated() {
    this.tween();
  },
  destroyed() {
    window.removeEventListener("resize", this.tween);
  },
  methods: {
    tween() {
      if (this.animation) {
        this.animation.stop();
      }

      const $content = this.$refs.content;
      const endValue = Math.max(0, $content.clientWidth - this.$el.clientWidth);
      const duration = endValue * 15;
      const styled = styler($content);

      styled.set({ x: 0 });

      if (duration > 0) {
        const playlist = [
          "+2000",
          { track: "x", from: 0, to: -endValue, duration, ease: easing.linear },
          "+2000",
          { track: "x", to: 0 },
        ];

        this.animation = timeline(playlist, { loop: Infinity }).start(styled.set);
      }
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  overflow-x: hidden;
  width: 100%;
}

.content {
  padding-right: 0.49px;
  white-space: nowrap;
}
</style>
