<script src="http://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.min.js"></script>
<style>
  .twitter-typeahead {
      width: 100%;
      position: relative;
  }
  .twitter-typeahead .tt-input,
  .twitter-typeahead .tt-hint {
      margin-bottom: 0;
      width:100%;
      height: 34px;
      position: absolute;
      top:0;
      left:0;
  }
  .twitter-typeahead .tt-hint {
      color:#a1a1a1;
      z-index: 1;
      padding: 6px 12px;
      border:1px solid transparent;
  }
  .twitter-typeahead .tt-input {
      z-index: 2;
      border-radius: 4px!important;
      /* add these 2 statements if you have an appended input group */
      border-top-right-radius: 0!important;
      border-bottom-right-radius: 0!important;
      /* add these 2 statements if you have an prepended input group */
     /*  border-top-left-radius: 0!important;
      border-bottom-left-radius: 0!important; */
  }

  .tt-dropdown-menu {
      min-width: 160px;
      margin-top: 2px;
      padding: 5px 0;
      background-color: #fff;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,.2);
      *border-right-width: 2px;
      *border-bottom-width: 2px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      -webkit-box-shadow: 0 5px 10px rgba(0,0,0,.2);
      -moz-box-shadow: 0 5px 10px rgba(0,0,0,.2);
      box-shadow: 0 5px 10px rgba(0,0,0,.2);
      -webkit-background-clip: padding-box;
      -moz-background-clip: padding;
      background-clip: padding-box;
  }

  .tt-suggestion {
      display: block;
      padding: 3px 20px;
  }

  .tt-suggestion.tt-is-under-cursor {
      color: #fff;
      background-color: #0081c2;
      background-image: -moz-linear-gradient(top, #0088cc, #0077b3);
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));
      background-image: -webkit-linear-gradient(top, #0088cc, #0077b3);
      background-image: -o-linear-gradient(top, #0088cc, #0077b3);
      background-image: linear-gradient(to bottom, #0088cc, #0077b3);
      background-repeat: repeat-x;
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0)
  }

  .tt-suggestion.tt-is-under-cursor a {
      color: #fff;
  }

  .tt-suggestion p {
      margin: 0;
  }
</style>
<script>
  $('#initialize').click(function() {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $(this).text('Initialized!');
    $(this).prop('disabled', true);

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      source: substringMatcher(states)
    });
  });
</script>

[Typeahead](http://twitter.github.io/typeahead.js/) is better explained using an example than with words.
<div class="row">
  <div class="col-sm-6 col-sm-offset-3">
    <input type="text" class="typeahead form-control" placeholder="States of USA">
    <div class="help-block"></div>
    <button id="initialize" class="btn btn-block btn-success" type="button"><i class="fa fa-code"></i> Initialize</button>
  </div>
</div>
<br>
**Note:** Initialize button is only necessary for this embedded demo to work.
In your app it will be loaded on page load.
<br>

Gone are the old days of having to type something in the text field, click Submit
button and then wait for your results to come back. Companies like LinkedIn,
Google, Facebook and Twitter are already using this feature in their core
products.

In the example above, I am using jQuery-based [Typeahead.js](http://twitter.github.io/typeahead.js/).
But it is not the only library that you can use, there are many variations of it.
For instance, Angular.js users should look into [AngularUI Bootstrap](http://angular-ui.github.io/bootstrap/#/typeahead)
for the Typeahead directive.

I won't list all [Typeahead.js Examples](http://twitter.github.io/typeahead.js/examples/)
here, but I will mention two practical and important features of the library:

#### 1. Prefetch
> Prefetched data is fetched and processed on initialization. If the browser supports local storage, the processed data will be cached there to prevent additional network requests on subsequent page loads.

**Scenario**: You want to load a JSON file from local or remote location, then
run Typeahead on it to get suggestions as you type.

```html
<div id="prefetch">
  <input class="typeahead" type="text" placeholder="Countries">
</div>
```

```javascript
var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 10,
  prefetch: {
    // url points to a json file that contains an array of country names, see
    // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
    url: '../data/countries.json',
    // the json file contains an array of strings, but the Bloodhound
    // suggestion engine expects JavaScript objects so this converts all of
    // those strings
    filter: function(list) {
      return $.map(list, function(country) { return { name: country }; });
    }
  }
});

// kicks off the loading/processing of `local` and `prefetch`
countries.initialize();

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .typeahead').typeahead(null, {
  name: 'countries',
  displayKey: 'name',
  // `ttAdapter` wraps the suggestion engine in an adapter that
  // is compatible with the typeahead jQuery plugin
  source: countries.ttAdapter()
});
```

#### 2. Remote
> Remote data is only used when the data provided by local and prefetch is insufficient. In order to prevent an obscene number of requests being made to the remote endpoint, requests are rate-limited.

**Scenario**: You have a very large data set, fetching all data to get
Typeahead suggestions would be unfeasible, so you would like to get partial
search results as you type.

```html
<div id="remote">
  <input class="typeahead" type="text" placeholder="Oscar winners for Best Picture">
</div>
```

```javascript
var bestPictures = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/films/post_1960.json',
  remote: '../data/films/queries/%QUERY.json'
});

bestPictures.initialize();

$('#remote .typeahead').typeahead(null, {
  name: 'best-pictures',
  displayKey: 'value',
  source: bestPictures.ttAdapter()
});
```

<div class="alert alert-info">
  Typeahead.js doesn't play nicely with Bootstrap 3, take a look at this this GitHub <a href="https://github.com/twitter/typeahead.js/issues/378">issue #378</a>
  for workarounds. Alternatively take a look at the source code of this
  page to see the styles I have used for the demo.
</div>

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [typeahead.js-bootstrap3.less](https://github.com/hyspace/typeahead.js-bootstrap3.less)