<script src="http://masonry.desandro.com/masonry.pkgd.min.js"></script>
<style>
.item { width: 200px; }
</style>

Creating a dynamic grid of thumbnails or `<div>` containers is super
easy with [Masonry](http://masonry.desandro.com). If you've run across
this UI pattern, they are probably using Masonry, or its variations:
[Isotope](http://isotope.metafizzy.co), [Packery](http://packery.metafizzy.co/),
[Wookmark](http://www.wookmark.com/jquery-plugin). They are all
pretty similar, but each with a distinguishing feature. For example, I use
[Isotope](http://isotope.metafizzy.co) instead of Masonry on
[Allison Eckfeldt's](http://kazlovesbats.com) website, because I need to sort
thumbnails by date.

![](images/frontend/beginner/pinterest-grid-layout-1.png)

Masonry is just a grid layout, it doesn't have anything like sorting or
filtering. For that you should use Isotope instead.

#### Getting Started
Download [masonry.pkgd.min.js](http://masonry.desandro.com/masonry.pkgd.min.js)
and include it in your HTML:

```html
<script src="/path/to/masonry.pkgd.min.js"></script>
```

Add this to your stylesheet:
```css
.item {
  width: 200px;
}
```

Masonry works on a container element with a group of similar child items. Now,
to initialize Masonry, you can do it with JavaScript or in HTML, without writing
any JavaScript. I prefer the HTML approach because it is simpler. Just add
`js-masonry` to the class of the container element and set options via
`data-masonry-options`. Here is a [full list of options](http://masonry.desandro.com/options.html)
with code and visual examples.

```html
<div id="container" class="js-masonry" data-masonry-options='{ "gutter": 10, "columnWidth": 200, "itemSelector": ".item" }'>
  <div class="item alert alert-info">Each Masonry element is 200px wide</div>
  <div class="item alert alert-danger">For Masonry to work, each item must have a common class name such as .item</div>
  <div class="item alert alert-success">As you resize the browser window, grid layout will adjust automatically</div>
  <div class="item alert alert-warning">You can also specify the gutter width between each element via gutter option</div>
  <div class="item alert alert-info">Masonry can be initialized using JavaScript or in HTML</div>
</div>
```
If you prefer to initialize it with JavaScript, here is how you would do it:
```javascript
// Pure JS
var container = document.querySelector('#container');
var msnry = new Masonry(container, {
  gutter: 10,
  columnWidth: 200,
  itemSelector: '.item'
});

/** OR **/

// jQuery
$('#container').masonry({
  gutter: 10,
  columnWidth: 200,
  itemSelector: '.item'
})
```

#### Demo
<iframe width="100%" height="300" src="http://jsfiddle.net/sahat/yhXLb/embedded/result,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
#### Final Notes
If you are planning on doing something more complex with this grid layout,
take a look at [Masonry Methods](http://masonry.desandro.com/methods.html).
For instance, you could dynamically append new items to the grid, perhaps in
combination with [infinite scrolling](#!/frontend/infinite-scrolling)?

For a unique bin-packing algorithm (fill all empty gaps) and draggable
interactions use [Packery](http://packery.metafizzy.co/). For filtering,
sorting and multiple layout algorithms use [Isotope](isotope.metafizzy.co).
