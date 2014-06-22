<div class="alert alert-info">
  <h4>When would I use this?</h4>
  If you are building a website using a client-side framework like Angular, Backbone,
  Ember or Knockout, you will need RESTful API for managing data. The beautiful
  thing about REST API is decoupled architecture: client doesn't need to know anything
  about the server and server couldn't care less about the client. You can basically
  build REST API once and re-use it across multiple clients - web, mobile and even desktop.
</div>

This guide will show you how to build a book library service that lets users perform
basic CRUD operations: create, update, read, delete.

If you don't know what is REST, check out this [Web API Design (PDF)](http://ciar.org/ttk/public/apigee.web_api.pdf)
guide by Apigee. It basically comes down to having the following URL structure.

<table class="table table-hover">
  <thead>
    <tr class="inverse">
      <th>Resource</th>
      <th>POST (create)</th>
      <th>GET (read)</th>
      <th>PUT (update)</th>
      <th>DELETE (delete)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>/dogs</strong></td>
      <td>Create a new dog</td>
      <td>List dogs</td>
      <td>Bulk update dogs</td>
      <td>Delete all dogs</td>
    </tr>
    <tr>
      <td><strong>/dogs/1234</strong></td>
      <td>N/A</td>
      <td>Show Bo</td>
      <td>Update Bo</td>
      <td>Delete Bo</td>
    </tr>
  </tbody>
</table>

Let's start from the very beginning. Here is the default generated Express skeleton when
you run `express myapp`. I have deleted default routes since we will not
be using them.

**app.js**
```
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

You will need 5 routes in total to perform CRUD operations. The `/api` prefix
is totally up to you. Typically, if it's an API endpoint that returns JSON,
it should be prefixed with `/api` or `/api/v1` to differentiate it from non-API
endpoints.

```
// Find book by id.
app.get('/api/books/:id', function(req, res) {

});

// Find all books.
app.get('/api/books', function(req, res) {

});

// Update book by id.
app.put('/api/books/:id', function(req, res) {

});

// Create new book.
app.post('/api/books', function(req, res) {

});

// Delete book by id.
app.del('/api/books/:id', function(req, res) {

});
```

Before continuing further, let's create a `Book` model using
Mongoose. If you haven't installed Mongoose yet, do so now:

```
npm install --save mongoose
```

The following example assumes you have MongoDB running on your local machine. Here,
I am importing **mongoose** library, connecting to local MongoDB database, defining
Book schema and model. If this too confusing, please refer to the
[Getting Started with Mongoose](#/backend/getting-started-with-mongoose) guide.

```
var mongoose = require('mongoose');

mongoose.connect('localhost');

var bookSchema = new mongoose.Schema({
  isbn:  String,
  title: String,
  author: String,
  genre: String,
  year: Number
});

var Book = mongoose.model('Book', bookSchema);
```

Now let's get back to routes. Our first route finds a specific book
by id.

#### <i class="fa fa-search text-danger"></i> Find Book by ID

I have already created a book by hand, using Mongo shell. When you
visit `/api/books/:id` where a parameter `:id` is the MongoDB ObjectID of
that particular book, you will see a JSON document.

```
// Find book by id.
app.get('/api/books/:id', function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    res.send({ book: book });
  });
});
```

![](images/backend/intermediate/building-a-rest-api-1.png)

**Note:** I am using [JSON View](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc/related?hl=en)
Chrome extension for pretty JSON formatting.

#### <i class="fa fa-search text-danger"></i> Find All Books

```
app.get('/api/books', function(req, res) {
  Book.find(function(err, books) {
    res.send(books);
  });
});
```

According to our REST manual, GET request on a top-level "noun", i.e.
`/books`, should return all documents. This route returns an array of
books in JSON format.

#### <i class="fa fa-edit text-danger"></i> Update Book by ID

This route takes POST form data as a parameter, otherwise what are you even updating?
So for this example you might have an HTML form with the following fields: ISBN,
Title, Author, Year. When user hits Submit, that data is sent to this route which
handles the update process, when finished it sends back updated book as JSON
document. But since we are building a REST API, you don't necessarily have to have
an HTML form, you could send that `PUT` request via curl from terminal, from within
an Android phone, or perhaps from an iOS device. Whichever client
you may use, your RESTful server does not, and should not care about it. That's
the beauty of REST API - build once, use everywhere.

```
app.put('/api/books/:id', function(req, res) {
  Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, book) {
    res.send({ book: book });
  });
});
```

Notice that I haven't defined a `PUT` route for a top-level URL - `/api/books`. In my experience,
I rarely have to update all documents in one swoop, so I didn't bother
with creating another `PUT` route in to update all books.


#### <i class="fa fa-file-text-o text-danger"></i> Create New Book

```
app.post('/api/books', function(req, res) {
  var book = new Book(req.body.book);
  book.save(function(err) {
    res.send({ book: book });
  });
});
```

The following example is very similar to updating a book. It takes `req.body.book`
as an argument, which has exactly the same structure as your schema. If one
of the fields is invalid, the `book.save()` will fail. I mean in this case,
there is very little that can wrong since I haven't set too many restrictions
on `Book` schema, but if one of the fields was required and you didn't pass it in,
then `save()` would definitely fail! On success it returns a new book as a JSON
document.

#### <i class="fa fa-trash-o text-danger"></i> Delete Book by ID

This last route deletes a book by ObjectId. Again, I am just following URL
convention outlined in the table above. Only status code `200` is sent back
to the client, since most of the time a client just wants to know if delete
operation was successful.

app.del('/api/books/:id', function(req, res) {
  Book.findById(req.params.id).remove(function(err) {
    res.send(200);
  });
});

I have included the entire source code below.

### <i class="fa fa-code text-danger"></i> Source Code

**app.js**
```
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('localhost');

var bookSchema = new mongoose.Schema({
    isbn:  String,
    title: String,
    author: String,
    year: Number
});

var Book = mongoose.model('Book', bookSchema);

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Find book by id.
app.get('/api/books/:id', function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    res.send({ book: book });
  });
});

// Find all books.
app.get('/api/books', function(req, res) {
  Book.find(function(err, books) {
    res.send(books);
  });
});

// Update book by id.
app.put('/api/books/:id', function(req, res) {
  Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, book) {
    res.send({ book: book });
  });
});

// Create new book.
app.post('/api/books', function(req, res) {
  var book = new Book(req.body.book);
  book.save(function(err) {
    res.send({ book: book });
  });
});

// Delete book by id.
app.del('/api/books/:id', function(req, res) {
  Book.findById(req.params.id).remove(function(err) {
    res.send(200);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Backbone.js with Express REST API Project](https://github.com/sahat/newedenfaces)
2. [Ember.js + Express Starter](https://github.com/sahat/ember-sass-express-starter)
