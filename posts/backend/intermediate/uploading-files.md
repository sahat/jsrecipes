<div class="alert alert-info">
  <h4>When would I use this?</h4>
  You have a web application that allows users to upload files from their
  computer.
</div>

Here is the most minimal looking file upload form. This approach works well if
you just want to upload a file, don't care about styling, and not
interested in displaying a progress bar as file is being uploaded.

![](images/backend/intermediate/uploading-files-1.png)

**index.jade**
```jade
extends layout

block content
  .container
    h4 File Upload
    form(action='/upload', method='POST', enctype='multipart/form-data')
      input(type='file', name='file')
```

**Note:** Don't forget to include `enctype='multipart/form-data'` form attribute
otherwise `req.files` will return `undefined` in your Express route.

In the example above, I am using [Flatly](http://bootswatch.com/flatly/) theme
for Bootstrap, and yet the upload button looks unstyled. Unfortunately there is
no simple way to style an input of `type='file'` without some crazy hacks. If you are
using Bootstrap, there are a few options out there: [Twitter Bootstrap File Input](https://github.com/grevory/bootstrap-file-input),
[Jasny Bootstrap File Input](http://jasny.github.io/bootstrap/javascript/#fileinput)
and [Bootstrap FileStyle](http://markusslima.github.io/bootstrap-filestyle/).

Better yet, let's use [jQuery File Upload](http://blueimp.github.io/jQuery-File-Upload/),
which not only handles the styling, but also the file upload process.
I have used *jQuery File Upload* for one of my projects in the past and it worked really well.

#### jQuery File Upload Features
* **Multiple file upload:**
  Allows to select multiple files at once and upload them simultaneously.
* **Drag & Drop support:**
  Allows to upload files by dragging them from your desktop or filemanager and dropping them on your browser window.
* **Upload progress bar:**
  Shows a progress bar indicating the upload progress for individual files and for all uploads combined.
* **Cancelable uploads:**
  Individual file uploads can be canceled to stop the upload progress.
* **Resumable uploads:**
  Aborted uploads can be resumed with browsers supporting the Blob API.
* **Chunked uploads:**
  Large files can be uploaded in smaller chunks with browsers supporting the Blob API.
* **Client-side image resizing:**
  Images can be automatically resized on client-side with browsers supporting the required JS APIs.
* **Preview images, audio and video:**
  A preview of image, audio and video files can be displayed before uploading with browsers supporting the required APIs.
* **No browser plugins (e.g. Adobe Flash) required:**
  The implementation is based on open standards like HTML5 and JavaScript and requires no additional browser plugins.
* **Graceful fallback for legacy browsers:**
  Uploads files via XMLHttpRequests if supported and uses iframes as fallback for legacy browsers.
* **HTML file upload form fallback:**
  Allows progressive enhancement by using a standard HTML file upload form as widget element.
* **Cross-site file uploads:**
  Supports uploading files to a different domain with cross-site XMLHttpRequests or iframe redirects.
* **Multiple plugin instances:**
  Allows to use multiple plugin instances on the same webpage.
* **Customizable and extensible:**
  Provides an API to set individual options and define callBack methods for various upload events.
* **Multipart and file contents stream uploads:**
  Files can be uploaded as standard "multipart/form-data" or file contents stream (HTTP PUT file upload).
* **Compatible with any server-side application platform:**
  Works with any server-side platform (PHP, Python, Ruby on Rails, Java, Node.js, Go etc.) that supports standard HTML form file uploads.

Here, I am not using a form anymore. As soon as you select a file or multiple files,
upload process begins immediately. That's why there is no need to click on *Submit* button.
But if that's what you want, then take a look at [How to start uploads with a button click](https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin#how-to-start-uploads-with-a-button-click).

**index.jade**
```jade
extends layout

block content
  .container
    span.btn.btn-success.fileinput-button
      span + Upload Files
      input#fileupload(type='file', name='file', data-url='/upload', multiple)
    br
    br
    .progress.progress-striped.active
      .progress-bar.progress-bar-success
```
**Note:** The `.fileinput-button` class is provided by **jquery.fileupload.css**.

All dependencies below are already included in the zip file when you download
[jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload/tags),
but to make it easier for the readers to copy and paste
examples I am using CDN links for all external libraries and stylesheets.

**layout.jade**
```jade
doctype html
html
  head
    title Uploading Files
    link(rel='stylesheet', href='http://bootswatch.com/flatly/bootstrap.min.css')
    link(rel='stylesheet', href='/stylesheets/jquery.fileupload.css')
    style.
      body { padding-top: 50px; }
  body
    block content

    script(src='//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js')
    script(src='//cdn.jsdelivr.net/jquery.fileupload/9.5.2/js/vendor/jquery.ui.widget.js')
    script(src='//cdn.jsdelivr.net/jquery.fileupload/9.5.2/js/jquery.fileupload.js')
    script(src='/javascripts/main.js')
```

Before you can use *jQuery File Upload*, you have to initialize it first:
`$('#fileupload').fileupload()`, but this library can do so much more.
Below I initialize it and define two callback handlers in one step:

 - **done**: called when each file is uploaded. If you select 3 files, then
 *File has been uploaded* message will be printed to console three times.

 - **progressall**: called per each data chunk of uploaded files. Each time it
 is called, progress bar is updated. As its name implies, **progressall**
 handles *overall* progress. For individual progress events use **progress** callback.
 Here is the [list](https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progress)
 of all callback options.


**main.js**
```javascript
$('#fileupload').fileupload({
  done: function(event, data) {
    console.log('File has been uploaded');
  },
  progressall: function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
    $('.progress-bar').css('width', progress + '%');
  }
});
```

![](images/backend/intermediate/uploading-files-2.png)


Notice that input has `data-url='/upload'` attribute. When you select a file,
*jQuery File Upload* will send a POST request to `/upload` with incoming file data.
If you ommit `data-url` attribute, then POST request will be sent to `/`.

Before creating a new POST route, make sure you have included `multipart` middleware.
Also, while you're at it create a new `uploads` folder in the project directory.

```javascript
app.use(express.multipart({ uploadDir: __dirname + '/uploads', limit: '50mb' }));
```

Here is the Express route to handle `POST /upload` requests sent by *jQuery File Upload*.
It doesn't do much since `multipart` middleware is doing most of the work. Although
strictly speaking you can still upload files without this route,
you need it in order to avoid avoid `POST /upload 404` errors.
Besides, if you don't return `200 OK`, **done** callback on `fileupload` will
never be called. Furthermore this is where you would remove temporarily uploaded
files before sending them off to Amazon S3 for permanent storage.

```javascript
app.post('/upload', function(req, res) {
  console.log(req.files.file.name + ' has been uploaded');
  res.send(200);
});
```

From within your `/upload` route you can also get plenty of useful information
regarding that particular file:

![](images/backend/intermediate/uploading-files-3.png)

Typically, you wouldn't upload a file and just leave it there, in fact be careful
when you are uploading large files as you may hit the file storage limit
specified by your hosting provider. Instead you might upload that file to
Amazon S3 via [aws-sdk](http://aws.amazon.com/sdkfornodejs/) for Node.js, then
then delete uploaded files from your `/uploads` directory.

```javascript
app.post('/upload', function(req, res) {
  console.log(req.files.file.name + ' has been uploaded');

  // Do something with file here:
  // Save file metadata to database
  // Upload file to Amazon S3

  fs.unlink(req.files.userFile.path, function(err) {
    console.log(req.files.userFile.name + ' has been deleted');
  });
});
```

**Note:** To get a relative path of uploaded files use `req.files.file.split('/').slice(-2).join('/')`
to get `uploads/13176-vb5sb9.zip` instead of a full path.

That's all there is to basic file uploading in Node.js. For more advanced usage check out
[jQuery File Upload Documentation](https://github.com/blueimp/jQuery-File-Upload/wiki).
<div class="alert alert-success">
You might be wondering: "Do I really need a separate library for a simple file upload?"
The answer is no, you can certainly craft your own <strong>XMLHttpRequest</strong> and
<strong>FormData</strong> and send files that way, but that's a lot of "low-level" code.
In contrast, <em>jQuery File Upload</em> makes uploading files a breeze.
Also, by using this new <strong>XMLHttpRequest</strong> you are restricting your users to IE10+, Firefox 4.0+,
Chrome 7.0+, Safari 5+ and Opera 12+. If you are still interested, check out links below.
</div>

### <i class="fa fa-code text-danger"></i> Source Code
<hr>

**app.js**
```javascript
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart({ uploadDir: __dirname + '/uploads', limit: '50mb' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/upload', function(req, res) {
  console.log(req.files.file.name + ' has been uploaded');
  res.send(200);
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
```

**layout.jade**
```jade
doctype html
html
  head
    title Uploading Files
    link(rel='stylesheet', href='http://bootswatch.com/flatly/bootstrap.min.css')
    link(rel='stylesheet', href='//cdn.jsdelivr.net/jquery.fileupload/9.5.2/css/jquery.fileupload.css')
    style.
      body { padding-top: 50px; }
  body
    block content

    script(src='//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js')
    script(src='//cdn.jsdelivr.net/jquery.fileupload/9.5.2/js/vendor/jquery.ui.widget.js')
    script(src='//cdn.jsdelivr.net/jquery.fileupload/9.5.2/js/jquery.fileupload.js')
    script(src='/javascripts/main.js')
```

**index.jade**
```jade
extends layout

block content
  .container
    span.btn.btn-success.fileinput-button
      span + Upload Files
      input#fileupload(type='file', name='file', data-url='/upload', multiple)
    br
    br
    .progress.progress-striped.active
      .progress-bar.progress-bar-success
```

<hr>
#### <i class="fa fa-lightbulb-o text-danger"></i> Additional Resources

1. [jQuery File Upload Events](https://github.com/blueimp/jQuery-File-Upload/wiki/Options#callback-options)
2. [Uploading Files with AJAX](http://blog.teamtreehouse.com/uploading-files-ajax)
3. [How can I upload files asynchronously with jQuery?](http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously-with-jquery)
