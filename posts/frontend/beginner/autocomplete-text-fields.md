

[Typeahead](http://twitter.github.io/typeahead.js/) is better explained using an example.

<iframe width="100%" height="300" src="http://jsfiddle.net/sahat/9gT9M/2/embedded/result,js,html,css,resources" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

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

If you are just using plain jQuery, Twitter's [Typeahead.js](http://twitter.github.io/typeahead.js/)
is probably your best bet. If on the other hand you are using an MV* framework or library
like Backbone, React, Ember, then you should try searching Google for `<Name of your framework> typeahead`,
I am almost certain there is already a library for that.