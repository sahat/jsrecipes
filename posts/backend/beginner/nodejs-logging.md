You may be used to logging things to console using `console.log`. It generally
works fine, but there is a better way! Take a look at how **npm** does it:

![](images/backend/beginner/logging-1.png)

Using `npmlog` you could use the same nice logs in your app. Use `npm install`
to get the library and then add this to your module declarations:

```js
var log = require('npmlog');
```

Now you can use `log.info` instead of `console.log` and `log.error` instead of
`console.error`, to print out console messages.

```js
app.listen(app.get('port'), function() {
  log.info('Express', 'Listening on port %s', app.get('port'));
});
```

**Note**: You could also omit the first string parameter if you
prefer not to display the prefix.

![](images/backend/beginner/logging-2.png)

More generally here is the complete structure of `npmlog`:

```js
// additional stuff ---------------------------+
// message ----------+                         |
// prefix ----+      |                         |
// level -+   |      |                         |
//        v   v      v                         v
    log.info('fyi', 'I have a kitty cat: %j', myKittyCat)
```

And just for completeness, here is an example using `log.error` to log an
error message:

```js
mongoose.connect('localhost');
mongoose.connection.on('error', function(err) {
  log.error(err);
});
```

![](images/backend/beginner/logging-3.png)

To learn more about **npmlog**, visit the [GitHub Project](https://github.com/npm/npmlog).
