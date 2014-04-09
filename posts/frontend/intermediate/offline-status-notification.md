<link rel="stylesheet" href="http://github.hubspot.com/offline/themes/offline-theme-default.css">
<script>
(function() {
    var script = document.createElement('script');
    script.onload = function() {
      Offline.options = {
        checkOnLoad: true
      };
      Offline.on('confirmed-up', function() {
        $('.alert-danger').fadeOut();
        $('.alert-success').fadeIn();
      });
      Offline.on('confirmed-down', function() {
        $('.alert-success').fadeOut();
        $('.alert-danger').fadeIn();
      });
    }
    document.body.appendChild(script);
    script.src = 'http://github.hubspot.com/offline/offline.min.js';
})();
</script>

To test this demo, turn off your WiFi and you will see a different status
message.

<div class="alert alert-success" style="display: none">
  You are connected to the internet.
</div>

<div class="alert alert-danger" style="display: none">
  You lost connection to the internet.
</div>

Here is a source code behind this very simple demo:
```script
// Options
Offline.options = {
  checkOnLoad: true
};
// Events
Offline.on('confirmed-up', function() {
  $('.alert-danger').fadeOut();
  $('.alert-success').fadeIn();
});
Offline.on('confirmed-down', function() {
  $('.alert-success').fadeOut();
  $('.alert-danger').fadeIn();
});
}
```

<div class="alert alert-warning">
  Full guide coming in May 2014. For now please refer to
  <a href="http://github.hubspot.com/offline/">Offline.js Documentation</a>.
</div>