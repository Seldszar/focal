<template>
  <div v-bind:class="$style.wrapper" v-bind:style="style" v-bind:title="title" v-html="icon" />
</template>

<script>
const badgeTypes = {
  broadcaster: {
    title: "Broadcaster",
    color: "#B94A48",
    icon: `
      <svg viewBox="0 0 2048 2048">
        <path d="M0,1537.3v-896h1408v896H0z M1536,897.3l512-256v896l-512-256V897.3z" fill="currentColor" />
      </svg>
    `,
  },
  moderator: {
    title: "Moderator",
    color: "#1DB954",
    icon: `
      <svg viewBox="0 0 2048 2048">
        <path d="M1024,2.3c34,0,66.3,2.2,97,6.5s60.5,11,89.5,20s57.5,20.3,85.5,34s56.3,29.5,85,47.5c48,30.7,96,55.7,144,75 s96.7,34.3,146,45s100,18,152,22s105.7,6,161,6v512c0,97.3-12.2,189.7-36.5,277s-58,170.2-101,248.5s-93.8,152.2-152.5,221.5 s-122.3,134.5-191,195.5s-141.2,117.8-217.5,170.5s-153.2,101.3-230.5,146l-31,18l-31-18c-77.3-44.7-154.2-93.3-230.5-146 S613.7,1773.8,545,1712.8s-132.3-126.2-191-195.5s-109.5-143.2-152.5-221.5s-76.7-161.2-101-248.5S64,867.7,64,770.3v-512 c55.3,0,109-2,161-6s102.7-11.3,152-22s98-25.7,146-45s96-44.3,144-75c56.7-36.7,113.3-63.8,170-81.5S956,2.3,1024,2.3z" fill="currentColor" />
      </svg>
    `,
  },
  subscriber: {
    title: "Subscriber",
    color: "#6441A5",
    icon: `
      <svg viewBox="0 0 2048 2048">
        <path d="M2048,769l-632,486l248,794l-640-492l-640,492l248-794L0,769h784L1024,1l240,768H2048L2048,769z" fill="currentColor" />
      </svg>
    `,
  },
  global_mod: {
    title: "Global Moderator",
    color: "#6441A5",
    icon: `
      <svg viewBox="0 0 2048 2048">
        <path d="M1024,2.3c34,0,66.3,2.2,97,6.5s60.5,11,89.5,20s57.5,20.3,85.5,34s56.3,29.5,85,47.5c48,30.7,96,55.7,144,75 s96.7,34.3,146,45s100,18,152,22s105.7,6,161,6v512c0,97.3-12.2,189.7-36.5,277s-58,170.2-101,248.5s-93.8,152.2-152.5,221.5 s-122.3,134.5-191,195.5s-141.2,117.8-217.5,170.5s-153.2,101.3-230.5,146l-31,18l-31-18c-77.3-44.7-154.2-93.3-230.5-146 S613.7,1773.8,545,1712.8s-132.3-126.2-191-195.5s-109.5-143.2-152.5-221.5s-76.7-161.2-101-248.5S64,867.7,64,770.3v-512 c55.3,0,109-2,161-6s102.7-11.3,152-22s98-25.7,146-45s96-44.3,144-75c56.7-36.7,113.3-63.8,170-81.5S956,2.3,1024,2.3z" fill="currentColor" />
      </svg>
    `,
  },
  staff: {
    title: "Staff",
    color: "#333333",
    icon: `
      <svg viewBox="0 0 2048 2048">
        <path d="M1930,221.3c17.3,30,33.2,58.7,47.5,86s26.8,55,37.5,83s18.8,57.2,24.5,87.5s8.5,63.5,8.5,99.5c0,52.7-6.8,103.5-20.5,152.5 s-33,94.8-58,137.5s-55.2,81.7-90.5,117s-74.3,65.5-117,90.5s-88.5,44.3-137.5,58s-99.8,20.5-152.5,20.5c-15.3,0-30.8-0.7-46.5-2 s-31.2-3.3-46.5-6l-806,806c-32,32-68.5,56.3-109.5,73s-83.8,25-128.5,25c-46,0-89.3-8.8-130-26.5s-76.2-41.7-106.5-72 s-54.3-65.8-72-106.5s-26.5-84-26.5-130c0-44.7,8.3-87.5,25-128.5s41-77.5,73-109.5l806-806c-2.7-15.3-4.7-30.8-6-46.5 s-2-31.2-2-46.5c0-52.7,6.8-103.5,20.5-152.5s33-94.8,58-137.5s55.2-81.7,90.5-117s74.3-65.5,117-90.5s88.5-44.3,137.5-58 S1419.4,1.3,1472,1.3c36,0,69.2,2.8,99.5,8.5s59.5,13.8,87.5,24.5s55.7,23.2,83,37.5s56,30.2,86,47.5l-394,394l102,102L1930,221.3z" fill="currentColor" />
      </svg>
    `,
  },
};

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    revision: {
      type: Number,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: badgeTypes[this.type].color,
      };
    },
    icon() {
      return badgeTypes[this.type].icon;
    },
    title() {
      return badgeTypes[this.type].title;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  align-items: center;
  border-radius: 2px;
  color: $body-font-color;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: $global-weight-bold;
  height: 18px;
  line-height: 1;
  text-transform: uppercase;
  width: 18px;

  svg {
    display: block;
    height: 12px;
    width: 12px;
  }
}
</style>
