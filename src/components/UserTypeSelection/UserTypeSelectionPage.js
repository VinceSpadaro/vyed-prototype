import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
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
  
  const [selectedType, setSelectedType] = useState('');
  const [errors, setErrors] = useState({ userType: false });

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setErrors({ userType: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      userType: !selectedType
    };
    
    setErrors(newErrors);
    
    // If no errors, save and redirect to insights page
    if (!newErrors.userType) {
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
        
        
        <Button type="submit">Continue</Button>
      </form>
    </Container>
  );
};

export default UserTypeSelectionPage;
