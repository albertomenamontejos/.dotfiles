window.addEventListener(
  'load',
  function () {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-38364958-1']);
    _gaq.push(['_trackPageview']);

    (function () {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      if (s == null) {
        console.warn('script element not found');
      } else {
        s.parentNode.insertBefore(ga, s);
      }
    })();
  },
  false
);
