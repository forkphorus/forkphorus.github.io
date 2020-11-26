(function() {
  var PLAUSIBLE_API = 'https://stats.turbowarp.org/api/event';
  var PLAUSIBLE_DOMAIN = 'forkphorus.github.io';

  if (location.protocol !== 'http:' && location.protocol !== 'https:') {
    return;
  }

  if (location.origin.indexOf(PLAUSIBLE_DOMAIN) === -1) {
    return;
  }

  if (navigator.doNotTrack === '1') {
    return;
  }

  var referrer = null;
  if (document.referrer) {
    try {
      var url = new URL(document.referrer);
      url.pathname = '';
      referrer = url.href;
    } catch (e) { /* ignore */ }
  }

  var sendEvent = function(eventName) {
    (window.requestIdleCallback || window.setTimeout)(function() {
      var req = new XMLHttpRequest();
      req.open('POST', PLAUSIBLE_API, true);
      req.setRequestHeader('Content-Type', 'text/plain');
      req.send(JSON.stringify({
          n: eventName,
          u: location.href,
          d: PLAUSIBLE_DOMAIN,
          r: referrer,
          w: window.innerWidth,
      }));
    });
  };

  var trackPageview = function() {
    sendEvent('pageview');
  };

  window.addEventListener('hashchange', trackPageview);
  trackPageview();
}());
