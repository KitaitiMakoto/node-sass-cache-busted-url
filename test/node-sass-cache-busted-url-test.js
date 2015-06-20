"use strict";

var assert = require("power-assert");

var fs = require("fs");
var sass = require("node-sass");

var cacheBustedUrl = require("../index");
var cacheBusters = require("../cache-busters.json");

describe("cache-busted-url", function() {
  before(function() {
    this.sourceFile = __dirname + "/example1.sass";
    this.expected = fs.readFileSync(__dirname + "/example1.css").toString();
  });

  it("sync", function() {
    var actual = sass.renderSync({
      file: this.sourceFile,
      functions: {
        "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
      }
    }).css.toString();
    assert(this.expected === actual);
  });

  it("async", function(done) {
    var context = this;
    var actual = sass.render({
      file: this.sourceFile,
      functions: {
        "cache-busted-url($url)": cacheBustedUrl.bind(null, cacheBusters)
      }
    }, function(err, result) {
      if (err) {
        assert.fail(err);
        return;
      };
      var actual = result.css.toString();
      assert(context.expected === actual);
      done();
    });
  });
});

describe("CLI", function() {
  it("custom-functions.js", function() {
    var expected = fs.readFileSync(__dirname + "/example1.css").toString().trim();
    var commandPath = "$(npm bin)/node-sass";
    var customFunctionsPath = __dirname + "/../custom-functions.js";
    var sassFilePath = __dirname + "/example1.sass";
    var command = [commandPath, "--functions=" + customFunctionsPath, sassFilePath].join(" ");
    var actual = require("child_process").execSync(command).toString().trim();
    assert(expected === actual);
  });
});
