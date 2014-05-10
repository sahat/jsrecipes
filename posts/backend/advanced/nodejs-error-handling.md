<img src="http://nodeblog.files.wordpress.com/2011/07/nodejs.png" height=92">

Error handling is a highly debatable topic in Node.js community because there
is no single true way to do it. Working with Node.js for over 2 years I can
say that error handling is one of the most annoying problems to deal with when
building Node.js web apps. If you are not careful, a single unhandled error
can bring down your entire application, leaving it in the crashed state.

What's even worse, sometimes it's not easy to find the source of unhandled
exceptions due to cryptic and unhelpful stack traces. In other words, you
could ocassionaly see your app crash, but have no idea what causes it. It could
be a bug in your code or a certain bug that only occurs on a specific
Node.js version on a particular operating system.

There are primarily three schools of thoughts on error handling:

- Let the application crash and restart it.
- Handle all possible errors and never crash.
- Balanced approach between the two.

#### <span class="text-danger">Approach 1:</span> Handle errors in routes.
You are probably aware that most Node.js modules, as a general rule, have an
error object as the first argument in a callback. Unless you properly
handle that error, your app will likely crash sooner or later.

Look at this code below. It simply means if an error is raised for whatever
reason, the `if (err)` line will intercept it and do something with it, in this case
`throw` it. In other words your application will still crash.

```javascript
app.get('/', function(req, res) {
  Item.find(function(err, items) {
    if (err) throw err;
    console.log(items);
  });
});
```

The difficult part of handling errors is you have to decide what
do you want to do when an error occurs? What do you think should happen if we
can't retrieve our items from database? There is no correct answer, it will
ultimately depend on your application. Personally, I don't believe that we
should crash and restart the server for errors like these.

A better approach would be to display a flash notifications with
"Items could not be retrieved from database. Please try again" or if you
don't want to do flash notificans you could simply display a blank page with
that same text:

```javascript
app.get('/', function(req, res) {
  Item.find(function(err, items) {
    if (err) {
      return res.send('Items could not be retrieved from database. Please try again.');
    }
    console.log(items);
  });
});
```

![](images/backend/advanced/nodejs-error-handling-1.png)

To me that's a better approach than crashing the server and letting it restart
itself via [supervisor](https://github.com/isaacs/node-supervisor) or
[forever](https://github.com/nodejitsu/forever) modules. The reason why I
called this "in-place" error handling is because you are taking care of errors
inside `if (err)` block for each asynchronous operation that returns an error object
as the first argument. In [Hackathon Starter](https://github.com/sahat/hackathon-starter)
`api.js` controller alone, there are over 79 occurences of error objects.
Handling each `err` individually would result in tremendous amount of code
duplication.

The next best thing you can do is to delegate all error handling logic to an
Express middleware.


#### <span class="text-danger">Approach 2:</span> Handle errors in middleware.

```javascript
app.get('/', function(req, res, next) {
  Item.find(function(err, items) {
    if (err) return next(err);
    console.log(items);
  });
});
```

**Note:** It is important to **return** inside `if (err) { ... }` otherwise your
code will just continue executing and eventually crash.

Two things to note here:

1. An extra route parameter `next`.
2. When error occurs, call `return next()` and pass it an error object.

Then add this middleware after all other Express middlewares:

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.send(500, { message: err.message });
});
```

This middleware will print out error stack to console and render a JSON page
with the error message. This is just an example code. If you are using some
third-party logging tools, this is where you could trigger error events. It's
totally up to you in deciding what to do with those errors. Or perhaps this
is where you would display a generic custom error page with the error message.

#### Bonus: Error Handling in Node.js by Jamund Ferguson

<iframe width="560" height="315" src="//www.youtube.com/embed/p-2fzgfk9AA" frameborder="0" allowfullscreen></iframe>

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Node.js Error Handling Patterns](http://www.nodewiz.biz/nodejs-error-handling-pattern)
2. [Best Practices for Error Handling in Node.js](http://www.joyent.com/blog/best-practices-for-error-handling-in-node-js)
3. [Error handling in node.js](http://machadogj.com/2013/4/error-handling-in-nodejs.html)
4. [Node.js Best Practice Exception Handling](https://gist.github.com/balupton/5560110)
