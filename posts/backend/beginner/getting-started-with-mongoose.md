<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You will use Mongoose whenever you need to store and retrieve data to/from the
  database, namely MongoDB. Most web applications, except trivial ones, use
  some kind of database to store data, e.g. users, blog posts, items.
</div>

<style>
.mongoose {
  color: #800;
  letter-spacing: -8px;
  font-size: 120px;
  font-weight: 100;
  margin-top: -20px;
}
@media (max-width: 720px) {
  .mongoose {
    letter-spacing: -6px;
    font-size: 75px;
  }
}
</style>
<div class="mongoose">mongoose</div>


[Mongoose](http://mongoosejs.com) is a Node.js library for interfacing with
[MongoDB](http://mongodb.org) database. It sits on a higher abstraction
layer than [MongoDB Native NodeJS Driver](https://github.com/mongodb/node-mongodb-native),
which Mongoose uses under the hood anyway. If you don't plan on defining a
schema and would rather work with MongoDB documents and collections directly,
then you might be better off with the native MongoDB driver. But for most
cases Mongoose is a solid choice; I never had any problems with it, nor did I
ever need to use native MongoDB driver.

I assume you have already installed MongoDB. If you didn't install, or can't
install MongoDB for whatever reason, as an alternative you may use a remote
database on the cloud via [MongoLab](https://mongolab.com/welcome/) or
[MongoHQ](http://www.mongohq.com/). Both services offer a *free tier*. It works
exactly the same way as a local MongoDB database.

Before we get started, make sure you have installed Mongoose NPM module by
running `npm install mongoose`. If you are getting errors during installation,
make sure you have command line tools installed on your machine. To learn more, check out
[Hackathon Starter Prerequisites](https://github.com/sahat/hackathon-starter#prerequisites).
There is a small number of NPM modules out there that require *gcc/g++ toolchain*
to correctly compile.

### Connecting to MongoDB

Connecting to database is incredibly simple:

```
var mongoose = require('mongoose');

mongoose.connect('localhost');
```

**Note**: By default, Mongoose will try to connect to local **test** database on
port **27017**. You can also specify full path `mongodb://localhost:27017/test`,
which would have the same effect as `localhost` in this case.

### Defining a schema
Before you can do anything, you first have to define a Mongoose schema. If you
are familiar with SQL, it is the same concept here. A schema
is just a structural representation of your MongoDB document. For example,
here is what a `Comment` schema might potentially look like:

```
var CommentSchema = new Schema({
  name: { type: String, default: 'Guest' }
  age: { type: Number, min: 18, index: true }
  bio: { type: String, match: /[a-z]/ }
  date: { type: Date, default: Date.now }
});
```

And here is another example of a `Blog` schema:

```
var BlogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```

And here is yet another example of a `User` schema. In this example, I specified
`required` and `unique` constraints, if those constrains are violated,
operation will fail and an error will be raised.

```
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

Each schema maps to a MongoDB collection. And each key - username, email,
password, defines a property in a MongoDB document. For example, this is how a
user document would look in our database:

```
> db.users.findOne()
{
    "__v" : 0,
    "_id" : ObjectId("530c17c1fb8c96752498e120"),
    "email" : "sahat@me.com",
    "password" : "$2a$05$ANZrgWJqVo9j1tqgCMwe2.LCFnU43bUAYW9rA3Nsx4WchPM.cELEi",
    "username" : "sahat"
}
```

Here is the list of all valid Schema types, as well as some optional properties:

- **String**
  - *lowercase* = adds a lowercase setter.
     - If set to `true`, it will save **MyEmail@gmail.COM** as **myemail@gmail.com**.
  - *match* = sets a regular expression validator.
     - For example, `match: /^a/`, will successfully validate only if string starts with letter '*a*'.
  - *trim* = adds a trim setter.
     - If set to `true`, this string **' some name '** will be saved as **'some name'**, without leading and trailing spaces.
  - *uppercase* = adds an uppercase setter.
     - If set to `true`, it will save **an example** as **AN EXAMPLE**.
- **Number**
  - *max* = sets a maximum number validator.
  - *min* = sets a minimum number validator.
- **Date**
- **Buffer**
- **Boolean**
- **Mixed**
- **Objectid**
- **Array**

### Defining a model

Mongoose model is what we ultimately need in order to interact with MongoDB. To
create a `User` model using the schema defined above, you would need to
specify the name of collection as the first argument and pass in Mongoose schema
as the second argument.

```
var User = mongoose.model('User', UserSchema);
```

**Note**: The actual MongoDB collection name will be *pluralized* and *lowercased* string
of the name you specified in `mongoose.model()`, e.g. `User` will become
`users`. Then, to retrieve all users from a MongoDB shell, you would simply run
`db.users.find()`.

### CRUD Operations

Once you have the model, you can perform basic Create, Update, Read, Delete
operations, plus some other stuff like aggregations, count and mapreduce.

#### <i class="fa fa-file-text-o text-danger"></i> Creating a new document

Using `User` model defined above, to create a new user:

```
var user = new User({
  username: 'alice',
  email: 'alice@yahoo.com',
  password: 'secret'
});

user.save(function(err) {
  console.log('Saved!');
});
```

#### <i class="fa fa-search text-danger"></i> Finding a document

Finding documents is pretty straightforward. You can query documents by any of the
properties defined in the schema, and not just by a single property, but by
more than one.

```
// Find a single user
User.findOne({ username: 'alice' }, function(err, user) {
  console.log(user);
});

// Find all users
User.find(function(err, users) {
  console.log(users);
});
```

Or if you know the ObjectId you could use `findById` method instead:

```
var _id = '530c17c1fb8c96752498e120';

User.findById(_id, function(err, user) {
  console.log(user);
});
```

You can also use logical `$or` and logical `$and` operators. For example, in the
case of a hypothetical `Book` schema you could query by author's name and book's title.
If document is found that matches **both** fields, it will be
returned in a callback.

```
Book.findOne({ $and: [{ author: 'Richelle Mead' }, { title: 'Vampire Academy' }] }, function(err, book) {
  console.log(book);
});
```


#### <i class="fa fa-edit text-danger"></i> Updating existing document

There is more than one way to update documents. The first approach is not my
preferred method, because I can never remember the method signature with so
many different options, like `upsert: true` and `multi: true`.

```
User.update({ username: 'alice' }, { $set: { email: 'alice01@gmail.com' }}, callback);
```

I usually first retrieve a document, update a field, then call a `save` method:

```
User.findOne({ username: 'alice' }, function (err, user) {
  user.email = 'alice01@gmail.com';
  user.save(function(err) {
    console.log('Updated!');
  });
});
```

#### <i class="fa fa-trash-o text-danger"></i> Deleting a document

Deleting a document is probably one of the simplest CRUD operations:

```
User.remove({ username: 'alice' }, function(err) {
  console.log('User has been deleted');
});
```

### <i class="fa fa-star text-danger"></i> Bonus

This is a list of Mongoose recipes that I found quite useful over the period of
time working with MongoDB.

#### Find 5 most recent user accounts

```
User
  .find()
  .sort({ _id: -1 })
  .limit(5)
  .exec(function(err, users) {
    console.log(users);
  });
```

#### Get total count of a particular field from all documents

Suppose that each user has a `votes` field and you would like to count the total
number of votes in your database across all users.

```
User.aggregate({ $group: { _id: null, total: { $sum: '$votes' } } }, function(err, votesCount) {
  console.log(votesCount.total);
});
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Quick-Start Guide to MongoLab](http://docs.mongolab.com)
2. [Official Mongoose Guide](http://mongoosejs.com/docs/guide.html)
3. [How to aggregate data from MongoDB with Node.js and Mongoose](http://www.kdelemme.com/2014/03/19/how-to-aggregate-data-from-mongodb-with-node-js-and-mongoose)