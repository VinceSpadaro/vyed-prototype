import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const TrackingContext = createContext();

// Clarity script ID for easy reference
const CLARITY_SCRIPT_ID = 'microsoft-clarity-script';
const CLARITY_PROJECT_ID = 't8je7rez7x';

// Cookie name for Clarity session
const CLARITY_COOKIE_PREFIX = '_clck';
const CLARITY_STORAGE_PREFIX = '_clsk';

// Create provider component
export const TrackingProvider = ({ children }) => {
  // Initialize tracking state from localStorage if available
  const [isTracking, setIsTracking] = useState(() => {
    return localStorage.getItem('clarityTracking') === 'true';
  });
  
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('clarityUserId') || '';
  });
  
  const [isInternalTeam, setIsInternalTeam] = useState(() => {
    return localStorage.getItem('isInternalTeam') === 'true';
  });

  // Update localStorage when tracking state changes
  useEffect(() => {
    if (isTracking) {
      localStorage.setItem('clarityTracking', 'true');
    } else {
      localStorage.removeItem('clarityTracking');
    }
  }, [isTracking]);

  // Update localStorage when user ID changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem('clarityUserId', userId);
    } else {
      localStorage.removeItem('clarityUserId');
    }
  }, [userId]);

  // Update localStorage when internal team status changes
  useEffect(() => {
    if (isInternalTeam) {
      localStorage.setItem('isInternalTeam', 'true');
    } else {
      localStorage.removeItem('isInternalTeam');
    }
  }, [isInternalTeam]);

  // Load Clarity script when tracking is enabled
  useEffect(() => {
    // Function to load the Clarity script
    const loadScript = () => {
      // Check if script already exists
      if (document.getElementById(CLARITY_SCRIPT_ID)) {
        console.log('Clarity script already exists');
        return;
      }

      try {
        // Create and load the Clarity script
        const script = document.createElement('script');
        script.id = CLARITY_SCRIPT_ID;
        script.type = 'text/javascript';
        script.async = true;
        script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
        
        // Add the script to the document
        document.head.appendChild(script);
        console.log('Clarity script added to page');
        
        // Define clarity function if it doesn't exist
        window.clarity = window.clarity || function() { 
          (window.clarity.q = window.clarity.q || []).push(arguments);
        };
        
        // Set user ID after a delay to ensure Clarity is loaded
        if (userId) {
          setTimeout(() => {
            try {
              console.log('Setting Clarity user ID:', userId);
              // Only call identify if clarity is properly initialized
              if (typeof window.clarity === 'function') {
                // Set the user ID for Clarity
                window.clarity('identify', userId);
                
                // Set custom tag to make filtering easier
                window.clarity('set', 'userId', userId);
                
                // Set basic session metadata
                window.clarity('metadata', { 'session_user_id': userId });
                
                // Try to set the session ID directly if available
                if (window.clarity.sessionId) {
                  console.log('Setting Clarity session ID:', userId);
                  window.clarity.sessionId = userId;
                }
              }
            } catch (err) {
              console.error('Error setting Clarity user ID:', err);
            }
          }, 2000);
        }
      } catch (err) {
        console.error('Error loading Clarity script:', err);
      }
    };

    // Function to remove the Clarity script
    const removeScript = () => {
      try {
        // Remove the script element
        const script = document.getElementById(CLARITY_SCRIPT_ID);
        if (script) {
          script.remove();
          console.log('Clarity script removed');
        }
      } catch (err) {
        console.error('Error removing Clarity script:', err);
      }
    };

    if (isTracking && !isInternalTeam) {
      loadScript();
    } else {
      removeScript();
    }
  }, [isTracking, isInternalTeam, userId]);

  // Function to start tracking
  const startTracking = (newUserId, internalTeam = false) => {
    // First, ensure any previous session is completely cleared
    clearClarityData();
    
    // Use exactly the user ID entered in the UI, just trim whitespace
    const exactUserId = newUserId.trim();
    
    // Set state
    setUserId(exactUserId);
    setIsInternalTeam(internalTeam);
    setIsTracking(true);
    
    // Store the values in localStorage
    localStorage.setItem('clarityTracking', 'true');
    localStorage.setItem('clarityUserId', exactUserId);
    if (internalTeam) {
      localStorage.setItem('isInternalTeam', 'true');
    }
    
    // Force a reload to ensure a clean state for the new session
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Helper function to clear Clarity cookies and storage
  const clearClarityData = () => {
    try {
      // Clear Clarity cookies
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(CLARITY_COOKIE_PREFIX)) {
          const cookieName = cookie.split('=')[0];
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          console.log('Cleared Clarity cookie:', cookieName);
        }
      }
      
      // Clear Clarity local storage items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CLARITY_STORAGE_PREFIX)) {
          localStorage.removeItem(key);
          console.log('Cleared Clarity storage item:', key);
        }
      }
      
      // Reset Clarity global variables if they exist
      if (window.clarity) {
        try {
          // Try to stop any ongoing tracking
          if (typeof window.clarity === 'function') {
            window.clarity('stop');
          }
          
          delete window.clarity;
        } catch (e) {
          window.clarity = undefined;
        }
      }
      
      console.log('Cleared Clarity data');
    } catch (err) {
      console.error('Error clearing Clarity data:', err);
    }
  };
  
  // Function to stop tracking
  const stopTracking = () => {
    try {
      // Update state first
      setIsTracking(false);
      setUserId('');
      
      // Clear from localStorage
      localStorage.removeItem('clarityTracking');
      localStorage.removeItem('clarityUserId');
      localStorage.removeItem('isInternalTeam');
      
      // Try to stop Clarity tracking if it's active
      if (window.clarity && typeof window.clarity === 'function') {
        try {
          window.clarity('stop');
          console.log('Clarity tracking stopped via API');
        } catch (e) {
          console.error('Error stopping Clarity via API:', e);
        }
      }
      
      // Clear Clarity cookies and storage
      clearClarityData();
      
      // Remove the script element
      const script = document.getElementById(CLARITY_SCRIPT_ID);
      if (script) {
        script.remove();
        console.log('Clarity script removed');
      }
      
      console.log('Clarity tracking stopped');
      
      // Force a page reload to ensure a clean state
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error('Error stopping Clarity tracking:', err);
    }
  };

  // Value object to be provided to consumers
  const value = {
    isTracking,
    userId,
    isInternalTeam,
    startTracking,
    stopTracking,
    setUserId,
    setIsInternalTeam
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

// Custom hook for using the context
export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export default TrackingContext;
