"use strict";

var assert = require("power-assert");

var fs = require("fs");
var sass = require("node-sass");
var cacheBustedUrl = require("../index");
var cacheBusters = require("../cache-busters.json");

it("sync", function() {
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

it("async", function(done) {
  var sourceFile = __dirname + "/example1.sass";
  var expected = fs.readFileSync(__dirname + "/example1.css").toString();
  var actual = sass.render({
    file: sourceFile,
    functions: {
      "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
    }
  }, function(err, result) {
    if (err) {
      assert.fail(err);
      return;
    };
    var actual = result.css.toString();
    assert(expected === actual);
    done();
  });
});
