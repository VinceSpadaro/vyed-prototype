import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const TrackingContext = createContext();

// Clarity script ID for easy reference
const CLARITY_SCRIPT_ID = 'microsoft-clarity-script';
const CLARITY_PROJECT_ID = 't8je7rez7x';

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
        // Create and load the script
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
                window.clarity('identify', userId);
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

  // Functions for loading and removing the Clarity script are now defined inline in the useEffect hook

  // Function to start tracking
  const startTracking = (newUserId, internalTeam = false) => {
    setUserId(newUserId);
    setIsInternalTeam(internalTeam);
    setIsTracking(true);
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
      
      // Remove the script element
      const script = document.getElementById(CLARITY_SCRIPT_ID);
      if (script) {
        script.remove();
        console.log('Clarity script removed');
      }
      
      console.log('Clarity tracking stopped');
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
