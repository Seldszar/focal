<template>
  <div v-bind:class="$style.wrapper">
    <div v-bind:class="$style.profileImage">
      <img v-bind:src="user.profile_image_url" />
    </div>
    <template v-if="stream">
      <div v-bind:class="$style.streamUptime">
        <header>
          Uptime
        </header>
        {{ uptime }}
      </div>
      <div v-bind:class="$style.viewerCount">
        <header>
          Viewers
        </header>
        {{ stream.viewers.toLocaleString() }}
      </div>
      <div v-bind:class="$style.gameName">
        <header>
          Game
        </header>
        <Scroller v-bind:content="stream.game" />
      </div>
      <div v-bind:class="$style.streamStatus">
        <header>
          Status
        </header>
        <Scroller v-bind:content="stream.channel.status" />
      </div>
    </template>
    <!-- <div v-bind:class="$style.offlineMessage">
      Stream Offline
    </div> -->
  </div>
</template>

<script>
import { getUptime } from "../helpers";
import Scroller from "../components/Scroller.vue";

export default {
  props: {
    stream: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  components: {
    Scroller,
  },
  watch: {
    stream(newValue, oldValue) {
      if (!(newValue && oldValue && newValue.createdAt === oldValue.createdAt)) {
        this.updateUptime();
      }
    },
  },
  data() {
    return {
      uptime: null,
    };
  },
  mounted() {
    setInterval(() => {
      this.updateUptime();
    }, 1000);

    this.updateUptime();
  },
  methods: {
    updateUptime() {
      let uptime = null;

      if (this.stream) {
        uptime = getUptime(Date.parse(this.stream.createdAt));
      }

      this.uptime = uptime;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  color: $white;
  display: flex;
  height: rem-calc(50);
}

.profileImage,
.streamUptime,
.viewerCount,
.gameName,
.streamStatus,
.offlineMessage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1rem;

  header {
    color: $dark-gray;
    font-size: $small-font-size;
    text-transform: uppercase;
  }
}

.profileImage {
  align-items: center;
  display: flex;
  justify-content: center;
  height: rem-calc(50);
  width: rem-calc(50);

  img {
    border-radius: rem-calc(3);
    display: block;
    height: rem-calc(36);
    width: rem-calc(36);
  }
}

.gameName {
  max-width: 25%;
}

.streamStatus {
  flex: 1;
  overflow: hidden;
}

.offlineMessage {
  color: $dark-gray;
  flex: 1;
  text-transform: uppercase;
}
</style>
