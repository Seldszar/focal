<script>
import Cheermote from "./Cheermote.vue";
import Emote from "./Emote.vue";

export default {
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
  render(h) {
    let nodes = [];

    for (let token of this.tokens) {
      let node = token.text;

      if ("url" in token) {
        node = h("a", { attrs: { href: token.url, target: "_blank" } }, token.text);
      }

      if ("mention" in token) {
        node = h("span", { class: this.$style.mention }, token.text);
      }

      if ("emote" in token) {
        node = h(Emote, {
          class: this.$style.emote,
          props: {
            name: token.emote.name,
            url: token.emote.url,
          },
        });
      }

      if ("cheermote" in token) {
        node = h(Cheermote, {
          class: this.$style.cheermote,
          props: {
            name: token.cheermote.name,
            url: token.cheermote.url,
            color: token.cheermote.color,
            amount: token.cheermote.amount,
          },
        });
      }

      nodes.push(node);
    }

    return h("div", { class: this.$style.wrapper }, nodes);
  },
};
</script>

<style lang="scss" module>
.wrapper {
  hyphens: auto;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  word-wrap: break-word;
}

.cheermote,
.emote {
  margin: -0.5rem 0;
  // min-width: 28px;
}

.mention {
  // cursor: pointer;
  // display: inline-block;
  font-weight: bold;

  // // background-color: $dark-gray;
  // border: 1px solid $dark-gray;
  // border-radius: 2px;
  // // margin: 0 -4px;
  // padding: 4px;
  //
  // &:hover {
  //   background-color: $body-font-color;
  //   border-color: transparent;
  //   color: $body-background;
  // }
}
</style>
