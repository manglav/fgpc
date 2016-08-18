'use strict';

/**
 * Helper for returning the current date, this is
 * required as using type.date().default(r.now()) in
 * thinky will result in errors being thrown
 *
 * https://github.com/neumino/thinky/issues/219#issuecomment-109816620
 */
function now() {
  return new Date();
}

function escapeRegex(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1');
}

function match(row, prop, text) {
  return row(prop).match(`(?i)${escapeRegex(text)}`);
}

module.exports = {
  now,
  match
};
