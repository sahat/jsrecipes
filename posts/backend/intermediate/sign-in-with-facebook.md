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
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
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

If you run the app now and go to `http://localhost:3000/auth/facebook` you will
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

![](images/backend/intermediate/sign-in-with-facebook-1.png)
![](images/backend/intermediate/sign-in-with-facebook-2.png)