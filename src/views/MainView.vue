<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.streamStatus">
      <StreamStatus v-bind:stream="stream" v-bind:user="user" />
    </div>
    <div v-bind:class="$style.chatContainer">
      <ChatContainer />
    </div>
  </div>
</template>

<script>
import { camelCase } from "lodash";
import Twitch from "twitch-js";
import ChatContainer from "../components/ChatContainer.vue";
import StreamStatus from "../components/StreamStatus.vue";

// eslint-disable-next-line no-control-regex
const ACTION_PATTERN = /\x01ACTION (.*)\x01/;

export default {
  components: {
    ChatContainer,
    StreamStatus,
  },
  computed: {
    stream() {
      return this.$store.state.stream;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.twitchJs = new Twitch({
      username: this.$store.state.user.login,
      token: this.$store.state.token,
    });

    this.twitchJs.chat
      .on(this.twitchJs.chatConstants.EVENTS.CLEAR_CHAT, data => {
        this.$store.dispatch("dispatchEvent", {
          event: {
            type: data.tags.banDuration ? "timeout" : "ban",
            data,
          },
        });
      })
      .on(this.twitchJs.chatConstants.EVENTS.NOTICE, data => {
        this.$store.dispatch("dispatchEvent", {
          event: {
            type: "notice",
            data,
          },
        });
      })
      .on(this.twitchJs.chatConstants.EVENTS.PRIVATE_MESSAGE, data => {
        data.isAction = false;

        if (ACTION_PATTERN.test(data.message)) {
          data.message = ACTION_PATTERN.exec(data.message)[1];
          data.isAction = true;
        }

        this.$store.dispatch("dispatchEvent", {
          event: {
            type: data.bits ? "cheer" : "message",
            data,
          },
        });
      })
      .on(this.twitchJs.chatConstants.EVENTS.USER_NOTICE, data => {
        let type = camelCase(data.event);

        if (type === "giftpaidupgrade") {
          type = "giftPaidUpgrade";
        }

        this.$store.dispatch("dispatchEvent", {
          event: { type, data },
        });
      });

    const updateStream = async () => {
      this.$store.commit("UPDATE_STREAM", {
        stream: (await this.twitchJs.api.get(`streams/${this.$store.state.user.id}`)).stream,
      });
    };

    this.updateStreamInterval = setInterval(updateStream, 30000);
    updateStream();

    this.twitchJs.chat
      .connect()
      .then(() => this.$store.dispatch("fetchEmotes"))
      .then(() => this.$store.dispatch("fetchCheermotes"))
      .then(() => this.twitchJs.chat.join(this.$store.state.user.login));
  },
  destroyed() {
    clearInterval(this.updateStreamInterval);
    this.twitchJs.chat.disconnect();
  },
  methods: {
    handleMessageEvent(message) {
      this.twitchJs.chat.say(this.$store.state.user.login, message).then(response => {
        this.$store.dispatch("sendMessage", {
          userState: response[1],
          message,
        });
      });
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.streamStatus {
  border-top: 1px solid scale-color($body-background, $lightness: 5%);
  flex-shrink: 0;
}

.chatContainer {
  flex: 1;
  overflow: hidden;
}
</style>
