It is very important to have a consistent programming style in your code. For one
it shows that you care about your code. Secondly, it is easier to read your code
when everything is consistent. Unlike Python language that has the
[PEP8 Style Guide](http://legacy.python.org/dev/peps/pep-0008/), JavaScript
is divided between the following major style guides:

1. [Google](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
2. [Airbnb <i class="fa fa-star"></i>](https://github.com/airbnb/javascript)
3. [NPM](https://www.npmjs.org/doc/misc/npm-coding-style.html)
4. [jQuery](https://contribute.jquery.org/style-guide/js/)
5. [Douglas Crockford](http://javascript.crockford.com/code.html)
6. [Idiomatic.js](https://github.com/rwaldron/idiomatic.js)

<div class="alert alert-info">
<i class="fa fa-info"></i> Everyone is going to have a different opinion for what is the right style guide.
All that really matters is that you pick one, and stick with it. I will give
my opinion on each style guide below, but take it with a grain of salt, it is only
my opinion, you do not have to agree with me on it.
</div>

#### Google Style Guide
Overall I like this it. It was the first JavaScript style guide that I used. I
don't remember why I stopped using it, maybe the information wasn't laid out as
nicely as Airbnb or Idiomatic.js, but instead hidden behind those annoying
dropdowns. As far as style goes, I tend to agree with most of the points.

#### Airbnb Style Guide
This is my preferred style guide. Information is laid out nicely with DO's and
DON'Ts. There is one thing I disagree with them on: **variables**.

```
// bad
var items = getItems();
var goSportsTeam = true;
var dragonball = 'z';

// good
var items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';
```

I prefer their "bad" approach because I don't have to deal with the mess you create
when swapping or deleting variables. If you want to delete `dragonball` variable,
you have to cut/delete that line, then go up one line to `goSportsTeam` and change comma to semicolon.
Or what if you want to swap `dragonball` with `goSportsTeam`? In my editor
I can do it with `Command + Shift + Up Arrow`, but now I have to change semicolon
on `dragonball` to comma, and do the reverse for `goSportsTeam`. If you are still
not convinced, guess how many steps must you take if you want to remove `items`
variable?

Other than that I really like Airbnb style guide.

#### NPM Style Guide
My least favorite style guide due to their highly annoying "comma-first" usage
and not using semicolons. Whenever I see this code style, I immediately convert it.

```
var a = 1
   , b = "abc"
   , etc
   , somethingElse
```

#### jQuery Style Guide
Despite being one of the most popular style guides, I disagree with them on
spacing, variables (same as Airbnb) and double quotes.

#### Crockford's Style Guide
Another solid style guide, although I would vote in favor of Google and Airbnb
instead. It's probably barely worth mentioning, but I don't like Crockford's use
of a space character between `function` and `()`, e.g.

```
div.onclick = function (e) {
  return false;
};
```

#### Idiomatic.js Style Guide
I have not used this style guide, so there's nothing for me to comment on. In
either case I thought I should list it here considering it's one of the most
popular style guides out there.

#### Conclusion
Once again, there is no right or wrong style guide here. Whichever style you pick is
the right one, as long as you are consistent with it.

On a personal note,
I really wish college professors would encourage following a coding style guide
early in the Computer Science and Computer Engineering curriculum,
especially those starting out with Java and C++.