I am sure you have seen plenty of online visitor counters that display how many
users are online on that website. Using websockets we can monitor in real-time
how many connected users are currently online on the website.

![](images/backend/intermediate/who-is-online-with-socketio-1.png)

For this example I will assume you are using Expres web framework. Add the
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

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Related Resources

1. [New Eden Faces](http://www.newedenfaces.com)
