"use strict";

var sass = require("node-sass");

function cacheBustedUrl(cacheBusters, url, done) {
  var value = url.getValue();
  if (! (value in cacheBusters)) {
    throw new Error("Cache buster for " + value + " not found");
  }
  var newValue = cacheBusters[value];
  var replacement = sass.types.String('url("' + newValue + '")');

  if (typeof done === "function") {
    done(replacement);
  } else {
    return replacement;
  }
}

module.exports = cacheBustedUrl;
