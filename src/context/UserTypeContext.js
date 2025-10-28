import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserTypeContext = createContext();

// Create provider component
export const UserTypeProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [userType, setUserType] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType || '';
  });
  
  const [organisationName, setOrganisationName] = useState(() => {
    const savedOrgName = localStorage.getItem('organisationName');
    return savedOrgName || '';
  });

  // Add viewing context to track if user is viewing school or LA/Trust level
  const [viewingContext, setViewingContext] = useState(() => {
    const savedContext = sessionStorage.getItem('viewingContext');
    return savedContext || '';
  });

  // Add selected school name for when LA/Trust users view a specific school
  const [selectedSchoolName, setSelectedSchoolName] = useState(() => {
    const savedSchoolName = sessionStorage.getItem('selectedSchoolName');
    return savedSchoolName || '';
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [userType]);

  useEffect(() => {
    if (organisationName) {
      localStorage.setItem('organisationName', organisationName);
    } else {
      localStorage.removeItem('organisationName');
    }
  }, [organisationName]);

  useEffect(() => {
    if (viewingContext) {
      sessionStorage.setItem('viewingContext', viewingContext);
    } else {
      sessionStorage.removeItem('viewingContext');
    }
  }, [viewingContext]);

  useEffect(() => {
    if (selectedSchoolName) {
      sessionStorage.setItem('selectedSchoolName', selectedSchoolName);
    } else {
      sessionStorage.removeItem('selectedSchoolName');
    }
  }, [selectedSchoolName]);

  // Function to clear user type selection
  const clearUserType = () => {
    setUserType('');
    setOrganisationName('');
    setViewingContext('');
    setSelectedSchoolName('');
    localStorage.removeItem('userType');
    localStorage.removeItem('organisationName');
    sessionStorage.removeItem('viewingContext');
    sessionStorage.removeItem('selectedSchoolName');
  };

  // Get the effective user type for display (viewing context overrides actual user type)
  const getEffectiveUserType = () => {
    return viewingContext || userType;
  };

  // Value object to be provided to consumers
  const value = {
    userType,
    setUserType,
    organisationName,
    setOrganisationName,
    viewingContext,
    setViewingContext,
    selectedSchoolName,
    setSelectedSchoolName,
    clearUserType,
    getEffectiveUserType,
    hasUserTypeSelected: !!userType && !!organisationName
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};

// Custom hook for using the context
export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};

export default UserTypeContext;
