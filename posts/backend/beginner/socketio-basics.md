![](images/backend/beginner/socketio-basics-1.png)

[SocketIO](http://socket.io) is a lightweight protocol that sits on top of
HTTP which aims to make real-time communication between the server and client 
possible. Typically, the client is a web browser: Chrome, Firefox,
Safari with the server being [node.js](http://nodejs.org). 
SocketIO can also be used for server-to-server communication but we will
not worry about that right now. 

Very much inspired by [Michael Mukhin's SocketIO tutorial](http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/),
this tutorial is intended to fill in the gap for beginner node.js programmers who have never used the socket.io and would like to
gain a basic understanding of the mechanics behind socket.io that make it such a powerful tool.

SocketIO embraces the [EventEmitter](http://nodejs.org/api/events.html) design pattern, something you
see quite often in node.js. There are two [EventEmitter](http://nodejs.org/api/events.html)
objects we are concerned with are: **Emitter** and **Listener**. An **Event Emitter** is an object that emits
events such as _connect_, _disconnect_, and _data_. An **Event Listener** is a function we register to a particular emitted event,
e.g. 'connect'. When a particular event is detected by the Event Listener, the function registered to that particular event gets executed.
Socket.io is an event emitter and listener.

In the context of socket.io, a server will typically listen for events emitted by the client,
for example an _incomingMessage_ event, and the client will listen for events emitted by the server,
say, _dataFromServer_. Both the client and server EMIT events and respond 
accordingly by executing functions that are registered to LISTEN for those specific event.

A SocketIO powered chat application's workflow may look something like this:

1. Client connects to a server and a _connection_ event is registered by the server.

2. On **connection** event, the server adds the socket connection to an array which
contains a pool of all connected sockets.

3. The server emits a **data** event to all connected clients (broadcast) which tells
all connected clients that a new user has joined the chat. 

4. Clients listening for the **data** event parse and render data sent from the server.

5. User enters text in to textboxarea and clicks submit. The client emits a **message**
event containing data entered by the user. 

6. Server listening for **message** event parses data sent by the client and broadcasts
a **data** event containing the text entered by the user. GOTO step 4 until the user
leaves the page or closes their browser which emits a **disconnect** event.

7. Server receives the **disconnect** event and removes the socket connection from the pool
of connected clients. The server then broadcasts a **data** event which lets tells
the clients that a user has left the chatroom.

<hr> 
### Getting Started

With all the formalities out of the way, we can finally get started!
I assume that you are working in a UNIX environment: Ubuntu, OSX, etc and have
[node.js](http://nodejs.org) installed. If you do not, please follow these installation 
instructions found here: [Link to install NodeJS](http://nodejs.org)

First, let's create a directory where our sample SocketIO chat application will exist.

```
mkdir socketio-chatapp && cd socketio-chatapp
``` 

Now, let's create a package.json file. this will tell our package manager npm the
dependencies that are required for this project. Open up your favorite text editor and 
enter this into 'socketio-chatapp/package.json'.

```
{
  "name": "socketio-chatapp",
  "description": "a sample chat application using socket.io",
  "dependencies": {
    "express": "3.5.0",
    "socket.io": "^0.9.16"
  }
}
```

After you have done that, we can now tell npm we want install these dependencies for our project.

```
npm install
```

#### Setting up our SocketIO server

Now that all our dependencies are installed, we can start writing the server portion of our chat application. We will
be using [Express.js](http://expressjs.com), a minimal web framework that provides a bunch of features that will make our
life a lot easier. If you are not familiar with [Express](http://expressjs.com), do not worry. It is very
simple to setup and we will go through the entire process step-by-step.

Using your text editor, create another file called 'app.js'. This will serve as our socket.io server, and of course
this file will be located in the root directory of our project 'socketio-chatapp/app.js'.
Instead of 'app.js' spanning one large code block, it will be broken up in to smaller snippets.
This will make the code easier to digest and keep me from having to reference line numbers.
In this tutorial, code snippets are broken up in a contiguous manner allowing you to direct copy
code snippets without generating syntax errors.

**app.js**

```javascript
  var express = require('express');
  var http = require('http');
  var app = express();
```

We tell node that we would like to require these external modules: _express_ and _http_. After that,
we create an express server called _app_.


```javascript
  app.set('port', process.env.port || 8080);
  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
  });
``` 

Then, we set the express value of _port_ to the environment variable PORT. If that does not exist, we set it to 8080.
After that, we tell express we want to route all GET requests to the root directory of our server to
return the file, index.html.


```
  var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Server is listening on port: ' + app.get('port'));
  });
```

If you are new to Express, the snippet above may seem complex but it's asking the HTTP module 
to create a web server object with the express application as it's parameter to which we can use respond to requests.
The server object then binds itself to the value stored in _app.get('port')_. At this point,
we have a fully functioning web server that responds to all requests with the index.html file.


```
  var io = require('socket.io').listen(server);
  io.set('log level', 3);

```

Next, we import the socket.io module and bind it to the HTTP server we just created. We set the
log level of socket.io to 3 which will give us debug information. 0 - error, 1 - warn, 2 - info, 3 - debug.
Now that we have socket.io working together with our express server, we can now tell 
socket.io to listen for, and emit events.

```javascript
 
  var usernames = {};
 
  io.sockets.on('connection', function(socket) {
    
    socket.on('addUser', function(username) {
      // store the username attribute in the socket object.
      socket.username = username;
      // store the username attribute in the usernames object.
      usernames[username] = username;
      socket.emit('updateChat', 'Server', 'you have connected');
    });

    socket.on('sendChat', function(data) {
      // broadcast to all clients the data recieved on the 'sendChat' event
      io.sockets.emit('updateChat', socket.username, data);
    });
  });
```

We create an object called usernames that will store the usernames of all connected clients.
Then we tell socket.io after a 'connection' event, we should listen for a 'addUser' and 'sendChat' event.
When the server receives 'addUser' event from the client, we store the username sent from 
the client into our usernames object and we also store it as an attribute of the socket. The socket object 
is passed in on a 'connection' event. When the server receives a 'sendChat' event, the server broadcasts an 
'updateChat' event to all connected clients with data sent to the server in the 'sendChat' event. 


```
  socket.on('disconnect', function() {
    // delete username from usernames object.
    delete usernames[socket.username];
    // tell the client to update it's user list.
    io.sockets.emit('updateUsers', usernames);
    // broadcast a message to all clients that a user has disconnected.
    socket.broadcast.emit('updateChat', 'Server', socket.username + ' has disconnected.');
  });
});
  
```
Finally, we create the event handler for 'disconnect'. When the server receives a disconnect event,
we delete the username from the usernames object, emit 'updateUsers' event which will update the
current list of clients, and broadcast to all clients that a user has disconnected.

We have finished writing the server portion of our socket.io powered chat application!

#### Setting up SocketIO client

In the same directory as 'app.js', create a file called *index.html*. We will store both JavaScript and HTML
inside this file. [JQuery](http://jquery.com/) is used to expedite the data & click registration process.
Just like our SocketIO server, our client will emit and respond to events.

**index.html**
```
<script src="/socket.io/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
  var socket = io.connect('http://localhost:8080');

  socket.on('connect', function() {
    socket.emit('addUser', prompt("What is your name?"));
  });

  socket.on('updateChat', function(username, data) {
    $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
  });

  socket.on('updateUsers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
      $('#users').append('<div>' + key + '</div>');
    });
  });

```
We register three events: **connect**, **updateChat** and **updateUsers**. 
On **connect** event, signifying the client sucessfully connects to the server, the connect event handler is executed and our client
will emit an *addUser* event. We are then prompted for a username
which will be sent to the server. When the server recieves the username, it will be added to the global 
list of usernames.
An **updateChat** event occurs when our server recieves a chat message that needs to be broadcasted
to all listening clients. On updateChat, we append the received message to the *conversation* div specified by JQuery.
Finally, the **updateUsers** event occurs whenever a client connects or disconnects to the SocketIO server. Our server
updates the global list of usernames and sends them to all the clients. 
Annnnd thats it, we successfuly implemented all the required functionality for real-time client to server communcation!

The remaining code Javascript and HTML are JQuery functions that allow us to extra data from inputs and HTML to
display the data.

```
// on load of page
  $(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
      var message = $('#data').val();
      $('#data').val('');
      // tell server to execute 'sendchat' and send along one parameter
      socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
      if(e.which == 13) {
        $(this).blur();
          $('#datasend').focus().click();
        }
    });
});

</script>
<div style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;">
    <b>USERS</b>
    <div id="users"></div>
</div>
<div style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;">
    <div id="conversation"></div>
    <input id="data" style="width:200px;" />
    <input type="button" id="datasend" value="send" />
</div>
```
#### Final Thoughts

SocketIO is a very powerful tool when you need easy real-time communication between the server and client.
SocketIO attempts to use the WebSocket protocol, a full-duplex communication channel over TCP. If the WebSocket
protocol is not supported by the browser, it will fall back to less efficient communication methods: Adobe Flash Socket,
AJAX Long Polling, AJAX Multipart Streaming, Forever IFrame, and JSONP Polling. As a developer, this is awesome
because you have don't have to ask yourself "Will this work on browser x?" because the answer is most likely yes.

Another cool feature of SocketIO is **volatile messages**. Volatile messages are messages that can be dropped
without any significant repercussions. Say you are pushing non mission-critical updates to a client 
every 5 seconds. You might choose volatile messaging as losing a couple message won't break your app. You can
read more about SocketIO's features [here](http://socket.io/#how-to-use).
 
If you are looking for something that can do server to server interprocess communication, you can definitely
use SocketIO but there are better tools available. For example, [ZeroMQ](http://zeromq.org/) is great for
fast and easy communication. Like SocketIO and many other node libraries, [node-zmq](https://github.com/JustinTulloss/zeromq.node)
follows the Event Emitter pattern so learning zmq is quick and painless. ZeroMQ out of the box offers basic
messaging patterns: PUB/SUB, REQ/REP, PUSH/PULL. ZeroMQ makes no assumption about your architecture so you
if you are planning on doing anything relatively complex, you will have to handle everything yourself.
ZeroMQ could be considered 'TCP Socket on Steroids'.


### <i class="fa fa-code"></i> Source Code</i>


**app.js**
```
var express = require('express');
var http = require('http');
var app = express();

// configuration settings for PORT
app.set('port', process.env.PORT || 8080);

// configure routing
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port: " + app.get('port'));
});

var io = require('socket.io').listen(server);
io.set('log level', 0);

var usernames = {};

io.sockets.on('connection', function(socket) {
  socket.on('sendChat', function(data) {
    io.sockets.emit('updateChat', socket.username, data);
  });

  socket.on('addUser', function(username) {
    // store the username in the sockets session for the client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    socket.emit('updateChat', 'Server', 'you have connected');
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('updateChat', 'Server', username + ' has connected');
    // update the list of users in the chat, client side
    io.sockets.emit('updateUsers', usernames);
  });

  socket.on('disconnect', function() {
    // remove the username from the global list of usernames
    delete usernames[socket.username];
    // update the list of users in the chat, client side
    io.sockets.emit('updateUsers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updateChat', 'Server', socket.username + ' has disconnected.');
  });
});
```

**index.html**
```
<script src="/socket.io/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
    var socket = io.connect('http://localhost:8080');
    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', prompt("What's your name?"));
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
    });

    // listener, whenever the server emits 'updateusers', this updates the username list
    socket.on('updateusers', function(data) {
        $('#users').empty();
        $.each(data, function(key, value) {
            $('#users').append('<div>' + key + '</div>');
        });
    });

    // on load of page
    $(function(){
        // when the client clicks SEND
        $('#datasend').click( function() {
            var message = $('#data').val();
            $('#data').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', message);
        });

        // when the client hits ENTER on their keyboard
        $('#data').keypress(function(e) {
            if(e.which == 13) {
                $(this).blur();
                $('#datasend').focus().click();
            }
        });
    });

</script>
<div style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;">
    <b>USERS</b>
    <div id="users"></div>
</div>
<div style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;">
    <div id="conversation"></div>
    <input id="data" style="width:200px;" />
    <input type="button" id="datasend" value="send" />
</div>
```
<br>
Written by <a href="mailto:brianwu02@gmail.com">Brian Wu</a>

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Related Resources</i>

1. [Michael Mukhin's SocketIO tutorial](http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/)
2. [Sample Chat App in AngularJS and ExpressJS](https://github.com/brianwu02/MEAN-chat)
3. [SocketIO](http://socket.io)
4. [ZeroMQ](http://zeromq.org/)
5. [node-zeromq](https://github.com/JustinTulloss/zeromq.node)









