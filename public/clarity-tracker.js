// Extremely minimal Clarity SPA tracking
(function() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Track hash changes (for hash-based routing)
  window.addEventListener('hashchange', function() {
    console.log('Hash changed: ' + window.location.hash);
  });
  
  // Track browser back/forward navigation
  window.addEventListener('popstate', function() {
    console.log('Navigation: ' + window.location.pathname);
  });
})();
