import { findLast, sortBy } from "lodash";

const URL_PATTERN = /((?:https?(?::\/\/))(?:www\.)?[a-zA-Z\d-_.]+(?:\.[a-zA-Z\d]{2,})(?:(?:[-a-zA-Z\d:%_+.~#!?&//=@]*)(?:[,](?![\s]))*)*)/;
const MENTION_PATTERN = /@([^\u0000-\u007F]+|\w+)/; // eslint-disable-line no-control-regex

function parseEmotes(input, emotes = {}, cheermotes = {}, includeTwitchEmotes = false) {
  const emotePattern = /\S+/g;
  const cheermotePattern = /^(.+?)(\d+)$/;

  const tokens = [];

  let c = 0;
  let m;

  if (Object.keys(emotes).length > 0) {
    while ((m = emotePattern.exec(input))) {
      if (m[0] in emotes) {
        const emote = emotes[m[0]];

        if (includeTwitchEmotes || emote.provider !== "twitch") {
          if (m.index > c) {
            tokens.push({
              text: input.substr(c, m.index - c),
            });
          }

          tokens.push({
            text: m[0],
            emote: {
              name: m[0],
              url: emote.url,
            },
          });

          c = m.index + m[0].length;
        }
      } else if (cheermotePattern.test(m[0])) {
        const n = cheermotePattern.exec(m[0]);
        const prefix = n[1].toLowerCase();
        const amount = Number(n[2]);

        if (prefix in cheermotes) {
          const cheermote = findLast(cheermotes[prefix], c => amount >= c.minBits);

          if (cheermote) {
            if (m.index > c) {
              tokens.push({
                text: input.substr(c, m.index - c),
              });
            }

            tokens.push({
              text: n[0],
              cheermote: {
                name: n[0],
                amount: amount,
                url: cheermote.url,
                color: cheermote.color,
              },
            });

            c = m.index + m[0].length;
          }
        }
      }
    }
  }

  if (c < input.length) {
    tokens.push({
      text: input.substr(c),
    });
  }

  return tokens;
}

function parseMessagePart(input, emotes, cheermotes, includeTwitchEmotes) {
  const tokens = [];
  let s = input;

  while (s) {
    let m = s.length;
    let t;

    if (URL_PATTERN.test(s)) {
      const r = URL_PATTERN.exec(s);

      if (r.index < m) {
        t = { text: r[0], url: r[1] };
        m = r.index;
      }
    }

    if (MENTION_PATTERN.test(s)) {
      const r = MENTION_PATTERN.exec(s);

      if (r.index < m) {
        t = { text: r[0], mention: { username: r[1] } };
        m = r.index;
      }
    }

    if (m > 0) {
      tokens.push(...parseEmotes(s.substr(0, m), emotes, cheermotes, includeTwitchEmotes));
    }

    if (t) {
      tokens.push(t);
    }

    s = s.substr(m + (t ? t.text.length : 0));
  }

  return tokens;
}

function parseMessage(input, messageEmotes, emotes, cheermotes, includeTwitchEmotes) {
  const tokens = [];

  const inputLength = input.length;
  const messageEmoteQueue = sortBy(messageEmotes, o => o.start);

  let charIndex = 0;
  let symIndex = 0;
  let emote = null;
  let buffer = "";

  for (; symIndex < inputLength; charIndex++, symIndex++) {
    let charCode = input.charCodeAt(charIndex);

    if (!emote && messageEmoteQueue.length > 0) {
      emote = messageEmoteQueue.shift();
    }

    if (emote && symIndex === emote.start) {
      if (buffer.length > 0) {
        tokens.push(...parseMessagePart(buffer, emotes, cheermotes, includeTwitchEmotes));
      }

      buffer = "";
    }

    if (charCode >= 0xd800 && charCode <= 0xdbff) {
      charCode = input.charCodeAt(charIndex + 1);

      if (charCode >= 0xdc00 && charCode <= 0xdfff) {
        buffer += input.slice(charIndex, charIndex + 2);
        charIndex += 1;
      }
    } else {
      buffer += input.charAt(charIndex);
    }

    if (emote && symIndex >= emote.end) {
      tokens.push({
        text: buffer,
        emote: {
          name: buffer,
          url: `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`,
        },
      });

      buffer = "";
      emote = null;
    }
  }

  if (buffer.length > 0) {
    tokens.push(...parseMessagePart(buffer, emotes, cheermotes, includeTwitchEmotes));
  }

  return tokens;
}

export { parseMessage };
