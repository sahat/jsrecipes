<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You have a large monolithic client-side code that needs to be modularized. Unlike
  Node.js, front-end developers don't have an ability to #include/import/require
  a module, and that's what Require.js is trying to solve. If you are still not
  convinced on why you should use Require.js for your project, head over to
  <a href="https://gist.github.com/desandro/4686136">Can you help me understand the benefit of require.js?</a>
</div>

In the Summer 2013, I decided to learn Backbone.js. The best way to learn any
new technology is to build a side-project with it. And so I did - [New Eden Faces](http://newedenfaces.com).
Projects that I used a reference  had all their JavaScript code located either in a
single **app.js** file or across multiple scripts that were then loaded separately in
**index.html**. It was a simple concept and I could understand that code. I strongly
believed that Require.js syntax was so idiotic that I couldn't help but wonder
why anyone in the right mind would use it. The benefits of Require.js didn't come
to my realization until much later.

<div class="alert alert-success">
  <h4>New to Require.js?</h4>
  Check out this amazing 16-minute screencast by Jeffrey Way that will teach you
  the basics you need to know in order to use Require.js. I highly recommend
  to watch it.
</div>

<div class="video-container">
  <iframe width="560" height="315" src="//www.youtube.com/embed/USk1ie30z5k" frameborder="0" allowfullscreen></iframe>
</div>

<br>

Once you get past the difficult syntax, Require.js is actually pretty nice. One
of the biggest benefits you get with Require.js is modular application design.

Taking *New Eden Faces* as an example, my entire Backbone app was in a single
JS file - over a 1000 lines long. It was a tangled mess of collections, models and
views, not to mention all my templates were inline `script` tags in **index.html**.
It became difficult to navigate the project while I was working on it. After I
took a break from the project and came back a few months later, I was staring at
the code in bewilderment - "Did I write this code?!". Granted, I didn't do
anything to organize the code better, but in my defense it was my first Backbone
application, I just wanted to make it work.

Currently the project is nicely organized into Require.js modules, segregated by folders.
I won't go into details as what the code does since this  isn't a Backbone.js
tutorial, but I will explain the Require.js portion of this code snippet.

First read this official explanation and you will see that's pretty much exactly
the same structure we have in the code snippet below. The source code for this
project is on [sahat/newedenfaces](https://github.com/sahat/newedenfaces).

> If the module has dependencies, the first argument should be an array of
dependency names, and the second argument should be a definition function.
The function will be called to define the module once all dependencies have
loaded. The function should return an object that defines the module.
The dependencies will be passed to the definition function as function arguments,
listed in the same order as the order in the dependency array.

**views/Character.js**
```javascript
define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/character.html'],
  function(_, $, Backbone, CharacterTpl) {

  var CharacterView = Backbone.View.extend({
    tagName: 'li',

    className: 'list-group-item',

    template: _.template(CharacterTpl),

    initialize: function(options) {
      this.options = options || {};
    },

    render: function() {
      this.$el.html(this.template({
        model: this.model.toJSON(),
        position: this.options.position
      }));
      return this;
    }
  });

  return CharacterView;
});
```
**Note:** *Order matters*. In other words the order in which you define an array
of dependency names will correspond to the exactly the same order function
definitions. If **underscore** is the first string in the array, it will also
be the first parameter in the callback function, as you can see in the example
above.

`CharacterView` is responsible for rendering a single character on the [Top 100](www.newedenfaces.com/#top)
page. I have another view - `CharacterCollectionView` that instantiates this
view for each character. You probably see where this is going. One view depends
on another view. And each view depends on jQuery, Backbone and sometimes an HTML
template.

![](images/frontend/advanced/organizing-code-with-requirejs-1.png)

The important concept to note here is how we can organize our client-side code
using isolated modules that could be loaded as dependencies in other modules.

Here is basically how **CharacterView.js** works in layman terms:

> I am a module. In order for me to work, I need **jQuery**
to render myself, also **Backbone** to create a `Backbone.View`, I need **underscore** to
parse the template and I also need the template itself - **character.html**. If you
provide me all those dependencies, I will make myself available so that others
can use me in their modules."

For completeness, here is the `CharacterCollectionView` that uses the `CharacterView`
that we have above:

**views/CharacterCollection.js**
```javascript
define([
  'underscore',
  'jquery',
  'backbone',
  'views/Character',
  'text!templates/menu-leaderboard.html'
], function(_, $, Backbone, CharacterView, MenuLeaderboardTpl) {

  var CharacterCollectionView = Backbone.View.extend({
    tagName: 'ul',

    className: 'list-group list-group-flush',

    template: _.template(MenuLeaderboardTpl),

    addOne: function(character, index) {
      var characterView = new CharacterView({ model: character, position: index + 1 });
      this.$el.append(characterView.render().el);
    },

    render: function() {
      this.collection.each(this.addOne, this);
      return this;
    }
  });

  return CharacterCollectionView;
});
```

The only thing of importance here is that we can use `CharacterView` module that
we just defined inside another module. Ignoring all that repetitive ceremony of
`define`, this approach allows us to organize code into individual modules. Also
it is worth mentioning that you won't run into scoping issues or name conflicts since
each module is in its own scope, whereas having all your code in a single file,
in the same scope, increases the likelihood of name collision somewhere in your
code. It is also easier to debug individual modules when a problem arises.

I would like to briefly mention how to configure Require.js. (Where do you think
**underscore**, **jQuery** and **Backbone** modules were coming from inside
those views we defined above?)

For *New Eden Faces* I have used [Backbone Boilerplate](https://github.com/backbone-boilerplate/backbone-boilerplate)
project that separates **main.js** and **config.js** into separate files. Many
examples you find on the internet will include `require.config` inside **main.js**.
Use whatever approach that makes sense to you, you can always refactor later.

**config.js**
```javascript
require.config({
  paths: {
    'vendor': './vendor',
    'almond': 'vendor/almond',
    'underscore': 'vendor/lodash.underscore.min',
    'jquery': 'vendor/jquery.min',
    'backbone': 'vendor/backbone-min',
    'text': 'vendor/requirejs-text',
    'alertify': 'vendor/alertify.min',
    'magnific-popup': 'vendor/jquery.magnific-popup.min',
    'bootstrap-dropdown': 'vendor/bootstrap-dropdown',
    'chart': 'vendor/Chart.min',
    'photoset': 'vendor/jquery.photoset-grid.min',
    'PageableCollection': 'vendor/backbone-pageable'
  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'magnific-popup': {
      deps: ['jquery']
    },
    'typeahead': {
      deps: ['jquery']
    },
    'bootstrap-dropdown': {
      deps: ['jquery']
    },
    'toastr': {
      deps: ['jquery']
    },
    'chart': {
      exports: 'Chart'
    },
    'photoset': {
      deps: ['jquery']
    },
    'PageableCollection': {
      deps: ['underscore', 'backbone'],
      exports: 'PageableCollection'
    }
  }
});
```

Everything that is specified in `paths` can be accessed from within `define` in your
modules. You could have skipped creating `paths` for some modules, but would
you really want to type `vendor/lodash.underscore.min` for underscore path in
every single module? All other files that are not defined here can still be
accessed using relative path, where relative path is related to `baseUrl`. If
`baseUrl` is not specified it defaults to the location of **main.js**.

![](images/frontend/advanced/organizing-code-with-requirejs-2.png)

That's how we were able to access `CharacterView` by specifying its relative
path at **views/Character**, and as you may have already noticed `.js` extension
is implied:

```javascript
define([
  'underscore',
  'jquery',
  'backbone',
  'views/Character',
  'text!templates/menu-leaderboard.html'
], function(_, $, Backbone, CharacterView, MenuLeaderboardTpl) {

});
```

### Final Note
There are so many examples of Require.js + Backbone that it might give you
a false impression that Require.js works only with Backbone. Take a look at
[CloudBucket Source Code](https://github.com/sahat/cloudbucket/tree/master/public/js) -
another one of my projects that uses Require.js + jQuery + jQuery Plugins and
third-party libraries. In *CloudBucket*, each Require.js module corresponds to
a page.

Oh, one last thing. As an alternative to Require.js there is also [Browserify](http://browserify.org/).
I don't have any experience with it, but I am putting it out there for you to check
out. Require.js is not the only module loader out there. And if you wait long
enough for ECMAScript 6 to roll out for general public, you will be able to use
JavaScript modules natively without any libraries or special compilers. I have
added a link below that talks more about ECMAScript 6 modules.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Organizing your Backbone application using modules](http://backbonetutorials.com/organizing-backbone-using-modules/)
2. [ECMAScript 6 Modules: What Are They and How to Use Them Today](http://www.infoq.com/news/2013/08/es6-modules)