Last Summer, in 2013, I decided to learn Backbone.js. The best way to learn a
new technology is to build a side-project with it. And so I did - [New Eden Faces](http://newedenfaces.com).
Projects that I used a reference  had all their JavaScript code located either in a
single **app.js** file or accross multiple scripts that were then loaded separately in
**index.html**. It was a simple concept and I could understand that code. I strongly
believed that Require.js syntax was so idiotic that I couldn't help but wonder
why anyone in the right mind would use it. The benefits of Require.js didn't come
to my realization until much later.

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
it is worth noting that you won't run into scoping issues or name conflicts since
each module is in its own scope, whereas having all your code in a single file,
in the same scope, increases the likelihood of name collision somewhere in your
code. It is also easier to debug individual modules when there is a problem.


