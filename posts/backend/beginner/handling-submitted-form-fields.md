Suppose you have the following form and you would like to send user input back
to the server and store it somewhere.

```
form(action='/signup', method='POST')
  .row
    .col-xs-6.form-group
      label First Name
      input.form-control(type='text', name='firstname')
    .col-xs-6.form-group
      label Last Name
      input.form-control(type='text', name='lastname')
  .form-group
    label Email Address
    input.form-control(type='email', name='email')
  .form-group
    label Username
    input.form-control(type='text', name='username')
  .form-group
    label Password
    input.form-control(type='password', name='password')
  .form-group
    input.btn.btn-primary(type='submit', value='Signup')
```

I am using [Jade](http://jade-lang.com/) template engine  and
[Bootstrap 3](http://getbootstrap.com) for this example. Here is the screenshot
of how it looks:

![](images/backend/beginner/handling-submitted-form-fields-1.png)

Since this form has a method `POST` and an action `/signup`, you must  define
a route to handle form submission. Notice how each *input* field has a **name**
attribute. It is the same name you use in order to access it from your `app.post` route.

```
app.post('/signup', function(req, res) {
  var user = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    req.login(user, function(err) {
      res.redirect('/');
    });
  });
});
```

In the case of radio buttons, keep the same **name** attribute on logically grouped
radio buttons, but different **value** attributes to differentiate them from
each other.

```
label.radio-inline
  input(type='radio', name='gender', value='male')
  | Male
label.radio-inline
  input(type='radio', name='gender', value='female')
  | Female
```

This would print *male* or *female* depending on the radio button choice.

```
app.post('/signup', function(req, res, next) {
  console.log(req.body.gender);
});
```

On a related note, this is also how you could also do input validation inside your
route, before you try to create a new user:

```
if (!req.body.username) {
  return res.send(400, 'Username cannot be blank.');
}

if (!req.body.email) {
  return res.send(400, 'Email cannot be blank.');
}

if (!req.body.password) {
  return res.send(400, 'Password cannot be blank.');
}
```

**Note**: A better way would be to use [validator.js](http://validatorjs.org/) or
[express-validator](https://github.com/ctavan/express-validator) libraries, then redirect
to the same page and display flash messages. Try submitting a blank
form on [Hackathon Starter](http://hackathonstarter.herokuapp.com/signup) to see
what I mean. But that is a discussion for another article.

To recap, you create a form with `method='POST'` and `action='/url'` with whatever URL that you
are *POST*'ing that form to. Make sure each input field has a unique **name** attribute.
Then to access that input value from your `app.post` route your would use
`req.body.INPUT_NAME_ATTRIBUTE`.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Express API Reference on req.body](http://expressjs.com/3x/api.html#req.body)