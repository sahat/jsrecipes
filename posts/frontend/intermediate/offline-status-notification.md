<link rel="stylesheet" href="http://github.hubspot.com/offline/themes/offline-theme-default.css">
<script>
(function() {
    var script = document.createElement('script');
    script.onload = function() {
      Offline.options = {
        checkOnLoad: true
      };
      Offline.on('confirmed-up', function() {
        $('.alert-success').fadeIn();
      });
      Offline.on('confirmed-down', function() {
        $('.alert-danger').fadeIn();
      });
    }
    document.body.appendChild(script);
    script.src = 'http://github.hubspot.com/offline/offline.min.js';
})();
</script>

<div class="alert alert-success" style="display: none">
  You are connected to the internet.
</div>

<div class="alert alert-danger" style="display: none">
  You lost connection to the internet.
</div>
