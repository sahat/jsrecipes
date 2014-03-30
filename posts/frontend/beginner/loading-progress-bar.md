<script src="http://ricostacruz.com/nprogress/nprogress.js"></script>
<link rel="stylesheet" href="http://ricostacruz.com/nprogress/nprogress.css">
<script>
  $('#start').click(function() {
    NProgress.start();
  });

  $('#set').click(function() {
    NProgress.set(0.4);
  });

  $('#inc').click(function() {
    NProgress.inc();
  });

  $('#done').click(function() {
    NProgress.done();
  });
</script>


You may have noticed the light-blue progress bar on this site when page
is loading. I am using [ngProgress](http://victorbjelkholm.github.io/ngProgress) since
it integrates nicely with Angular.js, but it's basically the same thing as
[NProgress](https://github.com/rstacruz/nprogress/) on which it is based on.
NProgress is also more popular, actively maintained and is not Angular-specific,
so that's what I will cover here.

<div class="alert alert-info">
Using this loading progress bar really only makes
sense if you have an AJAX-based application, i.e. built on Angular, Ember,
Backbone, React, etc.
</div>
Download the [latest version](https://github.com/rstacruz/nprogress/releases)
of NProgress, then include both CSS and JS files in your HTML.

```
<script src="ngProgress.js"></script>
<link rel="stylesheet" href="ngProgress.css>
```

### Example Usage
<hr>

<button id="start" class="btn btn-primary">NProgress.start()</button> — shows the progress bar.

<button id="set" class="btn btn-primary">NProgress.set(0.4)</button> — sets a percentage.

<button id="inc" class="btn btn-primary">NProgress.inc()</button> — increments by a little.

<button id="done" class="btn btn-primary">NProgress.done()</button> — completes the progress.

You will mostly use `start()` right before you make an AJAX request
and `done()` when AJAX request successfully completes. For advanced usage
and configuration of NProgress refer to the official
[README](https://github.com/rstacruz/nprogress/#advanced-usage).

I don't know much about Ember, but in Backbone I use jQuery
`ajaxStart` and `ajaxComplete` functions to start and finish
progress bars.

```
$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxComplete(function() {
  NProgress.done();
});
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [ngProgress for Angular.js](http://victorbjelkholm.github.io/ngProgress)
2. [pace - automatic page load progress bar](http://github.hubspot.com/pace/)

