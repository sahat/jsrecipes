Perhaps something that's even more common than [sending e-mails](#/backend/sending-emails-with-nodemailer)
is OAuth authentication such as **Sign in with Facebook** or **Sign in with Google**.
Everything that is covered here will pretty much work the same
way with other services. You just have to swap out
`passport-facebook` [Passport](http://passportjs.org/) strategy for `passport-google` or
`passport-twitter`.

<div class="alert alert-success">
For a quick demo take a look at <a href="http://hackathonstarter.herokuapp.com/login">Hackathon Starter</a>.
It uses 6 Passport strategies simultaneously, including Username and Password.
</div>

First things first. Download and install [Passport](http://passportjs.org/) and
[Facebook](https://github.com/jaredhanson/passport-facebook) strategy.

```
npm install --save passport passport-facebook
```

Next, you need to add the Passport middleware with the rest of Express configuration.
It is important that you place these two lines after `express.session()`.
More often than not, order matters when it comes to Express middleware.

```
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));

// ...
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
// ...
```

And lastly, you need to add `serialize` and `deserialize` methods.
You can learn more about it on [Passport | Configure page](http://passportjs.org/guide/configure/) page,
but essentially it allows you to stay signed-in when navigating between different
routes within your application.

Add this code before or after your `FacebookStrategy`,
it doesn't really matter:

```
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

You have instantiated Passport and FacebookStrategy, created a FacebookStrategy,
configured Express middleware, added Passport serializer/deserializer. Now you just
need to add 2 routes: one route that redirects you to a Facebook sign-in page and
another route that is responsible for bringing you back to your website.

```
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));
```

**Note:** If you need to access user's e-mail address or location, pass an optional `scope` object like so:
```
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
```

If you run the app and go to `http://localhost:3000/auth/facebook` you will
get an error:

<div class="alert alert-danger">
Invalid App ID: FACEBOOK_APP_ID
</div>

Let's fix that by obtaining real **App Id** and **App Secret** keys.

- Visit [Facebook Developers](https://developers.facebook.com/)
- Click **Apps > Create a New App** in the navigation bar
- Enter *Display Name*, then choose a category, then click **Create app**
- Copy and paste *App ID* and *App Secret* keys into `FacebookStrategy`.
- Click on *Settings* on the sidebar, then click **+ Add Platform**
- Select **Website**
- Enter `http://localhost:3000` for *Site URL*

<h5 class="text-center">Create a new Facebook App</h5>

![](images/backend/intermediate/sign-in-with-facebook-1.png)

<h5 class="text-center">Facebook App Basic Settings</h5>

![](images/backend/intermediate/sign-in-with-facebook-2.png)

Once you replace `clientId` and `clientSecret` with the actual Facebook
**App ID** and **App Secret**, visit `http://localhost:3000/auth/facebook`
and you should see the following screen:

![](images/backend/intermediate/sign-in-with-facebook-3.png)

As of now Facebook sign-in is technically working - when you click **Okay** you'll see your
Facebook profile information printed out in the console.
What we need instead is to create a new user if it's the first sign-in, otherwise
retrieve the user if it's a returning user. In either case you have to have a
database model that you could query.

Let's make a User model using [Mongoose](http://mongoosejs.com/) and [MongoDB](http://mongodb.org).
If you are new to Mongoose, check out [Getting Started with Mongoose](#/backend/getting-started-with-mongoose)
in the Beginner section.

<div class="alert alert-info">
You don't have to use MongoDB. If you prefer SQL, there are Node.js ORM libraries like
<a href="http://sequelizejs.com">Sequelize</a> and <a href="http://bookshelfjs.org">Bookshelf.js</a>.
</div>

```
npm install mongoose
```

**app.js**
```
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  facebook: String,
  accessToken: String,
  email: String,
  firstName: String,
  lastName: String,
  profileUrl: String,
  gender: String,
  picture: String,
});

var User = mongoose.model('User', userSchema);

mongoose.connect('localhost');
```

**Note:** Make sure MongoDB is installed and running on your computer, otherwise
**app.js** will not be able to connect to MongoDB database. Alternatively, use
[MongoLab](http://mongolab.com) or [MongoHQ](http://mongohq.com) database services.

Replace `console.log(profile)` in the FacebookStrategy with the following code:

```
User.findOne({ facebook: profile.id }, function(err, existingUser) {
  if (existingUser) {
    return done(null, existingUser);
  }
  var user = new User({
    facebook: profile.id,
    accessToken: accessToken,
    email: profile._json.email,
    profileUrl: profile.profileUrl,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    gender: profile._json.gender,
    picture: 'https://graph.facebook.com/' + profile.id + '/picture?width=9999&height=9999'
  });
  user.save(function(err) {
    done(err, user);
  });
});
```

Try going to `http://localhost:3000/auth/facebook` and you should be immediately
redirected back to the home page, if you pressed **Okay** button during Facebook
sign-in earlier. There is no indication if sign-in was successful or whether
user was created, but if you look in the database, you will see the newly
created user.

**Note:** After a successful sign in with Facebook, a user will be
redirected back to home page with appended hash `#_=_` in the URL.
It is not a bug. See this [Stack Overflow](https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url)
discussion for ways to handle it.

![](images/backend/intermediate/sign-in-with-facebook-4.png)

A new user is created only once. That's why you first check if a Facebook
user already exists in the database:

```
if (existingUser) {
  return done(null, existingUser);
}
```

Let's make things a little more usable. Add the following routes. We will
create those templates shortly.

```
app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

app.get('/me', function(req, res) {
  res.render('me', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  // Helper function provided by Passport.js
  // Learn more: http://passportjs.org/guide/logout/
  req.logout();
  res.redirect('/');
});
```

Copy and paste the following code into **layout.jade**. It contains Bootstrap 3,
Lato font and Navbar.

```
doctype html
html
  head
    title Sign in with Facebook
    link(rel='stylesheet', href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css')
    link(rel='stylesheet', href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700')
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    nav.navbar.navbar-default.navbar-fixed-top(role='navigation')
      div.container-fluid
        div.navbar-header
          button.navbar-toggle(type='button', data-toggle='collapse', data-target='#bs-example-navbar-collapse-9')
            span.sr-only Toggle navigation
            span.icon-bar
            span.icon-bar
            span.icon-bar
          a.navbar-brand(href='/')
            strong FB
            | Demo
        div.collapse.navbar-collapse
          ul.nav.navbar-nav
            li
              a(href='/') Home
            if user
              li
                a(href='/me') Me
              li
                a(href='/logout') Logout
            else
              li
                a(href='/login') Login

    block content
```




This is how your **index.jade** should look:
```
extends layout

block content
  .container
    .panel
      .panel-heading Sign in with Facebook Demo
      .panel-body
        | Index Page
```

Replace stylesheets/**styles.css** with the following styles:
```
body {
  font-family: "Lato", sans-serif;
  color: #666666;
  background-color: #e8e8e8;
  padding-top: 70px;
  padding-bottom: 20px;
}

a {
  color: #007aff;
}

a:hover {
  color: #666666;
}

.navbar-default {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  border: 0;
}

.navbar-default .navbar-nav > li > a {
  color: #999999;
}

.navbar-default .navbar-brand {
  color: #5e5e5e;
}

.navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {
  color: #007aff;
}

.navbar-default .navbar-nav > li > a:hover,
.navbar-default .navbar-nav > li > a:focus {
  color: #007aff;
  background-color: rgba(0, 0, 0, 0.015);
}

dl dd {
  margin-bottom: 15px;
}

.panel {
  border-radius: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.panel-heading {
  color: #007aff;
}

.btn-facebook {
  color: #fff;
  background-color: #3b5998;
  border-color: rgba(0,0,0,0.2);
}

.btn-facebook:hover {
  color: #fff;
  background-color: #30487b;
}

/* Non-responsive Bootstrap */

.container .navbar-header,
.container .navbar-collapse {
  margin-right: 0;
  margin-left: 0;
}

.navbar-header {
  float: left;
}

.navbar-collapse {
  display: block !important;
  height: auto !important;
  padding-bottom: 0;
  overflow: visible !important;
}

.navbar-toggle {
  display: none;
}

.navbar-collapse {
  border-top: 0;
}

.navbar-nav {
  float: left;
  margin: 0;
}

.navbar-nav > li {
  float: left;
}

.navbar-nav > li > a {
  padding: 15px;
}

.navbar-nav.navbar-right {
  float: right;
}

.navbar .navbar-nav .open .dropdown-menu {
  position: absolute;
  float: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-width: 0 1px 1px;
  border-radius: 0 0 4px 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}
```

Create two new Jade templates in the *views* directory:
**login.jade** and **me.jade**:

**login.jade**
```
extends layout

block content
  .container.text-center
    a.btn.btn-facebook(href='/auth/facebook') Sign in with Facebook
```

**me.jade**
```
extends layout

block content
  .container
    .panel
      .panel-heading Facebook Profile
      .panel-body
        dl
          dt Facebook ID
          dd= user.facebook
          dt Profile URL
          dd= user.profileUrl
          dt Full Name
          dd #{user.firstName} #{user.lastName}
          dt Gender
          dd= user.gender
```

Phew, that's a lot of code. Here is the final result, that was hopefully
worth all the effort!


<h5 class="text-center">Home Page</h5>

![](images/backend/intermediate/sign-in-with-facebook-5.png)

<h5 class="text-center">Login Page</h5>

![](images/backend/intermediate/sign-in-with-facebook-6.png)

<h5 class="text-center">Profile Page</h5>

![](images/backend/intermediate/sign-in-with-facebook-7.png)

We started out with nothing and now we have a fully functioning web
application backed by MongoDB with Facebook Sign-in. There is one thing we
can improve upon. Notice if you go to `http://localhost:3000/me` without
first signing-in, you will get an error message. Let's protect that route
by forwarding unauthenticated users to `/login` URL.

Add the following middleware function somewhere in your **app.js**:

```
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}
```

**Note:** I took it straight out of passport-facebook [example](https://github.com/jaredhanson/passport-facebook/blob/master/examples/login/app.js).

And finally, modify the `/me` route by adding *ensureAuthenticated* middleware:

```
app.get('/me', ensureAuthenticated, function(req, res) {
  res.render('me', {
    user: req.user
  });
});
```

Now if you visit `http://localhost:3000/me` without signing-in, you will
be redirected to the login page.

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

Since I have already included most of the source code above, I will only
include *app.js* file below.

**app.js**
```

/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var userSchema = new mongoose.Schema({
  facebook: String,
  accessToken: String,
  email: String,
  firstName: String,
  lastName: String,
  profileUrl: String,
  gender: String,
  picture: String,
});

var User = mongoose.model('User', userSchema);

passport.use(new FacebookStrategy({
    clientID: '694945890549183',
    clientSecret: '6fbf2eade4e7d72f72ff12a30e2c72cd',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      var user = new User({
        facebook: profile.id,
        accessToken: accessToken,
        email: profile._json.email,
        profileUrl: profile.profileUrl,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        gender: profile._json.gender,
        picture: 'https://graph.facebook.com/' + profile.id + '/picture?width=9999&height=9999'
      });
      user.save(function(err) {
        done(err, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect('localhost');

var app = express();

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
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

app.get('/me', ensureAuthenticated, function(req, res) {
  res.render('me', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Passport.js Guide](http://passportjs.org/guide/)
2. [User Authentication with Passport.js](http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/)
3. [Social Authentication with Passport.js](http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/)
4. [Google authentication strategy](https://github.com/jaredhanson/passport-google-oauth)
5. [Twitter authentication strategy](https://github.com/jaredhanson/passport-twitter)