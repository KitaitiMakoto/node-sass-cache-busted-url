"use strict";

var cacheBustedUrl = require("./index.js");
var cacheBusters = require("./cache-busters.json");

module.exports = {
  "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
};
