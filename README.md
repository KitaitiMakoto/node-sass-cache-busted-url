node-sass-cache-busted-url
==========================

Sass custom function to replace URLs with ones with cache buster strings. Usable in node-sass.

USAGE
-----

Let case as below:

```scss
// example.scss

body {
  background: cache-busted-url("/images/bg.png") no-repeat;
}
```

```json
// cache-busters.json
// expected to generate by programs like gulp-rev

{
  "/images/bg.png": "/images/bg-3d1fc66b0a4bb6af83ea234d1f510408.png",
  ...
}
```

### JavaScript API ###

```javascript
var sass = requrie("node-sass");
var cacheBustedUrl = require("node-sass-cache-busted-url");

// Specify cache busters file
var cacheBusters = require(./cache-busters.json);

// Determine function signature used in Sass file
var functionSignature = "cache-busted-url($url)";

// Apply cache busters
var bustersDefinedBuster = cacheBustedUrl.bind(null, cacheBusters);

// Render CSS with pass `functions` options
var compiled = sass.renderSync({
  file: "./example.scss",
  functions: {
    functionSignature: bustersDefinedBuster
  }
});
console.log(compiled.css.toString());
// body {
//   background: url("/images/bg-3d1fc66b0a4bb6af83ea234d1f510408.png") no-repeat; }
```

### Command-line interface ###

`node-sass` accepts `functions` options to specify file which defines Sass custom functions.

```
$ CACHE_BUSTERS_PATH=cache-busters.json \
  $(npm bin)/node-sass \
  --functions=node_modules/node-sass-cache-busted-url/custom-functions.js \
  example.scss
body {
  background: url("/images/bg-3d1fc66b0a4bb6af83ea234d1f510408.png") no-repeat; }

```

### Customize function name ###

As advanced usage of library, you can change the name of Sass custom function. Let's use it as `image-url` function:

```scss
// example.scss

body {
  background: image-url("/images/bg.png") no-repeat;
}
```

```json
// cache-busters.json

{
  "/images/bg.png": "/images/bg-3d1fc66b0a4bb6af83ea234d1f510408.png",
  ...
}
```

Then execute JavaScript. Note that the value of `functionSignature` is changed:

```javascript
var sass = requrie("node-sass");
var cacheBustedUrl = require("node-sass-cache-busted-url");

// Specify cache busters file
var cacheBusters = require(./cache-busters.json);

// Determine function signature used in Sass file
var functionSignature = "image-url($url)";

// Apply cache busters
var bustersDefinedBuster = cacheBustedUrl.bind(null, cacheBusters);

// Render CSS with pass `functions` options
var compiled = sass.renderSync({
  file: "./example.scss",
  functions: {
    functionSignature: bustersDefinedBuster
  }
});
console.log(compiled.css.toString());
// body {
//   background: url("/images/bg-3d1fc66b0a4bb6af83ea234d1f510408.png") no-repeat; }
```

LICENSE
-------

LGPLv3 or later. See LICENSE for details.
