## Add Socket.io banner image

### Introduction

[Socket.io](http://socket.io) is a lightweight protocol that sits on top of
HTTP which aims to make real-time communication between the server and client 
possible. Typically, the client is a web browser: Chrome, Firefox,
Safari with the server being [node.js](http://nodejs.org). 
Socket.io can also be used for server-to-server communication but we will
not worry about that right now.


Socket.IO embraces the [EventEmitter](http://nodejs.org/api/events.html) design pattern, something you 
see quite often in node.js. For this tutorial, there two [EventEmitter](http://nodejs.org/api/events.html)
objects we are concerned with:
**Emitter** and **Listener**. An **Event Emitter** is an object that emits
events such as _connect_, _disconnect_, and _data_.
An **Event Listener** is a function we register to a particular event, for example
'connect', and executes itself when the described event is detected. 

In the context of socket.io, a server will typically listen for events emitted by the client,
for example an _incomingMessage_ event, and the client will listen for events emitted by the server,
say, _dataFromServer_. In short, both the client and server EMIT events and respond 
accordingly by executing functions that are registered to LISTEN for that specific event.

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


