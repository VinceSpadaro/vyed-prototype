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

  // Function to clear user type selection
  const clearUserType = () => {
    setUserType('');
    setOrganisationName('');
    localStorage.removeItem('userType');
    localStorage.removeItem('organisationName');
  };

  // Value object to be provided to consumers
  const value = {
    userType,
    setUserType,
    organisationName,
    setOrganisationName,
    clearUserType,
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
