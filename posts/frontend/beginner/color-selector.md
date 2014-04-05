Download [bootstrap-colorselector](https://github.com/flaute/bootstrap-colorselector)
from GitHub and grab these two files:

- `bootstrap-colorselector.css`
- `bootstrap-colorselector.js`

#### 1. Include those files in your HTML like so:

```html
<link rel="stylesheet" href="bootstrap.min.css" />
<link rel="stylesheet" href="bootstrap-colorselector.css" />

<script src="jquery.min.js"></script>
<script src="bootstrap.min.js"></script>
<script src="bootstrap-colorselector.js"></script>
```

#### 2. Create a color selector:

```html
<select id="colorselector">
    <option value="106" data-color="#A0522D">sienna</option>
    <option value="47" data-color="#CD5C5C" selected="selected">indianred</option>
    <option value="87" data-color="#FF4500">orangered</option>
    <option value="15" data-color="#DC143C">crimson</option>
    <option value="24" data-color="#FF8C00">darkorange</option>
    <option value="78" data-color="#C71585">mediumvioletred</option>
</select>
```

#### 3. Initialize it:

```javascript
$(document).ready(function() {
 $('#colorselector').colorselector({
    callback: function (value, color, title) {
      $("#colorValue").val(value);
      $("#colorColor").val(color);
      $("#colorTitle").val(title);
    }
  });
});
```

#### Demo
<a class="jsbin-embed" href="http://jsbin.com/buwocuqe/3/embed?html,js,output">Color Selector</a>
<script src="http://static.jsbin.com/js/embed.js"></script>
