import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { useTracking } from '../../context/TrackingContext';
import RadioButton from '../FormElements/RadioButton';
import { Checkbox } from '../FormElements';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContentCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;


const Title = styled.h1`
  margin: 0 0 20px 0;
  color: #0b0c0c;
  font-size: 28px;
  text-align: left;
`;

// Removed unused styled components

const FieldsetStyled = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 30px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Legend = styled.legend`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #0b0c0c;
  display: block;
  width: 100%;
  padding: 0;
`;

const RadioGroup = styled.div`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0b0c0c;
`;

const TextInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #0b0c0c;
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const TrackingSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #b1b4b6;
`;

const SubmitButton = styled.button`
  padding: 14px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background 0.3s;

  &:hover {
    background: #5568d3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #b1b4b6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #d4351c;
  background-color: #fef7f6;
  font-weight: bold;
  margin: 10px 0 15px 0;
  font-size: 16px;
  padding: 12px 15px;
  border-radius: 4px;
  border-left: 4px solid #d4351c;
`;

const UserTypeSelectionPage = () => {
  const navigate = useNavigate();
  const { userType, setUserType, setOrganisationName, hasUserTypeSelected } = useUserType();
  const { startTracking, isTracking } = useTracking();
  
  // Track if user is changing organization - used in useEffect and handleSubmit
  
  // Only show tracking options for new users, not when changing organization
  const [showTrackingOptions, setShowTrackingOptions] = useState(false);
  
  // Initialize selected type with current user type if available
  const [selectedType, setSelectedType] = useState('');
  const [userId, setUserId] = useState('');
  const [isInternalTeam, setIsInternalTeam] = useState(false);
  const [errors, setErrors] = useState({ userType: false, userId: false });
  
  // Check if user is changing organization or a new user
  useEffect(() => {
    if (hasUserTypeSelected) {
      // User is changing organization
      // Pre-select the current user type
      setSelectedType(userType);
      
      // Never show tracking options when changing organization
      setShowTrackingOptions(false);
    } else {
      // New user, not changing organization
      // Show tracking options for new users
      setShowTrackingOptions(true);
    }
  }, [hasUserTypeSelected, userType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setErrors({ ...errors, userType: false });
  };
  
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setErrors({ ...errors, userId: false });
  };
  
  const handleInternalTeamChange = (e) => {
    setIsInternalTeam(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      userType: !selectedType,
      // Only validate userId if showing tracking options
      userId: showTrackingOptions && !isInternalTeam && !userId
    };
    
    setErrors(newErrors);
    
    // If no errors, save and redirect to tools page
    if (!newErrors.userType && (!newErrors.userId || !showTrackingOptions || isInternalTeam)) {
      // Set default organization name based on user type
      let orgName = '';
      if (selectedType === 'school') {
        orgName = 'VYED TEAM (UKPRN 90000218)';
      } else if (selectedType === 'localAuthority') {
        orgName = 'Example Local Authority';
      } else if (selectedType === 'trust') {
        orgName = 'Example Trust';
      }
      
      setUserType(selectedType);
      setOrganisationName(orgName);
      
      // Only start tracking for new users with tracking options enabled
      if (showTrackingOptions) {
        // Start tracking if user ID is provided and not internal team
        if (!isInternalTeam && userId) {
          // Format the user ID to ensure it's properly tracked
          const formattedUserId = userId.trim();
          console.log('Starting tracking with user ID:', formattedUserId);
          startTracking(formattedUserId, false);
        } else if (isInternalTeam) {
          // For internal team, we still initialize tracking but mark it as internal
          console.log('Starting internal team session (no tracking)');
          startTracking('internal-team', true);
        }
      }
      // If already tracking and changing organization, maintain the tracking session
      
      // Redirect based on user type
      if (selectedType === 'localAuthority' || selectedType === 'trust') {
        navigate('/schools-list');
      } else {
        navigate('/tools');
      }
    }
  };

  const handleBackClick = () => {
    // Navigate back to the tools page if user has a selected type
    if (hasUserTypeSelected) {
      navigate('/tools');
    }
  };
  
  return (
    <Container>
      <ContentCard>
        <Title>Select your organisation type</Title>
        
        <form onSubmit={handleSubmit}>
          <FieldsetStyled>
            <Legend>What type of organisation are you?</Legend>
          {errors.userType && (
            <ErrorMessage>Please select an organisation type</ErrorMessage>
          )}
          <RadioGroup>
            <RadioButton
                id="user-type-school"
                name="user-type"
                value="school"
                checked={selectedType === 'school'}
                onChange={handleTypeChange}
                label="School"
                labelStyle={{ color: 'black' }}
              />
            <RadioButton
                id="user-type-la"
                name="user-type"
                value="localAuthority"
                checked={selectedType === 'localAuthority'}
                onChange={handleTypeChange}
                label="Local Authority"
                labelStyle={{ color: 'black' }}
              />
            <RadioButton
                id="user-type-trust"
                name="user-type"
                value="trust"
                checked={selectedType === 'trust'}
                onChange={handleTypeChange}
                label="Trust"
                labelStyle={{ color: 'black' }}
              />
          </RadioGroup>
        </FieldsetStyled>
        
        {showTrackingOptions && (
          <TrackingSection>
            <Legend>Usability testing session</Legend>
            
            <InputGroup>
              <StyledLabel htmlFor="userId">User ID for tracking (required for usability testing)</StyledLabel>
              <TextInput 
                id="userId" 
                name="userId" 
                value={userId} 
                onChange={handleUserIdChange} 
                placeholder="Enter user ID for this session"
                disabled={isInternalTeam}
              />
              {errors.userId && (
                <ErrorMessage>Please enter a user ID for tracking or select internal team</ErrorMessage>
              )}
            </InputGroup>
            
            <Checkbox
              id="internal-team"
              checked={isInternalTeam}
              onChange={handleInternalTeamChange}
              label="I am a member of the internal team"
              labelStyle={{ color: 'black' }}
            />
          </TrackingSection>
        )}
        
        <SubmitButton type="submit">Continue</SubmitButton>
      </form>
    </ContentCard>
  </Container>
  );
};

export default UserTypeSelectionPage;
