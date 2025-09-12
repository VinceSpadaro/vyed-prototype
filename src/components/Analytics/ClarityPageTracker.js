import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ClarityPageTracker - Specifically designed for hash-based routing
 * This component manually tracks React Router changes and sends them to Clarity
 */
export default function ClarityPageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Skip if Clarity isn't available
    if (typeof window === 'undefined' || !window.clarity) return;
    
    try {
      // Get the current path (without the leading slash)
      const path = location.pathname.replace(/^\//, '');
      
      // Log for debugging
      console.log(`React Router path changed: ${path}`);
      
      // Track the page view in Clarity
      window.clarity('set', 'react_router_path', path);
      
      // Send a custom event to Clarity
      window.clarity('event', 'react_router_change', {
        path: path,
        search: location.search,
        hash: location.hash
      });
    } catch (e) {
      // Silently fail
    }
  }, [location]);

  return null;
}
