Sending e-mails is such a common task and yet it is not immediately obvious how
to do it. When I was first learning how to send an e-mail using Node.js, I had no
idea where to start. My concept of an email server was associated with Microsoft
Exchange Server. Believe it or not, I actually thought I needed to have
something like Microsoft Exchange Server running somewhere on the cloud to send
a simple e-mail message!

Fortunately sending e-mails is very easy in Node.js. We will be using [Nodemailer](https://github.com/andris9/Nodemailer)
library. It supports both plain text and HTML emails. The best part about
Nodemailer is that it supports so many services: **Gmail**, **Hotmail**, **Yahoo**,
**SendGrid**, **Mailgun**, **iCloud** and many more. You can even send e-mails
directly without using any third-party services, although there is a good chance
it will end up in user's **Spam** folder if you are sending an e-mail directly.

To get started, download and install Nodemailer:

```
npm install --save nodemailer
```

In your **app.js** add the following:

```
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'username@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
    from: 'sender@mail.com',
    to: 'receiver@mail.com',
    subject: 'Hello world!',
    text: 'Plaintext message example.'
};

smtpTransport.sendMail(mailOptions, function(err) {
  console.log('Message sent!');
});
```

Swapping Gmail for another service is as simple as renaming the **service** property
and updating username &amp; password. It's that simple!

There are many great guides over at [nodemailer.com](http://www.nodemailer.com/),
be sure to check it out!

As I mentioned earlier, Nodemailer also supports HTML e-mails. Here is
a screenshot from Dan Stroot's [Skeleton](https://github.com/dstroot/skeleton) boilerplate project
which is based on my [Hackathon Starter](github.com/sahat/hackathon-starter) project.
You can take a look at **welcome.jade** template [here](https://github.com/dstroot/skeleton/blob/master/views/mail/welcome.jade).

![](images/backend/intermediate/sending-emails-with-nodemailer-1.png)

Basically the only difference with HTML e-mails is you have to load an HTML template
and assign it to `html` property inside `mailOptions` object. But the problem is we usually
do not send generic e-mails that look the same for all users. In this welcome
message there is one variable that changes depending on who it is sent to:
user's full name.

Suppose you have that **views/welcome.jade** template, this is how you would
parse it, convert to HTML and send via Nodemailer:

```
res.render('welcome', {
  name: 'Satellizer L. Bridget'
}, function(err, html) {

  var mailOptions = {
    to: 'satellizer@westgenetics.edu',
    from: 'elize.schmitz@westgenetics.edu'
    subject: 'Welcome to West Genetics!',
    html: html
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    console.log('Message sent!');
  });
});
```

You probably didn't know that you can provide a callback function to
`res.render`? Neither did I until recently. I have used `res.render` without
any callbacks for so long that I thought that's the only way it works.
But if you look at the Express documentation on
[res.render](http://expressjs.com/3x/api.html#res.render), you will see that
it has the following structure:

```
res.render(view, [locals], callback)
```

This should at least get you started with sending e-mails in Node.js. My advice
is to focus on plaintext e-mails first, since it's easier to work with, and enhance it
with HTML later on as time and resources allow.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [HTML Email Boilerplate](http://htmlemailboilerplate.com/)
2. [Email Blueprints](https://github.com/mailchimp/Email-Blueprints)
3. [Antwort](https://github.com/InterNations/antwort)