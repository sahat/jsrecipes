There are three common ways of sending data from client to server:

1. Query String - key-value pair after `?`, separated by `&`.
2. POST - parameters that are sent as part of a `POST` request.
3. URL - route parameters, e.g. `/posts/:id`.

### Query String

The following route returns the query that you have typed:

```
// GET /search?q=hello+world
app.get('/search', function(req, res) {
  res.send('Your query: '+ req.query.q + '\n');
});
```
Here is a screenshot for demonstration purposes:

![](images/backend/beginner/parsing-query-string-post-and-url-parameters-1.png)

Basically, whichever key name you use in the URL after the `?`, you should use
the same name in your Express routes: `req.query.KEY_NAME`.

Similarly, you can use multiple different keys or the same key with multiple
values:

```
// GET /books?order=desc&book[genre]=fiction&book[author]=richelle+mead
req.query.order // desc
req.query.book.genre // fiction
req.query.book.author // richelle mead
```

Here is another example using the same key multiple times:

```
// GET /filter?stores=zara&stores=macys&stores=uniqlo
req.query.stores // ['zara', 'macys', 'uniqlo']
```

That's all there is to it. I should also point out that there is a built-in
[Query String](http://nodejs.org/api/querystring.html) module that might of
interest.

### POST

There is already an in-depth post written [here](#/backend/handling-submitted-form-fields).
Examples on that page use HTML Form for submitting POST data. In this example I will
use jQuery AJAX to send a POST request.

**Server**
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
    res.send('Successfully created new user');
  });
});
```

**Client**
```
var user = {
  firstName: 'Kallen',
  lastName: 'Stadtfeld',
  email: 'kallen@ashford.edu',
  username: 'kallen',
  password: 'password'
};

$.ajax({
  type: 'POST',
  url: '/signup',
  data: user,
  success: function(data) {
    console.log(data); // "Successfully created new user"
  });
});
```

As you can see it doesn't matter how you send the data, as long as it is a POST
request, you will always use `req.body` to retrieve it in Express.

### URL

Suppose you have the following route, you can access `:name` parameter via
`req.params.name`.

```
// GET /user/smith
app.get('/user/:name', function(req, res) {
  console.log(req.params.name); // "smith"
});
```

There are many use cases for URL parameters. One such use case, perhaps the most common,
is demonstrated above, where you want to display a page for a particular user.

Or perhaps you have a route that deletes a file by id:

```
app.del('/files/:id', function(req, res) {
  File.remove({ _id: req.params.id }, function(err) {
    console.log('File removed');
  });
});
```
