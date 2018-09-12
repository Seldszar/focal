import { isMatch } from "lodash";

function includesMessageTerm(messageTokens, term) {
  for (const token of messageTokens) {
    if ("emote" in token) {
      continue;
    }

    if (token.text.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
      return true;
    }
  }

  return false;
}

function isEmoteOnlyMessage(messageTokens) {
  for (const token of messageTokens) {
    if ("mention" in token) {
      continue;
    }

    if ("emote" in token) {
      continue;
    }

    if (token.text.trim() !== "") {
      return false;
    }
  }

  return true;
}

export function shouldAddEvent(event, channel, filters) {
  // if (channel !== event.data.channel) {
  //   return false;
  // }

  if (filters == null) {
    return true;
  }

  if ("types" in filters) {
    if ("include" in filters.types) {
      if (!filters.types.include.includes(event.type)) {
        return false;
      }
    }

    if ("exclude" in filters.types) {
      if (filters.types.exclude.includes(event.type)) {
        return false;
      }
    }
  }

  if ("tags" in filters) {
    if (!isMatch(event.data.tags, filters.tags)) {
      return false;
    }
  }

  if ("from" in filters) {
    if ("include" in filters.from) {
      if (!filters.from.include.includes(event.data.tags.displayName)) {
        return false;
      }
    }

    if ("exclude" in filters.from) {
      if (filters.from.exclude.includes(event.data.tags.displayName)) {
        return false;
      }
    }
  }

  if ("messageTokens" in event.data) {
    if ("message" in filters) {
      if (typeof filters.message.onlyEmotes === "boolean") {
        if (filters.message.onlyEmotes !== isEmoteOnlyMessage(event.data.messageTokens)) {
          return false;
        }
      }

      if ("include" in filters.message) {
        for (const term of filters.message.include) {
          if (!includesMessageTerm(event.data.messageTokens, term)) {
            return false;
          }
        }
      }

      if ("exclude" in filters.message) {
        for (const term of filters.message.exclude) {
          if (includesMessageTerm(event.data.messageTokens, term)) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

export function getUptime(date) {
  const duration = Date.now() - date;

  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let seconds = parseInt((duration / 1000) % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
}
