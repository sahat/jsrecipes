There are at least **3** different methods that you could use for Sass or LESS
integration:

1. LESS/Sass middleware (personal preference)
2. Build tool (e.g. Gulp, Grunt)
3. Connect Assets library

### LESS  Middleware

Let's start with LESS middleware.

```
npm install less-middleware
```

Then comes the configuration step:
```
// Module Dependencies
var less = require('less-middleware');

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
... // some middleware before
app.use(less({ src: __dirname + '/public', compress: true }));
app.use(express.static(path.join(__dirname, 'public')));
```
**Note:** LESS middleware has over 15 options, `compress` is one of them. When
this option is set to `true`, the compiled CSS will be minified.

By setting `src` path to `/public` directory, **less-middleware**  assumes
you have `styles.less` file inside the `css` folder. You can change that
by modifying `src`, `dest` and `prefix` options. You should refer to
[less-middleware documentation](https://github.com/emberfeather/less.js-middleware)
for more information.

### Sass Middleware

Setting up Sass middleware is very similar to LESS middleware. Start by
installing the module:

```
npm install node-sass
```

Then just as with LESS middleware, create an instance of **node-sass**
and set up the middleware:

```
// Module Dependencies
var sass = require('node-sass');

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
... // some middleware in between
app.use(sass.middleware({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
```

Unlike LESS middleware, Sass middleware assumes you have `stylesheets` directory
that contains `style.scss`. I know it's frustrating that every middleware
module has its own convention for doing things, but that's the way it is.

Similarly to LESS middleware, there are a bunch of options you can override,
such as `src`, `dest`, `debug`, `outputStyle`. You should refer to
[node-sass documentation](https://github.com/andrew/node-sass#options)
 for more information.

#### <i class="fa fa-plus"></i> Middleware Pros:
- "Set it and forget it" mode. You don't have to worry about manually compiling stylesheets
or running any build tools. It just works.
#### <i class="fa fa-minus"></i> Middleware Cons:
- Very confusing `src` and `dest` path convention.


### Gulp

[Gulp](http://gulpjs.com) is the new cool kid on the block; a direct rival to Grunt. What I love about
Gulp is how it is incredibly fast. In fact I am using Gulp for this project
to compile Sass stylesheets. Take a look at the compilation speed after I made
a small change to my stylesheet.

![](images/backend/beginner/using-sass-and-less-in-express.png)

**439 microseconds!** Please keep in mind that my `main.scss` stylesheet also imports
the entire [Bootstrap Sass](https://github.com/twbs/bootstrap-sass) and
[Font Awesome](http://fortawesome.github.io/Font-Awesome/) libraries. I suspect
the reason behind why Gulp is so fast has to do with partial compilation, i.e.
it compiles only those parts that have been changed. For the sake of comparison,
Grunt takes over 2 seconds on average to re-compile the same stylesheet.

Before you can execute the gulpfile, you have to install **gulp** both locally and
globally. Although they both have the same name, they serve two different purposes:

```
npm install gulp
sudo npm install -g gulp
```

The first line installs local **gulp** module to be used in `gulpfile.js`. The second
line install global **gulp cli** module (command line interface) that you can run from your
terminal, e.g. `gulp`, `gulp build`, `gulp watch` or `gulp whatever-task`.

**gulpfile.js**
```
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles'));
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
```

**Note:** This example only shows the *Sass* task, but you could easily replace
it with [gulp-less](https://github.com/plus3network/gulp-less) or even
[gulp-stylus](https://github.com/stevelacy/gulp-stylus).

Gulpfile is very similar to a typical node application. It consists of module
dependencies at the top and task functions that you wish to run. Since I have included
`watch` task inside `gulp.task('default', ['sass', 'watch']);`, so when you run
`gulp` from the command line, it will compile your stylesheets and will automatically
start monitoring for changes.

There is an excellent blog post [Getting Started with Gulp](http://travismaynard.com/writing/getting-started-with-gulp)
by **Travis Maynard** if you would to learn more about Gulp. It is an excellent
general purpose build-tool that you can use from compiling stylesheets to
optimizing images and concatenating scripts. Even if you are planning to use
Express middleware or Connect Assets to manage LESS/Sass stylesheets, I still highly
recommend learning Gulp (or Grunt if that's your preference).

#### <i class="fa fa-plus"></i> Build Tool Pros:
- Completely Backend and Frontend agnostic.
- Flexible. Besides stylesheet compilation, you can use it for JavaScript minification
and concatention, image optimization, string replacement, livereload, testing,
linting, and so much more.
#### <i class="fa fa-minus"></i> Build Tool Cons:
- You have to remember running `gulp` or `grunt` in the terminal prior to launching
the server. There were so many times when I was updating the Sass stylesheet, but styles
weren't being updated, until I realized I forgot to run `gulp`.


### Connect Assets

Last but not least there is [Connect Assets](https://github.com/adunkman/connect-assets/tree/v3).
In this tutorial I will talk about connect-assets v3 beta2, which at this moment is on a separate
GitHub branch. From my experience it is miles better than v2.5 on the master branch.

If you are familiar with Rails Asset Pipeline then you will feel right at home, if not
that's okay, I have never used Rails either.

Connect ASsets does more than just compile stylesheets, it also concatenates and
minifies JavaScript files in *production mode* if you choose that option. But
for the purposes of this guide, I will only cover Sass and LESS stylesheets
compilation.

First, install **connect-assets** and a specific compiler:

```
npm install connect-assets
npm install less
npm install node-sass

// For minification in production install this too
npm install csso
```

After you have installed npm dependencies, add the following **connect-assets** middleware:
```
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('connect-assets')({
    paths: ['public/css'],
    helperContext: app.locals
}));
...
// the rest of the middleware
```

**Note:** I am using connect-assets right at the same time as I am **require**ing it.
But feel free to break it apart into var `connectAssets = require('connect-assets');` and
then use `connectAssets` in the Express middleware.

Don't worry too much about this option `helperContext: app.locals`. It basically allows us to
use the next code inside Jade templates:

**layout.jade**
```
doctype html
html
  head
    title= title
    != css('less-style')
    != css('sass-style')
  body
    block content
```

Check this out, you can use both LESS and Sass in the same project. Since `paths`
is set to `/public/css`, the following code will look for **less-style** and **sass-style**
files. Depending on the file extension, it will execute the correct compiler. In this case I have
**less-style.less** and **sass-style.scss** inside the `css` folder. Pretty neat, huh?

The real beauty of this library is that it will serve unminified compiled CSS files in
*development mode* running on `localhost`, but when you deploy your app to the
cloud, connect-assets will automatically minify and concatenate your stylesheets,
the same is also true for your client-side JavaScript files, e.g. jQuery, Bootstrap.

#### <i class="fa fa-plus"></i> Connect Assets Pros:
- Very flexible, works with CoffeeScript, LESS, Sass, Stylus.
- Smart enough to run unminified stylesheets and scripts in *development mode*, but
concatenates and minifies in *production mode*.
- Easy to use.
#### <i class="fa fa-minus"></i> Connect Assets Cons:
- The new syntax in your templates might seem a little alien to someone who has never
heard of connect-assets.
- Slightly slows down the app startup process because it has to pre-compile stylesheets.
In my experience it roughly adds an extra ~500ms startup delay. While it's not much,
you can certainly feel it.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Getting Started with Gulp](http://travismaynard.com/writing/getting-started-with-gulp)
2. [LESS-Middleware: Using LESS with Node.js](http://blog.dylants.com/2013/03/16/less-middleware-using-less-with-node-js/)
3. [Node-Sass GitHub Project](https://github.com/andrew/node-sass)
4. [Connect Assets v3.0.0 GitHub Project](https://github.com/adunkman/connect-assets/tree/v3)
