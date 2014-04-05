<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You need to generate short URLs for something like password reset links,
  invitation codes, or perhaps you want to shorten a URL for easy sharing.
</div>

[Hashids](http://www.hashids.org/) is a Node.js library for generating short, unique,
alphanumeric hashes. Besides the use cases described above, generating short
hashes is also useful for obfuscating user IDs. It could present potential security issues
if you are displaying actual ID (SQL) or [ObjectId](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html) (MongoDB)
in your app that is visible to the public.

Here is what I mean. This is one of my older projects where I used ObjectId of
a file as part of the URL. That highlighted alphanumeric string is the actual
ObjectId of this particular document in MongoDB. I needed a unique way to
identify each file and since I could have multiple files with the same name,
ObjectId was used as a unique identifier. Back then I didn't know about *hashids*
library to generate short hashes.

![](images/backend/advanced/generating-short-hashes-1.png)

Hashids has a very simple API, so there is really not much to learn.

**Install**
```
npm install hashids
```
As of version *0.3*, hashids includes support for MongoDB ObjectIds, or any hex
string in general.

**Encryption**
```javascript
var Hashids = require('hashids');

var hashids = new Hashids();

// Encrypt integer
var hash = hashids.encrypt(3912); // 'xGqP'

// Encrypt hex string
var hash = hashids.encryptHex('526b32409e12c3cc1c000002'); // '4rJwNNY42AIOjvqlk5mn'
```

**Decryption**
```javascript
var Hashids = require('hashids');

var hashids = new Hashids();

var hash = 'xGqP';
var id = hashids.decrypt(hash); // [ 3912 ]

var hash = '4rJwNNY42AIOjvqlk5mn';
var objectId = hashids.decryptHex(hash); // '526b32409e12c3cc1c000002'
```

**Custom Salt**

If you don't want other people to decrypt your hashes, provide a unique string
to the `Hashids` constructor.

```javascript
var Hashids = require('hashids');

var Hashids = new Hashids('unique string that no one could guess');
```

**Note:** Salt is a random string that is appended to the hashes to make it even
harder to crack it. Here is a really nice [article](https://crackstation.net/hashing-security.htm)
that explains what is a cryptographic salt in greater detail.

There are a few other things that Hashids can you which you can learn more on
the [GitHub Project](https://github.com/ivanakimov/hashids.node.js) page or go
to the [official page](http://www.hashids.org/node-js/) and scroll down until
you see **full documentation** button, which unfortunately is not linkable.