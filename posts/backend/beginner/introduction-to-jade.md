I have already included [HTML2Jade](http://html2jade.org/) online converter at
the end, but to highlight its important I will mention it here again. It doesn't
matter how awesome are your Jade skills, but sometimes you will want to quickly copy
and paste a Bootstrap snippet without having to manually translate it from HTML
to Jade.

### Basics

Jade is whitespace sensitive, like Python, Ruby and CoffeeScript. I typically
indent Jade files with 2 spaces, but you may choose 4 spaces if that's your
preference.

**Jade**
```
button.btn.btn-success(type='submit')
  i.fa.fa-check
  | Signup
```

**HTML**
```
<button type="submit" class="btn btn-success">
  <i class="fa fa-check"></i>
  Signup
</button>
```

Typically you will send some data from the server to your templates. For example
in Express, this is how you would render your Jade template:

```
res.render('index', {
  name: 'World'
});
```

Then in `index.jade`, you can access the *name* variable via `#{name}`.

```
doctype 5
html
  head
    title my jade template
  body
    h1 Hello #{name}
```

And the final HTML output would be:

```
<!DOCTYPE html>
<html>
  <head>
    <title>my jade template</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

There is another way to output server variables. If you don't have any text
on your tag, just a variable by itself, then you could simply add `=` in front
of a tag:

**Jade**
```
h1= name
```

**HTML**
```
<h1>World</h1>
```

Sometimes you may need to put plain text inside a tag. There are three ways
to do it:

**Jade**
```
h1 Welcome to Jade Tutorial
p
  | Text can be included in a number of
  | different ways.
p.
  This way is shortest if you need big
  blocks of text spanning multiple
  lines.
```

**HTML**
```
<h1>Welcome to Jade</h1>
<p>
  Text can be included in a number of
  different ways.
</p>
<p>
  This way is shortest if you need big
  blocks of text spanning multiple
  lines.
</p>
```

### IDs and Classes

IDs start with a `#` and classes start with a `.`

**Jade**
```
h1#title Welcome to Jade Tutorial
button.btn My Button
```

**HTML**
```
<h1 id="title">Welcome to Jade Tutorial</h1>
<button class="btn">My Button</button>
```

You can also add multiple *classes* on the same tag or mix *id* with *classes*:

**Jade**
```
i.fa.fa-check
button#login-button.btn.btn-primary Login
```

**HTML**
```
<i class="fa fa-check"></i>
<button id="login-button" class="btn btn-primary">Login</button>
```

When you want to set a dynamic *id* or *class*, you should use attributes
instead:

```
a(id='signup', class='btn btn-default') Signup
```

Here is a more practical example of how you can dynamically set `.active` class
on a Bootstrap Navbar. For example, when you navigate to About page, the "About"
link in your Navbar will be highlighted with `.active` class.
```
ul.nav.navbar-nav
  li(class=title=='Home'?'active':undefined)
    a(href='/') Home
  li(class=title=='About'?'active':undefined)
    a(href='/about') About
  li(class=title=='Contact'?'active':undefined)
    a(href='/contact') Contact
```

To make this work, you would need to pass `title` on each template, e.g.:

```
res.render('home', {
  title: 'Home'
});

res.render('about', {
  title: 'About'
});

res.render('contact', {
  title: 'Contact'
});
```

### Nesting

Each element must be on its own indentation level.

**Jade**
```
ul#books
  li
    a(href="#book-a") Book A
  li
    a(href="#book-b") Book B
```

or alternatively you may use the short-hand notation:

```
ul#books
  li: a(href="#book-a") Book A
  li: a(href="#book-b") Book B
```

**HTML**
```
<ul id="books">
  <li><a href="#book-a">Book A</a></li>
  <li><a href="#book-b">Book B</a></li>
</ul>
```

### Loops and Conditionals

Often times you will need to use if-statements and for-loops inside templates.
For example if user is authenticated, *Logout* link should be displayed, otherwise
*Login* and *Signup* links should be displayed.

```
ul.nav.navbar-nav.navbar-right
  if user
    li: a(href='/logout') Logout
  else
    li: a(href='/login') Login
    li: a(href='/signup') Create Account
```

Using loops is pretty simple. The first name in a for-loop can be named whatever
you want. I usually name it the same as the name of collection in a singular form,
e.g. `book in books`, `person in people`, `link in links`, etc. The second
variable in a for-loop is the name of the collection that you pass from the
server. Using `else` after a for-loop is *optional*.

**Node.js**
```
res.render('books', {
  books: ['Divergent', 'Insurgent', 'Allegiant']
});
```

**Jade**
```
ul
  for book in books
    li= book
  else
    li No books!
```

**HTML**
```
<ul>
  <li>Divergent</li>
  <li>Insurgent</li>
  <li>Allegiant</li>
</ul>
```

### Attributes

To add attributes, add them inside parenthesis of a tag, separated by a comma:

**Jade**
```
input(checked=true, disabled=false)
input(type=type, value='Hello #{name}')
input.form-control(type='text', name='name', id='name', autofocus=true)
```

**HTML**:
```
<input checked>
<input type="text" value="Hello World">
<input type="text" class="form-control" name="name" id="name" autofocus>
```

### Comments

There are two types of comments in Jade: the ones that are visible in HTML (`//`) and
the ones that are not visible (`//-`).

**Jade**
```
// single line comment
//- invisible single line comment
```

**HTML**
```
<!-- single line comment-->
```

Typically you would probably use invisible comments for internal use, but
sometimes you have to use visible comments, as in the following example:

**Jade**
```
// if lt IE 8
  script(src='ie.js')
```

**HTML**
```
<!--[if lt IE 8]>
  <script src="ie.js"></script>
<![endif]-->
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [HTML to Jade / Jade to HTML Converter](http://html2jade.org/)
2. [Jade Syntax Documentation by Example](http://naltatis.github.io/jade-syntax-docs)
3. [Official Jade Reference](http://jade-lang.com/reference/)
