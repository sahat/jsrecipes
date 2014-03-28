[Socket.io](http://socket.io) is a lightweight protocol that sits on top of
HTTP which aims to make real-time communication between the server and client 
possible. Typically, the client is a web browser: Chrome, Firefox,
Safari and the web server: [node.js](http://nodejs.org). 
Socket.io can also be used for server-to-server communication but we will
not worry about that right now.


Socket.IO embraces the [Event Emitter](http://sample.com) design pattern, something you 
see quite often in node.js. In this pattern, there two objects we are concerned with:
**Event Emitter** and **Event Listener**.

An **Event Emitter** is an object that emits events such as 'connect', 'disconnect', and 'data'.
An **Event Listener** is a function we register to a particular event, for example
'connect', and executes itself when the described event is detected. 

In the context of socket.io, a server will typically listen for events emitted by the client,
for example an 'incomingMessage' event, and the client will listen for events emitted by the server,
say, 'dataFromServer'. So in short, both the client and server LISTEN for and EMIT events. 






Before we get started, I assume you are working in a UNIX environment: 
Ubuntu, OSX, etc and have [node.js](http://nodejs.org) installed.


