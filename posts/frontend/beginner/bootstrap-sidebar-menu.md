You would think creating a sidebar would be easy, considering how
such task is so common.

If you have used Bootstrap in the past, this would probably be your
first instinct:

```
<div class="row">
  <div class="col-sm-3">
    Sidebar
  </div>
  <div class="col-sm-9">
    Page Content
  </div>
</div>
```

**Example**
<div class="col-sm-3 alert alert-success">
  Sidebar
</div>
<div class="col-sm-9 alert alert-info">
  Page Content
</div>

I don't know about you, but I usually want my sidebars to have
fixed width, while page content to have fluid width.

#### <span class="text-danger">Version 1:</span> Auto-hide Sidebar

Check out this example in [full-screen mode](http://jsfiddle.net/sahat/aAH2g/1/embedded/result/)
and you will notice that sidebar collapses automatically below 767px
browser width.

**Source:** [Start Bootstrap](http://startbootstrap.com/simple-sidebar)

<iframe width="100%" height="300" src="http://jsfiddle.net/sahat/aAH2g/1/embedded/result,html,css,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### <span class="text-danger">Version 2:</span> Fixed Sidebar + Header

This example uses affix to automatically highlight current section
in the sidebar as you scroll the page up or down. For best results take
a look at the [full-screen](http://jsfiddle.net/sahat/5PSne/2/embedded/result/) result.

**Source:** [Bootply](http://www.bootply.com/90936)

<iframe width="100%" height="300" src="http://jsfiddle.net/sahat/5PSne/3/embedded/result,html,css,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Snap.js](http://jakiestfu.github.io/Snap.js/demo/apps/default.html)
2. [Bootstrap Dashboard Sidebar](http://getbootstrap.com/examples/dashboard/)
3. [Bootstrap Blog Sidebar](http://getbootstrap.com/examples/blog/)

