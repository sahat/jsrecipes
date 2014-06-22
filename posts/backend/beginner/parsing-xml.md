Many third-party APIs return JSON data these days, but on some occasions
you will have no choice but to work with XML.

To get started, you will need to install `xml2js` library. For the purposes of
this tutorial you will also need `request` library to make a remote request
for an XML document:

```
npm install xml2js request
```

We will be making a request to EVE Online API to retrieve a Character ID string.
There is only one required parameter - *character name*. Any valid EVE Online character name
would work.

![](images/backend/beginner/parsing-xml-1.png)

Here is the code to parse that XML and print out the Character ID.
```
// Module dependencies
var request = require('request');
var xml2js = require('xml2js');

// xml2js parser instance
var parser = new xml2js.Parser();

// GET request to EVE Online API
var characterName = 'Nova Kierra';
var url = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=' + characterName;
request.get(url, function(error, request, body) {
  // Parse XML data from body
  parser.parseString(body, function(err, parsedXml) {
    try {
      var characterId = parsedXml.eveapi.result[0].rowset[0].row[0].$.characterID;
      console.log(characterId);
    } catch(e) {
      console.log('Character not found');
    }
  });
});
```

The `parseString` method takes XML input as its first argument, and
returns callback function with a JSON object. Here is the contents
of the `parsedXML` parameter:

![](images/backend/beginner/parsing-xml-2.png)

Notice that there is a try-catch block around `var characterId`. Many times XML structure
will differ depending on what it is returning. If character name is not specified,
it will no longer have the same structure:

```
<eveapi version="2">
  <currentTime>2014-03-24 17:57:04</currentTime>
  <error code="0">
    General Error: Scotty the docking manager heard you were talking shit about him behind his back and refuses to service your request.
  </error>
  <cachedUntil>2014-03-24 18:57:04</cachedUntil>
</eveapi>
```

Parsing that XML document using provided code will result in the following exception. And
remember any exception that is thrown will bring down your node.js process! So
be sure to add try-catch blocks around your code whenever you are parsing XML.

```
TypeError: Cannot read property '0' of undefined
    at /Users/sahat/xmldemo/app.js:42:54
    at Parser.<anonymous> (/Users/sahat/xmldemo/node_modules/xml2js/lib/xml2js.js:368:20)
    at Parser.EventEmitter.emit (events.js:95:17)
    at Object.saxParser.onclosetag (/Users/sahat/xmldemo/node_modules/xml2js/lib/xml2js.js:338:24)
    at emit (/Users/sahat/xmldemo/node_modules/xml2js/node_modules/sax/lib/sax.js:615:33)
    at emitNode (/Users/sahat/xmldemo/node_modules/xml2js/node_modules/sax/lib/sax.js:620:3)
    at closeTag (/Users/sahat/xmldemo/node_modules/xml2js/node_modules/sax/lib/sax.js:861:5)
    at Object.write (/Users/sahat/xmldemo/node_modules/xml2js/node_modules/sax/lib/sax.js:1293:29)
    at Parser.exports.Parser.Parser.parseString (/Users/sahat/xmldemo/node_modules/xml2js/lib/xml2js.js:386:29)
    at Parser.parseString (/Users/sahat/xmldemo/node_modules/xml2js/lib/xml2js.js:6:61)
```

That's really all there is to parsing XML documents. To learn more about additional XML
parser options, visit the [node-xml2js GitHub Project](https://github.com/Leonidas-from-XIV/node-xml2js#options).

