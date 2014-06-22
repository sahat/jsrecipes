<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You want to know how many active online visitors are on your site in
  real-time.
</div>

I am sure you have seen plenty of online visitor counters that display how many
users are online on that website. Using websockets we can monitor in real-time
how many connected users are currently online on the website.

![](images/backend/intermediate/who-is-online-with-socketio-1.png)

For this example I will assume you are using Express web framework. Add the
following code somewhere in your app, after `var app = express()`.

**Server**
```
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var userCount = 0;

io.sockets.on('connection', function (socket) {
  userCount++;
  io.sockets.emit('userCount', { userCount: userCount });
  socket.on('disconnect', function() {
    userCount--;
    io.sockets.emit('userCount', { userCount: userCount });
  });
});
```

In the `<head>` tag of **index.html** (or **layout.jade**, depending on the
templating engine that you are using) add this line:

```
// HTML
<script src="/socket.io/socket.io.js"></script>

// Jade
script(src='/socket.io/socket.io.js')
```


Then in your client-side JavaScript file add the following code. It
listens for `userCount` socket event and updates the DOM whenever this
event is triggered: user connects to the website, user leaves the website.

**Client**
```
var socket = io.connect();

socket.on('userCount', function (data) {
  console.log(data.userCount);
});
```

Here is quick example demonstrating the code. After opening 4 browser windows
on **http://localhost:3000**.

![](images/backend/intermediate/who-is-online-with-socketio-2.png)

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

**app.js**
```javascript
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


var userCount = 0;

io.sockets.on('connection', function (socket) {
  userCount++;
  io.sockets.emit('userCount', { userCount: userCount });
  socket.on('disconnect', function() {
    userCount--;
    io.sockets.emit('userCount', { userCount: userCount });
  });
});
```

**layout.jade**
```jade
doctype html
html
  head
    title User Counter
    link(rel='stylesheet', href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css')
    script(src='/socket.io/socket.io.js')
  body
    block content
    script(src='//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js')
    script(src='/javascripts/main.js')
```

**index.jade**
```jade
extends layout

block content
  .container
    .page-header
      h1
        span#userCount 0
        small  users online
```

**main.js**
```javascript
var socket = io.connect();

socket.on('userCount', function (data) {
  console.log(data.userCount);
});
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [New Eden Faces](http://www.newedenfaces.com)
