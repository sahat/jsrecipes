<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You could use Moment.js when you need highly customizable date strings with
  a built-in internationalization support. Moment.js is leaps and bounds better
  than default Date methods such as <strong>toLocaleString</strong> or <strong>toDateString</strong> for displaying date
  information.
</div>

Download and install moment.js:

```
npm install --save moment
```

Then add it to your module dependencies:

```
var moment = require('moment');
```

Here is the screenshot that demonstrates some capabilities of moment.js. Using
moment.js you can turn this date string **Thu Mar 27 2014 17:56:02 GMT-0400 (EDT)**
into **March 27th 2014**, with or without time, depending on the formatting token
you use.

![](images/backend/beginner/formatting-dates-1.png)

Here is a list of all moment.js formatting tokens:

<table class="table table-hover table-condensed">
  <thead>
    <tr class="inverse">
      <th>Input</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>M, MM</td>
      <td>Month Number (1 - 12)</td>
    </tr>
    <tr>
      <td>MMM, MMMM</td>
      <td>Month Name (In currently language set by moment.lang())</td>
    </tr>
    <tr>
      <td>D, DD</td>
      <td>Day of month</td>
    </tr>
    <tr>
      <td>DDD, DDDD</td>
      <td>Day of year</td>
    </tr>
    <tr>
      <td>d, dd, ddd, dddd</td>
      <td>Day of week (NOTE: these formats only make sense when combined with "ww")</td>
    </tr>
    <tr>
      <td>e</td>
      <td>Day of week (locale) (NOTE: these formats only make sense when combined with "ww")</td>
    </tr>
    <tr>
      <td>E</td>
      <td>Day of week (ISO) (NOTE: this format only make sense when combined with "WW")</td>
    </tr>
    <tr>
      <td>w, ww</td>
      <td>Week of the year (NOTE: combine this format with "gg" or "gggg" instead of "YY" or "YYYY")</td>
    </tr>
    <tr>
      <td>W, WW</td>
      <td>Week of the year (NOTE: combine this format with "GG" or "GGGG" instead of "YY" or "YYYY")</td>
    </tr>
    <tr>
      <td>YY</td>
      <td>2 digit year</td>
    </tr>
    <tr>
      <td>YYYY</td>
      <td>4 digit year</td>
    </tr>
    <tr>
      <td>gg</td>
      <td>2 digit week year</td>
    </tr>
    <tr>
      <td>gggg</td>
      <td>4 digit week year</td>
    </tr>
    <tr>
      <td>GG</td>
      <td>2 digit week year (ISO) </td>
    </tr>
    <tr>
      <td>GGGG</td>
      <td>4 digit week year (ISO)</td>
    </tr>
    <tr>
      <td>a, A</td>
      <td>AM/PM</td>
    </tr>
    <tr>
      <td>H, HH</td>
      <td>24 hour time</td>
    </tr>
    <tr>
      <td>h, hh</td>
      <td>12 hour time (use in conjunction with a or A)</td>
    </tr>
    <tr>
      <td>m, mm</td>
      <td>Minutes</td>
    </tr>
    <tr>
      <td>s, ss</td>
      <td>Seconds</td>
    </tr>
    <tr>
      <td>S</td>
      <td>Deciseconds (1/10th of a second)</td>
    </tr>
    <tr>
      <td>SS</td>
      <td>Centiseconds (1/100th of a second)</td>
    </tr>
    <tr>
      <td>SSS</td>
      <td>Milliseconds (1/1000th of a second)</td>
    </tr>
    <tr>
      <td>Z, ZZ</td>
      <td>Timezone offset as +07:00 or +0700</td>
    </tr>
    <tr>
      <td>X</td>
      <td>Unix timestamp</td>
    </tr>
  </tbody>
</table>

One of my favorite features of moment.js is the *calendar time*. Instead of
displaying a date string like **03/21/2014**, you could instead display it as
**Last Friday at 6:11 PM**. Blog posts would be an excellent use case for this.
It also works with future dates, e.g. **Tomorrow at 6:14 PM**.

```
moment().subtract('days', 10).calendar(); // "03/17/2014"
moment().subtract('days', 6).calendar(); // "Last Friday at 6:14 PM"
moment().subtract('days', 3).calendar(); // "Last Monday at 6:14 PM"
moment().subtract('days', 1).calendar(); // "Yesterday at 6:14 PM"
moment().calendar(); // "Today at 6:14 PM"
moment().add('days', 1).calendar(); // "Tomorrow at 6:14 PM"
moment().add('days', 3).calendar(); // "Sunday at 6:14 PM"
moment().add('days', 10).calendar(); // "04/06/2014"
```

Another really awesome feature of Moment.js is *time ago* format:

```
moment().add('days', 3).fromNow(); // "in 3 days"
moment().subtract('days', 4).fromNow(); // "4 days ago"
moment('October 2010').fromNow(); // "3 years ago"
```


I have only covered a fraction of what Moment.js can do for you, so I encourage
you to look at [Moment.js Documentation](http://momentjs.com/docs/) to learn
more.

<div class="alert alert-info">
  <i class="fa fa-info-circle"></i>
  Moment.js is one of those universal libraries that works both in Browser
  and Node.js. Everything covered in this guide works exactly the same
  if you were to include Moment.js in HTML.
</div>

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

#### package.json
```
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.5.1",
    "jade": "*",
    "moment": "^2.5.1"
  }
}
```

#### app.js
```
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var moment = require('moment');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  var now = new Date();

  var formattedDate = moment(now).format('MMMM Do YYYY, h:mm:ss a');
  var dayOfWeek = moment(now).format('dddd');
  var hoursAgo = moment().startOf('day').fromNow();
  var timeFromNow = moment().endOf('day').fromNow();
  var calendarTime = moment().subtract('days', 3).calendar();

  res.render('home', {
    rawDate: now,
    formattedDate: formattedDate,
    dayOfWeek: dayOfWeek,
    hoursAgo: hoursAgo,
    timeFromNow: timeFromNow,
    calendarTime: calendarTime
});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

#### layout.jade
```
doctype html
html
  head
    title Formatting Dates
    link(rel='stylesheet', href='//cdnjs.cloudflare.com/ajax/libs/foundation/5.2.1/css/foundation.min.css')
    style.
      body { padding-top: 20px; }
  body
    block content
```

#### home.jade
```
extends layout

block content
  .row
    .columns
      .panel.callout
        h4 Raw Date
        p #{rawDate}
      .panel
        h4 Pretty Formatting
        p #{formattedDate}
      .panel.callout
        h4 Day of Week
        p #{dayOfWeek}
      .panel
        h4 Day began...
        p #{hoursAgo}
      .panel.callout
        h4 Days ends in...
        p #{timeFromNow}
      .panel
        h4 Calendar Time
        p #{calendarTime}
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Moment.js Documentation](http://momentjs.com/docs/)
