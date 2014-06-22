JavaScript lacks complete string manipulation operations. This an attempt to fill that gap. List of build-in methods can be found for example from Dive Into JavaScript.

### <i class="fa fa-text-height text-danger"></i> Case

[Case](https://github.com/nbubna/Case) is a string utility library that lets
you perform all sorts of string manipulations.

The use case of this library will largely depend on the application itself.
In my scenario of the Senior Design project, when I upload a file of this
form - **readQR.cpp**,  **cs342-hw1.pdf** or **redis_book.pdf**, I need
to split the filename into individual keywords so that I could store those keywords
in database and later search these files by keywords. For example I could
just type *hw1* and it would return me the file **cs342-hw1.pdf**.

#### Example Usage

```javascript
Case.upper('foo_bar')                       -> 'FOO BAR'
Case.lower('fooBar')                        -> 'foo bar'
Case.snake('Foo bar!')                      -> 'foo_bar'
Case.squish('foo.bar')                      -> 'FooBar'
Case.camel('foo, bar')                      -> 'fooBar'
Case.constant('Foo-Bar')                    -> 'FOO_BAR'
Case.title('foo v. bar')                    -> 'Foo v. Bar'
Case.capital('foo_v_bar')                   -> 'Foo V Bar'
Case.sentence('"foo!" said bar', ['Bar'])   -> '"Foo!" said Bar'
```

Another useful method is `of`. With it you can actually identify the case of a
given string. When processing uploaded files, you could use this as a first step
in helping you to identify the string case, and only then proceed to string case
manipulations such as *camel*, *snake*, etc.

```javascript
Case.of('foo')          -> 'lower'
Case.of('foo_bar')      -> 'snake'
Case.of('Foo v Bar')    -> 'title'
Case.of('foo_ Bar')     -> undefined
```

### <i class="fa fa-terminal text-danger"></i> underscore.string

[Underscore.string](https://github.com/epeli/underscore.string) is another popular
library for string manipulation.

**Note:** As an alternative, take a look at [string.js](http://stringjs.com/). There
is a lot of overlap between the two libraries, but since I only have experience
with underscore.string, that's what I will cover here.

I will not list every single API function here, only the ones I find really useful
from my experience of building web apps.

#### <i class="fa fa-code text-danger"></i> String Functions

**_.clean(str)** Compress some whitespaces to one.

**Real-world Example:** If you have a textarea that takes user's message, this
would be a great place to strip down unnecessary spaces before, after and
even *between* strings.

```javascript
_.clean(" foo    bar   ")
=> 'foo bar'
```

**_.count(string, substring)** Counts the number of substrings in a string.

```javascript
_('Hello world').count('o')
=> 2
```

**_.humanize(string)** Converts an underscored, camelized, or dasherized string
into a humanized one. Also removes beginning and ending whitespace.

```javascript
_('  capitalize dash-CamelCase_underscore trim  ').humanize()
=> 'Capitalize dash camel case underscore trim'
```

**_.truncate(string, length, truncateString)** Truncate a string after *n* characters.

```javascript
_('Hello world').truncate(5)
=> 'Hello...'
```

**_.toSentence(array, [delimiter, lastDelimiter])** Join an array into a human readable sentence.

```javascript
_.toSentence(['jQuery', 'Mootools', 'Prototype'])
=> 'jQuery, Mootools and Prototype';

_.toSentence(['jQuery', 'Mootools', 'Prototype'], ', ', ' unt ')
=> 'jQuery, Mootools unt Prototype';
```

**_.surround(string, wrap)** Surround a string with another string.

```javascript
_.surround("foo", "ab")
=> 'abfooab';
```

**_.slugify(string)** Transform text into a URL slug.
Replaces whitespaces, accentuated, and special characters with a dash.

```javascript
_.slugify("Un éléphant à l'orée du bois")
=> 'un-elephant-a-loree-du-bois';
```
**Real-world Example:** Consider this website for example. The post you are
reading right now is titled *String Manipulation*, but I can't use that
string for URL (well, technically I could, but it would look pretty ugly as *String%20Manipulation*).
Instead I use the sluggified version - *string-manipulation*,
which works really nicely in browsers. No matter how weird or complex a title
may be, sluggified string would always be simple and contain only dashes instead
of punctuation and special characters.


<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [Full List of String Functions in underscore.string](https://github.com/epeli/underscore.string#string-functions)
