import hyperid from "hyperid";

import { shouldAddEvent } from "../helpers";
import { parseMessage } from "../parser";

const instance = hyperid();

export default {
  async fetchUser({ commit, state }) {
    const url = `https://api.twitch.tv/helix/users${
      state.settings.channel ? `?login=${state.settings.channel}` : ""
    }`;

    await fetch(url, {
      headers: {
        accept: "application/vnd.twitchtv.v5+json",
        authorization: `Bearer ${state.token}`,
        "client-id": "drod2dsvd6k66jz6gp2iluam7yofsg",
      },
    }).then(async response => {
      commit("UPDATE_USER", {
        user: (await response.json()).data[0],
      });
    });
  },
  async fetchEmotes({ commit, state }) {
    const emotes = {};

    await fetch("https://api.betterttv.net/2/emotes")
      .then(async response => {
        const data = await response.json();

        for (const emote of data.emotes) {
          emotes[emote.code] = {
            provider: "betterttv",
            url: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
          };
        }
      })
      .catch(() => {});

    await fetch(`https://api.betterttv.net/2/channels/${state.user.login}`)
      .then(async response => {
        const data = await response.json();

        for (const emote of data.emotes) {
          emotes[emote.code] = {
            provider: "betterttv",
            url: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
          };
        }
      })
      .catch(() => {});

    await fetch("https://api.frankerfacez.com/v1/set/global")
      .then(async response => {
        const data = await response.json();

        for (const set of Object.values(data.sets)) {
          for (const emote of set.emoticons) {
            emotes[emote.name] = {
              provider: "frankerfacez",
              url: `https:${emote.urls["1"]}`,
            };
          }
        }
      })
      .catch(() => {});

    await fetch(`https://api.frankerfacez.com/v1/room/${state.user.login}`)
      .then(async response => {
        const data = await response.json();

        for (const set of Object.values(data.sets)) {
          for (const emote of set.emoticons) {
            emotes[emote.name] = {
              provider: "frankerfacez",
              url: `https:${emote.urls["1"]}`,
            };
          }
        }
      })
      .catch(() => {});

    commit("UPDATE_EMOTES", { emotes });
  },
  async fetchCheermotes({ commit, state }) {
    const cheermotes = {};

    await fetch(`https://api.twitch.tv/kraken/bits/actions?channel_id=${state.user.id}`, {
      headers: {
        accept: "application/vnd.twitchtv.v5+json",
        authorization: `Bearer ${state.token}`,
        "client-id": "drod2dsvd6k66jz6gp2iluam7yofsg",
      },
    })
      .then(async response => {
        const data = await response.json();

        for (const action of data.actions) {
          const cheermote = [];

          for (const tier of action.tiers) {
            if (tier.can_cheer) {
              cheermote.push({
                minBits: tier.min_bits,
                color: tier.color,
                url: tier.images.dark.animated["1"],
              });
            }
          }

          cheermotes[action.prefix.toLowerCase()] = cheermote;
        }
      })
      .catch(() => {});

    commit("UPDATE_CHEERMOTES", { cheermotes });
  },
  isAuthenticated({ state }) {
    return state.token !== null;
  },
  dispatchEvent({ commit, state }, { event, includeTwitchEmotes }) {
    switch (event.type) {
      case "message":
      case "resubscription":
      case "whisper": {
        if (!(event.data.tags.userId in state.userColors)) {
          commit("UPDATE_USER_COLOR", {
            userId: event.data.tags.userId,
            color: event.data.tags.color,
          });
        }

        break;
      }

      case "ban":
      case "timeout": {
        commit("DELETE_USER_MESSAGES", {
          userId: event.data.tags.targetUserId,
        });

        break;
      }
    }

    if (event.data.message) {
      event.data.messageTokens = parseMessage(
        event.data.message,
        event.data.tags.emotes,
        state.emotes,
        state.cheermotes,
        includeTwitchEmotes,
      );
    }

    for (const [index, column] of state.columns.entries()) {
      if (shouldAddEvent(event, column.channel, column.filters)) {
        commit("ADD_EVENT_TO_COLUMN", {
          index,
          event: { ...event, id: instance() },
        });
      }
    }
  },
};
