"use strict";

var sass = require("node-sass");

function cacheBustedUrl(cacheBusters, url) {
  var value = url.getValue();
  if (! (value in cacheBusters)) {
    throw new Error("Cache buster for " + value + " not found");
  }
  var newValue = cacheBusters[value];
  var replacement = sass.types.String('url("' + newValue + '")');

  return replacement;
}

module.exports = function(cacheBusterFile) {
  var cacheBusters = require(cacheBusterFile);
  return {
    "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
  };
};
