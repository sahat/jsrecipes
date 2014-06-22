In order to deliver a better user experience, it is our job, as developers, to
make it happen. The first thing you should do is run your web page through
[PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights). Most
of those problems are very easy to fix using [Gulp](http://gulpjs.com) build system.

![](images/backend/intermediate/optimizing-assets-with-gulp-1.png)

#### <i class="fa fa-picture-o text-danger"></i> Optimize Images

It's amazing how much you can cut down on the payload by optimizing images first.
The best part about it - you will not notice any difference in image quality!

[gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) is a Gulp plugin
for minifying PNG, JPEG and GIF images.

```
npm install --save-dev gulp-imagemin
```

**Example**
```
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('default', function () {
  gulp.src('src/image.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist'));
});
```

How many kilobytes you save by compressing an image depends on the image itself.
Just to give you some persective, the initial size of a screenshot that I took
was **360 KB**, but after compression it is **242 KB**.

![](images/backend/intermediate/optimizing-assets-with-gulp-2.png)

I would like to add on more thing on the topic of image optimization. If you have
a responsive site that works on multiple devices, it is wasteful to serve large
image files, where *Macbook Pro with Retina Display* sets the base for image
resolutions. You can always scale an image down, but it doesn't work in reverse.
If you have an image with 250x250 dimensions, you can scale it down so it looks
good on both retina and non-retina displays.

```
<img src="image.png" width="125" height="125">
```

If you are interested in learning more about responsive image solutions, please
check out [Imager.js](https://github.com/BBC-News/Imager.js/), it is an open-source
project created by [BBC News](https://github.com/BBC-News).

#### <i class="fa fa-css3 text-danger"></i> Minify CSS

CSS minification removes unnecessary comments, spaces, line breaks and indentation
that typically serve no purpose in production.

[gulp-cssmin](https://github.com/chilijung/gulp-cssmin) is a Gulp plugin for
minifying CSS files.

```
npm install --save-dev gulp-cssmin
```

**Example**
```
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');

gulp.task('default', function () {
  gulp.src('src/**/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});
```

#### <i class="fa fa-css3 text-danger"></i> Remove Unused CSS

If you are using CSS frameworks like Bootstrap or Foundation there is a good
chance you don't use *all* styles from the framework, but only a small subset. You
could easily reduce the file size of your styles by removing unused CSS.

<blockquote class="twitter-tweet" lang="en"><p>Weekend dev - tried grunt-uncss on a bootstrap.css rails landing page. All in ~15 minutes for ~100K savings. Diff: <a href="https://t.co/MaJTiXrtUd">https://t.co/MaJTiXrtUd</a></p>&mdash; Tom Fuertes (@thisbetom) <a href="https://twitter.com/thisbetom/statuses/432575411138998273">February 9, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[gulp-uncss](https://github.com/ben-eb/gulp-uncss) is a Gulp plugin for
removing unused CSS.

```
npm install --save-dev gulp-uncss
```

**Example**
```
var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('default', function() {
  gulp.src('site.css')
    .pipe(uncss({
        html: ['index.html', 'about.html']
    }))
    .pipe(gulp.dest('./out'));
});
```

#### <i class="fa fa-code text-danger"></i> Minify JavaScript

Given the amount of JavaScript on a modern website, it is important more than
ever to minify JavaScript files in production. If you only have one small
JavaScript file, you probably won't see any performance gain by minifying the file.
On the other hand, if you have a Backbone.js app with 50 files, loaded via
[Require.js](http://requirejs.org), you really **have to** to minify and
concatenate all your JavaScript files.

[gulp-uglify](https://github.com/terinjokes/gulp-uglify) is a Gulp plugin for
minifying and compressing JavaScript.

```
npm install --save-dev gulp-uglify
```

**Example**
```
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
```

<div class="alert alert-info">
  <h4>Gulp and Require.js</h4>
  <p>Take a look at this <a href="https://github.com/sahat/requirejs-library/blob/master/gulpfile.js">gulpfile.js</a>
  to see an example of <strong>Gulp + Require.js</strong> integration. The r.js optimizer already comes
  with a minifier, so you don't need a separate <a href="https://github.com/terinjokes/gulp-uglify">gulp-uglify</a>
  plugin.
  </p>
</div>

#### <i class="fa fa-sitemap text-danger"></i> Concatenate JavaScript
If you are using a ton of JavaScript files in your project, minifying them is
the first step, but you still have to concatenate them into a single file. There
is a big performance difference in making 30 small, separate HTTP requests vs 1
large HTTP request. Always serve concatenated and minified JS in production.
If you are using Require.js, it already concatenates and minifies files for you,
but otherwise you will need a separate Gulp plugin to do that.

[gulp-concat](https://github.com/wearefractal/gulp-concat) is a Gulp plugin for
concatenating JavaScript.

```
npm install --save-dev gulp-concat
```

**Example**
```
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});

// or use an array instead

gulp.task('scripts', function() {
  gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
```


<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Getting Started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/)
2. [Grunt and Gulp Tasks for Performance Optimization](http://yeoman.io/blog/performance-optimization.html)
