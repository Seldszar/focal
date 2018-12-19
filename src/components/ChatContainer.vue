<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.columns" ref="columns">
      <div
        v-bind:class="$style.column"
        ref="column"
        v-for="(column, index) in columns"
        v-bind:key="index"
      >
        <ChatColumn
          v-bind:title="column.title"
          v-bind:events="column.events"
          v-on:clear="clearColumn(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChatColumn from "./ChatColumn.vue";

export default {
  components: {
    ChatColumn,
  },
  computed: {
    columns() {
      return this.$store.state.columns;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDownEvent);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDownEvent);
  },
  methods: {
    handleKeyDownEvent(event) {
      if (event.keyCode >= 96 && event.keyCode <= 105) {
        event.preventDefault();

        this.scrollToColumn(
          event.keyCode === 96 ? this.$refs.column.length - 1 : event.keyCode - 97,
        );
      }
    },
    clearColumn(index) {
      this.$store.commit("CLEAR_COLUMN_EVENTS", { index });
    },
    scrollToColumn(columnIndex) {
      const column = this.$refs.column[columnIndex];

      if (column) {
        this.$refs.columns.scroll({
          left: column.offsetLeft,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  background-color: scale-color($body-background, $lightness: 5%);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.sidebar {
  background-color: $body-background;
  flex-shrink: 0;
}

.sidebarItem {
  align-items: center;
  display: flex;
  justify-content: center;

  button {
    color: inherit;
    height: rem-calc(50);
    width: rem-calc(50);
  }
}

.columns {
  display: flex;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}

.column {
  // ...
}
</style>
