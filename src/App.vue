<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.content"><MainView /></div>
    <div v-bind:class="$style.footer"><Footer /></div>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import MainView from "./views/MainView.vue";

export default {
  components: {
    Footer,
    MainView,
  },
};
</script>

<style lang="scss" module>
@include foundation-button;
@include foundation-global-styles;
@include foundation-typography;
@include foundation-forms;

@font-face {
  font-family: "Noto Sans Display";
  font-style: normal;
  font-weight: 400;
  src: local("Noto Sans Display"), local("NotoSansDisplay-Regular"),
    url("./assets/fonts/NotoSansDisplay-Regular.woff") format("woff");
}

@font-face {
  font-family: "Noto Sans Display";
  font-style: normal;
  font-weight: 600;
  src: local("Noto Sans Display"), local("NotoSansDisplay-SemiBold"),
    url("./assets/fonts/NotoSansDisplay-SemiBold.woff") format("woff");
}

:global {
  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: scale-color($body-background, $lightness: 20%);
  }

  html,
  body {
    height: 100%;
  }

  body {
    min-height: 100%;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.titleBar {
  flex-shrink: 0;
}

.content {
  flex: 1 0;
  overflow: hidden;
}

.footer {
  border-top: 1px solid $body-background;
  flex-shrink: 0;
}
</style>
