"use strict";

var assert = require("power-assert");

var fs = require("fs");
var sass = require("node-sass");
var cacheBustedUrl = require("../index");
var cacheBusters = require("../cache-busters.json");

it("", function() {
  var sourceFile = __dirname + "/example1.sass";
  var expected = fs.readFileSync(__dirname + "/example1.css").toString();
  var actual = sass.renderSync({
    file: sourceFile,
    functions: {
      "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
    }
  }).css.toString();
  assert(expected === actual);
});
