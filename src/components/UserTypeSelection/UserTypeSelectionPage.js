import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { useTracking } from '../../context/TrackingContext';
import RadioButton from '../FormElements/RadioButton';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #0b0c0c;
`;

// Removed unused styled components

const FieldsetStyled = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const Legend = styled.legend`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #0b0c0c;
`;

const RadioGroup = styled.div`
  padding-left: 5px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
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

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

const TrackingSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #b1b4b6;
`;

const Button = styled.button`
  background-color: #00703c;
  color: white;
  font-size: 19px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #005a30;
  }
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const ErrorMessage = styled.div`
  color: #d4351c;
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
`;

const UserTypeSelectionPage = () => {
  const navigate = useNavigate();
  const { setUserType, setOrganisationName } = useUserType();
  const { startTracking } = useTracking();
  
  const [selectedType, setSelectedType] = useState('');
  const [userId, setUserId] = useState('');
  const [isInternalTeam, setIsInternalTeam] = useState(false);
  const [errors, setErrors] = useState({ userType: false, userId: false });

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
      userId: !isInternalTeam && !userId
    };
    
    setErrors(newErrors);
    
    // If no errors, save and redirect to insights page
    if (!newErrors.userType && (!newErrors.userId || isInternalTeam)) {
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
      
      // Start tracking if user ID is provided and not internal team
      if (userId && !isInternalTeam) {
        startTracking(userId, false);
      } else if (isInternalTeam) {
        // For internal team, we still track the session but mark it as internal
        startTracking('internal-team', true);
      }
      
      navigate('/insights');
    }
  };

  return (
    <Container>
      <Title>Select your organisation type</Title>
      
      <form onSubmit={handleSubmit}>
        <FieldsetStyled>
          <Legend>What type of organisation are you?</Legend>
          {errors.userType && (
            <ErrorMessage>Please select an organisation type</ErrorMessage>
          )}
          <RadioGroup>
            <RadioButton
              id="school"
              name="userType"
              value="school"
              checked={selectedType === 'school'}
              onChange={handleTypeChange}
              label="School"
            />
            <RadioButton
              id="localAuthority"
              name="userType"
              value="localAuthority"
              checked={selectedType === 'localAuthority'}
              onChange={handleTypeChange}
              label="Local Authority"
            />
            <RadioButton
              id="trust"
              name="userType"
              value="trust"
              checked={selectedType === 'trust'}
              onChange={handleTypeChange}
              label="Trust"
            />
          </RadioGroup>
        </FieldsetStyled>
        
        <TrackingSection>
          <Legend>Usability testing session</Legend>
          
          <InputGroup>
            <InputLabel htmlFor="userId">User ID for tracking (required for usability testing)</InputLabel>
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
          
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              id="internalTeam" 
              name="internalTeam" 
              checked={isInternalTeam} 
              onChange={handleInternalTeamChange} 
            />
            I am an internal team member (no tracking)
          </CheckboxLabel>
        </TrackingSection>
        
        <Button type="submit">Continue</Button>
      </form>
    </Container>
  );
};

export default UserTypeSelectionPage;
