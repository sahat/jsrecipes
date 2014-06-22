One of the most fundamental rules that I learned in my *Introduction to
Programming* class is "Never trust the client". In current context it means
you should never accept user data without first checking if it's valid. It is
safe to assume that hackers are out there to get you, to break your app, for fun
and/or profit.

Consider the following form:

```
form.form-horizontal(method='POST')
  legend Contact Form
  .form-group
    label(class='col-sm-2 control-label', for='name') Name
    .col-sm-8
      input.form-control(type='text', name='name', id='name', autofocus=true)
  .form-group
    label(class='col-sm-2 control-label', for='email') Email
    .col-sm-8
      input.form-control(type='text', name='email', id='email')
  .form-group
    label(class='col-sm-2 control-label', for='message') Body
    .col-sm-8
      textarea.form-control(type='text', name='message', rows='7')
  .form-group
    .col-sm-offset-2.col-sm-8
      button.btn.btn-primary(type='submit') Send
```

**Note:** If you omit `action` attribute from the form tag, POST
request will default to current URL. So if you have `app.get('/contact')` that
displays a form and `app.post('/contact')` that process a form, you don't
have to specify `form(action='/contact')`, since
it is already implied. That's just a general tip, not specific to Express at all.

![](images/backend/intermediate/form-validation-1.png)

Before proceeding any further, to send an actual e-mail you will need to
install and configure [nodemailer](https://github.com/andris9/Nodemailer‎):

```
npm install --save nodemailer
```

```
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'SendGrid',
  auth: {
   user: 'YOUR_SENDGRID_USERNAME',
   pass: 'YOUR_SENDGRID_PASSWORD'
  }
});
```

Ok, back to form validation. When a user hits *Send*, the following POST
route processes that request:

```
app.post('/', function(req, res) {
  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form Example';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    res.redirect('/');
  });
});
```

What do you think will happen if you try to submit the form without filling
all the information? You should
always check if the incoming data is valid. Perhaps you believe that `Name`
should be optional, but at the very least `Email` should be valid, and
`Body` should not be empty.

In order to do form validation without losing your sanity I highly recommend
[express-validator](https://github.com/ctavan/express-validator‎). It is built on top of
[validator.js](validatorjs.org/) (previously known as node-validator).
It makes validating forms super simple.

First, you have to add express-validator middleware:

```
var expressValidator = require('express-validator');

app.use(express.json());
app.use(express.urlencoded());
// ... placed after json and urlencoded
app.use(expressValidator());
// ... other middleware below
```

Here is how our updated POST handler would look with form validation:

```
app.post('/', function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    return res.redirect('/');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form Example';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    res.redirect('/');
  });
});
```

**Note:** Typically you wouldn't `console.log` errors, but instead display a notification
to the user with a list of errors, but that's a discussion for another tutorial.

First, you define validation rules, where each `assert` in this case takes two parameters -
name of an input field and message that should be displayed if
validation fails. Secondly, you call the validation method. The ones listed above
are just few of many. You can check if input is a number, has all uppercase
letters, is an IP address, is a credit card, is divisible by some number, matches
a certain regular expression pattern and more!

By the way, here is what `errors` object looks like when validation fails:

```
[
  { param: "name", msg: "Name cannot be blank", value: "<received input>" },
  { param: "email", msg: "Email is not valid", value: "<received input>" },
  { param: "message", msg: "Message cannot be blank", value: "<received input>" }
]
```

Using those error messages it is pretty easy to implement these flash
messages that are displayed only once - when validation error occurs, they go away
after you refresh the page.

![](images/backend/intermediate/form-validation-2.png)

If you are interested in doing that, please take a look at the
[Hackathon Starter](https://github.com/sahat/hackathon-starter) README, there is
a section named
[How do flash messages work in this project?](https://github.com/sahat/hackathon-starter/#bulb-how-do-flash-messages-work-in-this-project).
Eventually I will move that information over to this website.


### <i class="fa fa-question text-danger"></i> FAQ
**Q. I am getting 500 TypeError: Object #<IncomingMessage> has no method 'assert'**

A. Make sure you have added the `app.use(expressValidator())` middleware.

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

#### package.json
```
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.5.1",
    "jade": "*",
    "express-validator": "^2.1.1",
    "nodemailer": "^0.6.1"
  }
}
```

#### app.js
```
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'SendGrid',
  auth: {
    user: 'YOUR_SENDGRID_USERNAME',
    pass: 'YOUR_SENDGRID_PASSWORD'
  }
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.cookieParser());
app.use(express.session({ secret: 'session secret' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    return res.redirect('/');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form Example';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    res.redirect('/');
  });
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

#### layout.jade
```
doctype html
html
  head
    title Form Validation
    link(rel='stylesheet', href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css')
    style.
      body { padding-top: 40px; }
    body
      block content
```

#### index.jade
```
extends layout

block content
  .container
    form.form-horizontal(role='form', method='POST')
      legend Contact Form
      .form-group
        label(class='col-sm-2 control-label', for='name') Name
        .col-sm-8
          input.form-control(type='text', name='name', id='name', autofocus=true)
      .form-group
        label(class='col-sm-2 control-label', for='email') Email
        .col-sm-8
          input.form-control(type='text', name='email', id='email')
      .form-group
        label(class='col-sm-2 control-label', for='message') Body
        .col-sm-8
          textarea.form-control(type='text', name='message', rows='7')
      .form-group
        .col-sm-offset-2.col-sm-8
          button.btn.btn-primary(type='submit') Send
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Express Validator GitHub Project](https://github.com/ctavan/express-validator)

