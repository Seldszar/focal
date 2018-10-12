/* global settings */

import { omit } from "lodash";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import Vue from "vue";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DNS) {
  Raven.config(process.env.SENTRY_DNS, { release: process.env.GIT_COMMIT })
    .addPlugin(RavenVue, Vue)
    .install();

  Raven.setExtraContext({
    settings: omit(settings, ["token"]),
  });
}

Raven.context(() => {
  const app = new Vue({
    render: h => h(App),
    store,
  });

  store.commit("UPDATE_SETTINGS", { settings });
  store.dispatch("fetchUser").then(() => {
    app.$mount("#app");
  });
});
