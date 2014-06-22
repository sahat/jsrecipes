<script src="https://raw.githubusercontent.com/CWSpear/bootstrap-hover-dropdown/master/bootstrap-hover-dropdown.min.js"></script>

Sometimes you need to open Bootstrap dropdowns on mouse over, however it is not
always the case, but when you need you **really** need it. If you look around
on the internet, you might stumble upon StackOverflow posts that require
[crazy css hacks](http://stackoverflow.com/questions/8878033/how-to-make-twitter-bootstrap-menu-dropdown-on-hover-rather-than-click)
to get it done. Thankfully there is a nice library called [bootstrap-hover-dropdown](https://github.com/CWSpear/bootstrap-hover-dropdown).

Download minified JS file from the [GitHub Project](https://github.com/CWSpear/bootstrap-hover-dropdown)
and include it **after** jQuery and Bootstrap.js:

```html
<script src="bootstrap-hover-dropdown.min.js"></script>
```

Add `data-hover="dropdown"` to the **dropdown-toggle** element.

```html
<div class="btn-group">
  <button class="btn btn-success dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
    Dropdown on Hover <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
<div class="btn-group">
  <button class="btn btn-danger dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="2000">2000ms Close Delay <b class="caret"></b></button>
  <ul class="dropdown-menu">
    <li><a tabindex="-1" href="#">Why Would</a></li>
    <li><a tabindex="-1" href="#">A Home Tab</a></li>
    <li><a tabindex="-1" href="#">Have Dropdowns?</a></li>
  </ul>
</div>
```

<div class="btn-group">
  <button class="btn btn-success dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
    Dropdown on Hover <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
<div class="btn-group">
  <button class="btn btn-danger dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="2000">2000ms Close Delay <b class="caret"></b></button>
  <ul class="dropdown-menu">
    <li><a tabindex="-1" href="#">Why Would</a></li>
    <li><a tabindex="-1" href="#">A Home Tab</a></li>
    <li><a tabindex="-1" href="#">Have Dropdowns?</a></li>
  </ul>
</div>
<br>

You can still use original Bootstrap dropdowns that work on click, just don't include
`data-hover="dropdown"` attribute.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [bootstrap-hover-dropdown](https://github.com/CWSpear/bootstrap-hover-dropdown)
