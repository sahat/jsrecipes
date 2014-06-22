<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You will find Async.js extremely useful when working with asynchronous
  functions. It has powerful control flow patterns to keep your asynchronous
  code in check.
</div>

### Problem
*Over-simplified view of a real-world problem*. Actual code with 5 levels of nested
callbacks would be much longer and wider.

```javascript
async1(function(input, result1) {
  async2(function(result2) {
    async3(function(result3) {
      async4(function(result4) {
        async5(function(output) {
          // do something with output
        });
      });
    });
  });
});
```

### Solution
[Async](https://github.com/caolan/async) is a utility module that provides
powerful and useful functions for working with asynchronous code, ranging
from `map`, `reduce`, `filter` to `timesSeries`, `queue`, 'memoize' and `iterator`.
I encourage you to take a look at all available functions *just to see what is
possible*. Back when I needed to run multiple callbacks in parallel and render
a page after all callbacks have finished, I had no idea how to do it. As it turns out
it is very easy to do with `async.parallel()`. You don't have to remember every
single Async function, just be aware of what is possible.

I only ever used three Async functions: `series`, `parallel`, `waterfall`. These 3
functions have served me really well in multiple of my projects.


#### <i class="fa fa-ellipsis-h text-danger"></i> Series

*Each asynchronous function runs one at a time.*

You pass it an array of functions to run, each one runs once the previous
function has completed. If any functions in the series pass an error to its
`callback`, no more functions are run, and callback is immediately called with
the value of the error. Otherwise, `callback` receives an array of results
when tasks have completed.

**Note:** The `callback` variable in this case can be named whatever you want, but
I usually name it `done`, as it is more informative.

```js
async.series([
  function(callback){
    // do some stuff ...
    callback(null, 'first');
  },
  function(callback){
    // do some more stuff ...
    callback(null, 'second');
  }
],
// optional callback
function(err, results){
  // results is now equal to ['first', 'second']
});
```

You can also use an object instead of an array. Each property will
be run as a function, and the results will be passed to the final `callback`
as an object instead of an array.

```js
async.series({
  one: function(callback){
    callback(null, 1);
  },
  two: function(callback){
    callback(null, 2);
  }
},
// optional callback
function(err, results) {
  // results is now equal to: {one: 1, two: 2}
});
```

**Note:** Last function callback is optional, meaning sometimes you can end on last `task`
function. It depends entirely on what you are trying to do. In the example above,
if task `one` performs some action and doesn't pass any value to `callback()`,
then you could stop at task `two`, i.e. render a page, return `200` or redirect
to another page. Either approach is fine, it's just optional callback is
sometimes redundant.

This example was taken straight from the docs. Let's take a look at a more
practical scenario:

> User tries to upload a file. The system checks first if that user has enough
free space. Then it creates a new database document with file metadata and
establishes a relationship between that file and the user. After that, it uploads
the actual file to Amazon S3 for storage. When that is done, it cleans up
temporary uploaded files from the server.

That is 4 distinct steps. You cannot cleanup the file until you have transfered a
file to S3. And you cannot do step 2 or step 3 until you check if that user
has free space to begin with. Anyway, those were my application specifications
for my school project. I used that example simply to demonstrate one of many
possible scenarios that you might deal with. Here is a stripped down version
of my actual code:

```javascript
async.series({
  checkFreeSpace: function(done) {
    // Check if current user has enough free space
    done(null);
  },

  saveToDatabase: function(done) {
    // Save file metadata
    done(null);
  },

  uploadToS3: function(done) {
    // use aws-sdk module to upload a file to S3
    done(null);
  },

  cleanup: function(done) {
    // remove temporary file
    done(null);
  }
}, function(err, results) {
  res.send(200);
});
```

Without *async*, if you try to nest all those callbacks, your code will be
insanely deep, and consequently - hard to read.
I haven't shown you in the code above, but in `saveToDatabase` step I have `async.parallel` that
calls `async.waterfall`. That's `waterfall` inside `parallel` inside `series`!

Another point I am trying to make is that now you will have to think -
"Can I execute this code in parallel or should I do it in series / waterfall?".
If the asynchronous task you are trying to achieve can be parallelized, there
is no reason to run in series.

#### <i class="fa fa-sort-amount-asc text-danger"></i> Waterfall

*Each asynchronous function runs one at a time, passing its results to the next
function.*

The `waterfall` control flow is very similar to `series`. The only difference
here is each function can pass its results to the next function in the array.

```javascript
async.waterfall([
  function(callback){
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback){
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
  },
  function(arg1, callback){
    // arg1 now equals 'three'
    callback(null, 'done');
  }
], function (err, result) {
 // result now equals 'done'
});
```

Here is a real-world code example from [Hackathon Starter](https://github.com/sahat/hackathon-starter/blob/master/controllers/user.js#L332)
project that handles **forgot your password** implementation:

```javascript
async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
        if (!user) {
          req.flash('errors', { msg: 'No account with that email address exists.' });
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: secrets.sendgrid.user,
          pass: secrets.sendgrid.password
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Reset your password on Hackathon Starter',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
        done(err);
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};
```

Notice how I am passing cryptographic token from the **first** function to the second,
where it is used to update a database field for that user. The **second** function
passes on the token and a user object to the **third** function. The order I pass it
in, is the order it will be accessible in the next function (`err` doesn't count).




Another very common control flow is `parallel`. Imagine you need to run multiple asynchronous tasks, and then render a page, but only after all tasks have been completed. For example, you might want to scrape 5 various websites for some data. There is no guaranteed order in which they will return, so when should you render a page with results? That's where `parallel` control flow comes in. Unlike `series` and `waterfall`, it does not wait until the previous function has completed. Once all functions are completed, the results are passed to the final callback as an array.

#### <i class="fa fa-code-fork text-danger"></i> Parallel

*Run all asynchronous functions at the same time.*

The very first time I ran into this problem was at the [Hearst Fashion Hack 2013](http://www.hearstfashionhack.com/)
where I needed to scrape multiple online stores for data, then render a page afterward.

Here is another real-world example of how `parallel` control flow can be useful:

```javascript
var lastfm = new LastFmNode(secrets.lastfm);
  async.parallel({
    artistInfo: function(done) {
      lastfm.request('artist.getInfo', {
        artist: 'Epica',
        handlers: {
          success: function(data) {
            done(null, data);
          },
          error: function(err) {
            done(err);
          }
        }
      });
    },
    artistTopAlbums: function(done) {
      lastfm.request('artist.getTopAlbums', {
        artist: 'Epica',
        handlers: {
          success: function(data) {
            var albums = [];
            _.each(data.topalbums.album, function(album) {
              albums.push(album.image.slice(-1)[0]['#text']);
            });
            done(null, albums.slice(0, 4));
          },
          error: function(err) {
            done(err);
          }
        }
      });
    }
  },
  function(err, results) {
    if (err) return next(err.message);
    var artist = {
      name: results.artistInfo.artist.name,
      image: results.artistInfo.artist.image.slice(-1)[0]['#text'],
      tags: results.artistInfo.artist.tags.tag,
      bio: results.artistInfo.artist.bio.summary,
      stats: results.artistInfo.artist.stats,
      similar: results.artistInfo.artist.similar.artist,
      topAlbums: results.artistTopAlbums
    };
    res.render('api/lastfm', {
      title: 'Last.fm API',
      artist: artist
    });
  });
```

Fetching artist information and artist's top albums from Last.fm can be
parallelized, since there is absolutely no reason to wait for one to finish
before querying for another request. One obvious advantage of `parallel` is speed
of course. Running *N* tasks at the same time is faster than running *N* times one
after another in `series`. One obvious disadvantage is you can't always use `parallel`
control flow.

In the `waterfall` example above, you had no choice but to pass data from one
function to another. In the `series` example, you cannot run everything in
`parallel` because you cannot delete a  file before it is uploaded to Amazon S3,
and you cannot do that either until you first check if user has enough free space.
You can think of *Async* control flows as different tools for the job.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Control Flow in Node.js](http://book.mixu.net/node/ch7.html)
2. [Async GitHub Project](https://github.com/caolan/async)
3. [Node.js Async Tutorial](http://justinklemm.com/node-js-async-tutorial/)
