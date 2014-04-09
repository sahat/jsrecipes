<script>
(function() {
    var script = document.createElement('script');
    script.onload = function() {
      Mousetrap.bind('1', function() {
        $('.btn-group .btn').removeClass('active');
        $('#one').addClass('active');
      });
      Mousetrap.bind('2', function() {
        $('.btn-group .btn').removeClass('active');
        $('#two').addClass('active');
      });
      Mousetrap.bind('3', function() {
        $('.btn-group .btn').removeClass('active');
        $('#three').addClass('active');
      });
      Mousetrap.bind('4', function() {
        $('.btn-group .btn').removeClass('active');
        $('#four').addClass('active');
      });
    }
    document.body.appendChild(script);
    script.src = 'http://cdn.craig.is/js/mousetrap/mousetrap.js';
})();
</script>

<div class="alert alert-info">
  <h4>When would I use this?</h4>
  Keyboard shortcuts in a web application can sometimes dramatically improve
  user experience. A perfect use case for keyboard shortcuts interaction
   would be single page applications like Gmail, Cloud9 IDE , JSFiddle.
</div>

<img src="http://cdn.craig.is/img/mousetrap.svg">

#### <i class="fa fa-magic text-danger"></i> Quick Demo
Press any number (1-4) on your keyboard.

<div class="btn-toolbar" role="toolbar" style="margin: 0;">
  <div class="btn-group">
    <button type="button" id="one" class="btn btn-default">1</button>
    <button type="button" id="two" class="btn btn-default">2</button>
    <button type="button" id="three" class="btn btn-default">3</button>
    <button type="button" id="four" class="btn btn-default">4</button>
  </div>
</div>

<br>

<div class="alert alert-warning">
  Full guide coming in May 2014. Meanwhile, refer to <a href="http://craig.is/killing/mice">Mousetrap</a>
  documentation.
</div>