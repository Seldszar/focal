window.settings = {
  /**
   * The channel to join.
   *
   * @type {String}
   */
  channel: "elajjaz",

  /**
   * The event colors.
   *
   * @type {Object}
   */
  eventColors: {
    ban: "#F63937",
    cheer: "#52B1E7",
    giftPaidUpgrade: "#33ED70",
    notice: "#E558FF",
    raid: "#E558FF",
    ritual: "#E558FF",
    resubscription: "#33ED70",
    subscription: "#33ED70",
    subscriptionGift: "#33ED70",
    subscriptionGiftCommunity: "#33ED70",
    timeout: "#F7A734",
  },

  /**
   * The event options.
   *
   * @type {Object}
   */
  events: {
    /**
     * The event capacity per column.
     *
     * @type {Number}
     */
    capacity: 150,
  },

  /**
   * The column options.
   *
   * @type {Array}
   */
  columns: [
    {
      title: "All Events",
    },
    {
      title: "Non Emote-Only Messages",
      filters: {
        types: {
          include: ["message"],
        },
        from: {
          exclude: ["Nightbot", "StreamElements"],
        },
        message: {
          emoteOnly: false,
        },
      },
    },
    {
      title: "Mentions",
      filters: {
        types: {
          include: ["message"],
        },
        from: {
          exclude: ["Nightbot", "StreamElements"],
        },
        message: {
          include: ["elajjaz"],
        },
      },
    },
    {
      title: "Cheers, Raids & Subscriptions",
      filters: {
        types: {
          include: [
            "cheer",
            "giftPaidUpgrade",
            "raid",
            "resubscription",
            "subscription",
            "subscriptionGift",
            "subscriptionGiftCommunity",
          ],
        },
      },
    },
    {
      title: "Moderator Messages",
      filters: {
        badges: {
          include: ["moderator"],
        },
        from: {
          exclude: ["Nightbot", "StreamElements"],
        },
      },
    },
    {
      title: "Bans & Timeouts",
      filters: {
        types: {
          include: ["ban", "timeout"],
        },
      },
    },
  ],
};
