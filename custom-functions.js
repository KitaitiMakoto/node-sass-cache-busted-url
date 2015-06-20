"use strict";

var cacheBustedUrl = require("./index.js");

var cacheBusters = {};
var cacheBustersPath = process.env.CACHE_BUSTERS_PATH;
if (cacheBustersPath) {
  cacheBusters = require(cacheBustersPath);
}

module.exports = {
  "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
};
