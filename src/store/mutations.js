import chroma from "chroma-js";
import Vue from "vue";

export default {
  UPDATE_SETTINGS(state, { settings }) {
    state.settings = settings;
    state.token = settings.token;
    state.eventColors = settings.eventColors;
    state.columns = settings.columns.map(column => ({
      capacity: settings.events.capacity,
      events: [],
      ...column,
    }));
  },
  UPDATE_EMOTES(state, { emotes }) {
    state.emotes = emotes;
  },
  UPDATE_CHEERMOTES(state, { cheermotes }) {
    state.cheermotes = cheermotes;
  },
  ADD_EVENT_TO_COLUMN(state, { index, event }) {
    const column = state.columns[index];

    if (column) {
      if (column.events.length >= column.capacity) {
        column.events.shift();
      }

      column.events.push(event);
    }
  },
  UPDATE_USER(state, { user }) {
    state.user = user;
  },
  UPDATE_STREAM(state, { stream }) {
    state.stream = stream;
  },
  UPDATE_USER_COLOR(state, { userId, color }) {
    const userColor = typeof color === "string" ? chroma(color) : chroma.random();

    state.userColors[userId] = (userColor.luminance() < 0.5
      ? userColor.luminance(0.3)
      : userColor
    ).hex();
  },
  DELETE_USER_MESSAGES(state, { userId }) {
    for (const column of state.columns) {
      for (const event of column.events) {
        if (event.type === "action" || event.type === "message") {
          if (event.data.tags.userId === userId) {
            Vue.set(event, "isDeleted", true);
          }
        }
      }
    }
  },
  CLEAR_COLUMN_EVENTS(state, { index }) {
    const column = state.columns[index];

    if (column) {
      column.events = [];
    }
  },
};
