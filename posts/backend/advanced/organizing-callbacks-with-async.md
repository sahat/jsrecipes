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
function(err, results) {
  // results is now equal to: {one: 1, two: 2}
});
```

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

*Each asynchronous function runs one at a time, passing its results to the next function.*

Similar to `series`, there is also also `waterfall` control flow. The one difference here is each function can pass their results to the next function in the array.

Suppose you are building a cloud storage web application. After user uploads a file, it is saved to a temporary location on disk. You would like to read that file, then save its metadata to database, then upload the file to Amazon S3, and then finally delete the temporary file. Just try to imagine what it would look like if you had to write it using deeply nested callbacks.

Thanks to **async** we can write our asynchronous code elegantly using `waterfall` control flow:


```js
async.waterfall({
  function(done) {
    // read file here
    done(null, fileContents);
  },
  function(fileContents, done) {
    // save file metadata to database
    done(null, fileContents);
  },
  function(fileContents, done) {
    // upload file to Amazon S3
    done(null);
  },
  function(done) {
    // remove temporary file
    done(null);
  },
], function(err, results) {
  // Optional callback when everything is finished
});
```

In a `watefall` control flow each `done` callback has an error as the first argument and any further arguments will be passed in that exact order to the next function in the array. For example:


```js
async.waterfall([
  function(callback) {
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback) {
    // Here arg1 is 'one' and arg2 is 'two'
    callback(null);
  },
]);
```

Another very common control flow is `parallel`. Imagine you need to run multiple asynchronous tasks, and then render a page, but only after all tasks have been completed. For example, you might want to scrape 5 various websites for some data. There is no guaranteed order in which they will return, so when should you render a page with results? That's where `parallel` control flow comes in. Unlike `series` and `waterfall`, it does not wait until the previous function has completed. Once all functions are completed, the results are passed to the final callback as an array.

#### <i class="fa fa-code-fork text-danger"></i> Parallel


<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Control Flow in Node.js](http://book.mixu.net/node/ch7.html)