Emmet is a plugin for many popular text editors like Vim, Sublime Text,
Eclipse, WebStorm, Esresso. which greatly improves HTML & CSS workflow.
It allows you to quickly expand simple abbreviations into snippets of code with
a <kbd>Tab</kbd> key.

#### Create new HTML document
<button class="btn btn-primary">html:5</button>
<div ui-codemirror="{ mode: 'html' }">
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

</body>
</html>
</div>
```
</div>


#### Add class or id to an element
```
button.btn.btn-primary →

<button class="btn btn-primary"></button>
```

```
div#footer →

<div id="footer"></div>
```

You can also use both at the same time:
```
table#items.table.table-hover →

<table id="items" class="table table-hover"></table>
```

If you omit element, div tag will be created:

```
.well →

<div class="well"></div>
```

#### Child Nesting
```
nav>ul>li →

<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```

#### Multiplication
```
ul>li*5 →

<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

#### Numbering
```
ul>li.item$*3 →

<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
</ul>
```




1. [Emmet Cheat Sheet](http://docs.emmet.io/cheat-sheet/)

