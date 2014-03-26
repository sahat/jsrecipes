Why should you worry about preventing cross-site request forgery attacks? For toy
or hackathon apps it probably doesn't matter as much, but if you are running a
production website there is no reason not to have CSRF protection.

Consider thie following scenario: a banking web app hasn't been properly
protected against CSRF attacks, so then a malicious hacker could convince
the user to visit another website while logged
in to their banking website. This website could then run a POST request
to transfer money from the victim's account to the attacker's account
without the victim's consent or knowledge.

In layman terms, with CSRF protection you will have a hidden `<input>` field
on every POST form. That hidden input field has some random hash value, without
which the form will not submit, i.e. if the CSRF token is missing, you will
be greeted with a **403 Forbidden** page when submitting a form.

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
for storing `res.locals.user = req.user;` reference, so that I don't have
to pass `user: req.user` to every template.

The last thing left to do is to add a hidden input element to your form:

```
input(type='hidden', name='_csrf', value=_csrf)
```

For completeness here is an example of a Login form:

```
form(method='POST')
  input(type='hidden', name='_csrf', value=_csrf)
  .form-group
    label.control-label(for='email') Email
    input.form-control(type='text', name='email', id='email', placeholder='Email', autofocus=true)
  .form-group
    label.control-label(for='password') Password
    input.form-control(type='password', name='password', id='password', placeholder='Password')
  .form-group
    button.btn.btn-primary(type='submit')
      i.fa.fa-unlock-alt
      | Login
    a.btn.btn-link(href='/forgot') Forgot your password?
```