Websites like GitHub and [StackOverflow](http://meta.stackoverflow.com/questions/47991/how-is-gravatar-set-on-stack-overflow)
use [Gravatar](http://en.gravatar.com/)
service to display profile images. Whether you want to use Gravatar images or custom
profile images uploaded by users instead will depends on your application's use case.

Getting profile images from Gravatar is actually simpler than you might think.
All you need is a built-in Node.js `crypto` library and the Gravatar URL that you
can find at [Gravatar Developer Resources](https://en.gravatar.com/site/implement/).

```
var crypto = require('crypto');

var email = 'sahat@msn.com';
var md5 = crypto.createHash('md5').update(email).digest('hex');
var url = 'http://www.gravatar.com/avatar/' + md5;
```

That's the simplest example of Gravatar usage. That URL above returns a
profile image of 80x80 in size. Basically you query Gravatar by your e-mail,
except you are not using your actual email, but a hashed version of your e-mail.

<img src="http://www.gravatar.com/avatar/c0cd70a1d4af825b1173a72baf278ba7?s=160" width="80px" height="80px">


You can also specify custom image size anywhere from 1px to 2048px by passing
an extra query string parameter:

```
var large = 'http://www.gravatar.com/avatar/' + md5 + '?s=250';
```
If specified e-mail has no matching Gravatar image you will the following image:

<img src="http://www.gravatar.com/avatar/00000000000000000000000000000000" height="80px" width="80px">

So, what is this MD5 hash anyway? From [MD5 Hash Generator](http://www.md5hashgenerator.com):
> An MD5 hash is created by taking a string of an any length and encoding it into a 128-bit fingerprint. Encoding the same string using the MD5 algorithm will always result in the same 128-bit hash output. This tool provides a quick and easy way to encode an MD5 hash from a simple string of up to 256 characters in length.

![](images/backend/intermediate/gravatar-profile-images-1.png)

<div class="alert alert-warning">
<h4>Mongoose Integration</h4>
You can use the following helper method to simplify the process of
retrieve Gravatar images.
</div>

Add the following instance method to your User schema.

```
userSchema.methods.gravatar = function(size, defaults) {
  if (!size) size = 200;
  if (!defaults) defaults = 'retro';

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=' + defaults;
  }

  var md5 = crypto.createHash('md5').update(this.email);
  return 'https://gravatar.com/avatar/' + md5.digest('hex').toString() + '?s=' + size + '&d=' + defaults;
};
```

Then inside your template this is how you would display a Gravatar image. It will
use currently logged-in user's e-mail address to generate a Gravatar URL on the fly.

```
img(src='#{user.gravatar()}')
```

