import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Minimal ClarityPageTracker that just logs page changes
 * No direct Clarity calls to avoid errors
 */
export default function ClarityPageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Just log the page change for debugging
    console.log(`Page changed: ${location.pathname}`);
  }, [location]);

  return null;
}
