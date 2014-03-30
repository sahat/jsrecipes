You already have an ability to get an IP address of your users. Using Express,
this is how you would display someone's IP address.

```
app.get('/', function(req, res) {
  res.send('Your IP Address: ' + req.ip);
});
```

IP address by itself is not very interesting, what would be pretty cool is to
find out the location of that IP address.

Consider the following scenario. You are building an app using [Foursquare](http://foursquare.com)
API and you need to display [trending venus](https://developer.foursquare.com/docs/venues/trending)
near the user, *without using geolocation*. You know user's IP address, but you
don't know where that user is located. Luckily there is a library for that.

![](images/backend/intermediate/get-users-location-from-ip-address-1.png)

Download and install geoip-lite:

```
npm install --save geoip-lite
```

Here is a basic usage:

```
var geoip = require('geoip-lite');

var ip = '207.97.227.239';
var geo = geoip.lookup(ip);

console.log(geo);
```

**Output**
```
{
  range: [ 3479299040, 3479299071 ],
  country: 'US',
  region: 'CA',
  city: 'San Francisco',
  ll: [37.7484, -122.4156]
}
```

You give it an IP address and it returns JSON object with **country**, **region**,
**city** attributes, as well as **latitute/longitude** coordinates. In our
scenario with Foursquare API latitude and longitude coordinates is all you
actually need to list trending venues near that location.

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [GeoIP-lite GitHub Project](https://github.com/bluesmoon/node-geoip)
