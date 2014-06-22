#### What is WebStorm?

[WebStorm](http://www.jetbrains.com/webstorm/) is a modern JavaScript IDE
developed by JetBrains. Unlike Vim, you don't have to spend months learning the tool to be
productive. Simply opening your project in WebStorm instantly makes you far
more productive than any other text editor thanks to auto-completion,
smart inspections that can detect dead code, syntax errors, unreachable code,
references to local files that don't exist (likely due to misspelling).

Let me get something out of the way first. If you use Vim that's okay,
stick with it. If you use Sublime Text, that's alright too. Use
whichever tool that makes you more productive. That's all that matters at the
end of the day.

#### 1. Create a `<script>` tag with `src` attribute
If you have used WebStorm then you are probably aware of built-in Emmet snippets and
live templates. For example you can type `link`, press <kbd>Tab</kbd> and it will expand into:

```html
<link rel="stylesheet" href=""/>
```

For the longest time I didn't know (and never bothered to look it up) how to create
a `<script>` tag with `src` attribute. Here is what I mean: type `script`, press <kbd>Tab</kbd> and
it will expand into:

```html
<script></script>
```

That's not what I wanted! So I end up manually typing `src="insert url here"` for
each script. That gets mildly annoying after doing it so many times.

It turns out there is a snippet named `script:src`. It expands into exactly
what you might expect:

```html
<script src=""></script>
```

#### 2. Create a new file that doesn't exist yet
Let's suppose for a moment you are working on a new project. You don't have any
styles yet, so inside **index.html** you add:

```
<link rel="stylesheet" href="css/style.css">
```

WebStorm will immediately tell you that **style.css** does not exist. If your place
a cursor over *css* in `css/style.css` and press <kbd>Alt</kbd> + <kbd>Enter</kbd>, it will prompt
you to create `css` directory. After doing that the yellow highlight will go away from
`css`, meaning there are no problems. Now move your cursor to *style.css*, press
<kbd>Alt</kbd> + <kbd>Enter</kbd> and it will prompt you to create `style.css` file inside `css` folder.
I think that's pretty neat!

![](images/general/webstorm-ide-tips-1.png)

#### 3. Reformat Code

When you are working on code in a team, unfortunately not everyone follows the
same code style. This is especially true for open-source GitHub projects. There
is an easy way to fix.


To reformat code press <kbd>Alt</kbd> + <kbd>Command</kbd> + <kbd>L</kbd>, it will format your code according to
the code style defined in **Preferences > Code Style**.

![](images/general/webstorm-ide-tips-2.png)

#### 4. Useful Keyboard Shortcuts

<table class="table table-hover table-condensed">
  <thead>
    <tr class="inverse">
      <th>Shortcut</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Control + Tab</td>
      <td>Switch between the tool windows and files opened in the editor.</td>
    </tr>
    <tr>
      <td><strong>Alt + Enter</strong></td>
      <td>Show the list of available intention actions.</td>
    </tr>
    <tr>
      <td>Alt + Command + J</td>
      <td>Surround with a live template.</td>
    </tr>
    <tr>
      <td>Command + /</td>
      <td>Comment or uncomment a line or fragment of code.</td>
    </tr>
    <tr>
      <td>Command + D</td>
      <td>Duplicate the current line or selection.</td>
    </tr>
    <tr>
      <td>Alt + Up/Down</td>
      <td>Incremental selection.</td>
    </tr>
  </tbody>
</table>

#### 5. CSS Auto-completion and Auto-suggestions
I was trying to convert an image icon to Base64 using this [Base64 Converter](http://webcodertools.com/imagetobase64converter).
I coped the `background-image` source code and pasted into my stylesheet. If
you just paste that code, image will be repeated in all directions. Obviously
that's not what I wanted. I then start typing `background-repeat:`, but I forgot
the exact syntax to prevent background image from repeating. Thankfully,
WebStorm can display auto-completion popup with <kbd>Control</kbd> + <kbd>Space</kbd>.

![](images/general/webstorm-ide-tips-3.png)

After I added `background-repeat` and `background-position` properties, WebStorm
highlighted all those properties with a squiggly line, suggesting me to merge
them into a single `background` property.

![](images/general/webstorm-ide-tips-4.png)



<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [WebStorm Tricks and Tips by John Lindquist (55min screencast)](https://www.youtube.com/watch?v=leKbqNpgoNQ)
