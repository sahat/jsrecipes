## Add Socket.io banner image

### Introduction

[Socket.io](http://socket.io) is a lightweight protocol that sits on top of
HTTP which aims to make real-time communication between the server and client 
possible. Typically, the client is a web browser: Chrome, Firefox,
Safari with the server being [node.js](http://nodejs.org). 
Socket.io can also be used for server-to-server communication but we will
not worry about that right now. 

Very much inspired by [Michael Mukhin's SocketIO tutorial](http://psitsmike.com/2011/09/node-js-and-socket-io-chat-tutorial/),
this tutorial is intended to fill in the gap for beginner node.js programmers who have never used the socket.io and would like to
gain a basic understanding of the mechanics behind socket.io that make it such a powerful tool.

Socket.IO embraces the [EventEmitter](http://nodejs.org/api/events.html) design pattern, something you 
see quite often in node.js. There are two [EventEmitter](http://nodejs.org/api/events.html)
objects we are concerned with are: **Emitter** and **Listener**. An **Event Emitter** is an object that emits
events such as _connect_, _disconnect_, and _data_. An **Event Listener** is a function we register to a particular emitted event,
e.g. 'connect'. When a particular event is detected by the Event Listener, the function registered to that particular event gets executed.
Socket.io is an event emitter and listener.

In the context of socket.io, a server will typically listen for events emitted by the client,
for example an _incomingMessage_ event, and the client will listen for events emitted by the server,
say, _dataFromServer_. Both the client and server EMIT events and respond 
accordingly by executing functions that are registered to LISTEN for those specific event.

A socket.io powered chat application's workflow may look something like this:

1. Client connects to a server and a _connection_ event is registered by the server.

2. On _connection_ event, the server adds the socket connection to an array which
contains a pool of all connected sockets.

3. The server emits a _data_ event to all connected clients (broadcast) which tells
all connected clients that a new user has joined the chat. 

4. Clients listening for the _data_ event parse and render data sent from the server.

5. User enters text in to textboxarea and clicks submit. The client emits a _message_
event containing data entered by the user. 

6. Server listening for _message_ event parses data sent by the client and broadcasts
a _data_ event containing the text entered by the user. GOTO step 4 until the user
leaves the page or closes their browser which emits a _disconnect_ event.

7. Server recieves the _disconnect_ event and removes the socket connection from the pool
of connected clients. The server then broadcasts a _data_ event which lets tells 
the clients that a user has left the chatroom.


### Getting Started

Now with all the formalities out of the way, we can finally get started! Before we jump right in,
I assume that you are working in a UNIX environment: Ubuntu, OSX, etc and have
[node.js](http://nodejs.org) installed. If you do not, please follow these installion 
instructions found here: [Link to install NodeJS](http://nodejs.org)

First, let's create a directory where our sample socket.io chat application will exist.

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

#### Setting up our Socket.io server

Now that all our dependencies are installed, we can start writing the server portion of our chat application. We will
be using [Express.js](http://sample.com), a minimal web framework that provides a bunch of features that will make our
life a lot easier. If you are not familiar with [Express](http://sample.com), do not worry. It is very
simple to setup and we will go through the entire process step-by-step.

Using your text editor, create another file called 'app.js'. This will serve as our socket.io server, and of course
this file will be located in the root directory of our project 'socketio-chatapp/app.js'.
Instead of 'app.js' spanning one large code block, it will be broken up in to smaller snippets.
This will make the code easier to digest and keep me from having to reference line numbers.
In this tutorial, code snippets are broken up in a contiguous manner allowing you to direct copy
code snippets without generating syntax errors.

##### app.js

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
When the server recieves 'addUser' event from the client, we store the username sent from 
the client into our usernames object and we also store it as an attribute of the socket. The socket object 
is passed in on a 'connection' event. When the server recieves a 'sendChat' event, the server broadcasts an 
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
Finally, we create the event handler for 'disconnect'. When the server recieves a disconnect event,
we delete the username from the usernames object, emit 'updateUsers' event which will update the
current list of clients, and broadcast to all clients that a user has disconnected.

We have finished writing the server portion of our socket.io powered chat application!

#### Setting up socket.io client

In the same directory as 'app.js', create a file called *index.html*. We will store both javascript and HTML
inside this file. [JQuery](http://jquery.com/) is used to expedite the data & click registration process.
Just like our SocketIO server, our client will emit and respond to events.

##### index.html

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
We register three events : 'connect', 'updateChat' and 'updateUsers'. When our client connects to the server,
the client will emit an 'addUser' event which will send the value of the prompt to the server. When the server
recieves the name, it will be added to the servers list of usernames.




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










