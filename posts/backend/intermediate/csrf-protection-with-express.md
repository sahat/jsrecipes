Why should you worry about preventing cross-site request forgery attacks? For toy
or hackathon apps it probably doesn't matter as much, but if you are running a
production website there is no reason not to have CSRF protection.

Consider the following scenario: a banking web app hasn't been properly
protected against CSRF attacks, so then a malicious hacker could convince
the user to visit another website while logged
in to their banking website. This website could then run a POST request
to transfer money from the victim's account to the attacker's account
without the victim's consent or knowledge.

In layman terms, with CSRF protection you will have a hidden `<input>` field
on every POST form. That hidden input field has some random hash value, without
which the form will not submit, i.e. if the CSRF token is missing, you will
be greeted with a **403 Forbidden** page when submitting a form.

![](images/backend/intermediate/csrf-protection-with-express-1.png)

And here is what happens when you forget to include the hidden input field with
CSRF value:

![](images/backend/intermediate/csrf-protection-with-express-2.png)

Luckily for us Express already comes with CSRF middleware. The CSRF middleware
depends on `bodyParser` and `session` middleware, so you have to place it below
those two middleware.

```
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'your secret'}));
app.use(express.csrf());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
```

**Note:** The `bodyParser` middleware has been deprecated in favor of `express.json` and
`express.urlencoded`.

Below `express.csrf()`, add the following middleware:

```
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});
```

**Note:** When implementing authentication, I usually use the middleware above
for storing `res.locals.user = req.user` reference, so that I don't have
to pass `user: req.user` to every template.

The last thing left to do is to add a hidden input element to your form:

```
input(type='hidden', name='_csrf', value=_csrf)
```

Here is an example of a Login form with the CSRF input tag:

```jade
h2 Login Form

form(method='POST')
  input(type='hidden', name='_csrf', value=_csrf)

  .form-group
    label.control-label(for='email') Email
    input.form-control(type='text', name='email', id='email', placeholder='Email', autofocus=true)

  .form-group
    label.control-label(for='password') Password
    input.form-control(type='password', name='password', id='password', placeholder='Password')

  .form-group
    button.btn.btn-primary(type='submit') Login
```

![](images/backend/intermediate/csrf-protection-with-express-3.png)

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

#### package.json
```javascript
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.5.1",
    "jade": "*"
  }
}
```

#### app.js
```javascript
var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: 'session secret' }));
app.use(express.csrf());
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/login', function(req, res) {
  res.send('Login Successful')
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

#### views/layout.jade

```jade
doctype html
html
  head
    title CSRF Demo
    link(rel='stylesheet', href='//cdn.jsdelivr.net/foundation/5.2.1/css/foundation.min.css')
    link(rel='stylesheet', href='//cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css')
    style.
      body { padding-top: 40px; }
    body
      block content
```

#### views/index.jade
```jade
extends layout

block content
  .row
    .small-8.small-centered.columns
      h3 Login Form
      form(action='/login', method='POST')
        input(type='hidden', name='_csrf', value=_csrf)
        label Email
        input(type='text', placeholder='Email', autofocus=true)
        label Password
        input(type='text', placeholder='Password')
        button.success.button(type='submit')
          i.fi-laptop
          |  Login

      .panel.callout.radius
        strong CSRF Token
        p= _csrf
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [DailyJS: Express 3 Tutorial: Contact Forms with CSRF](http://dailyjs.com/2012/09/13/express-3-csrf-tutorial/)
