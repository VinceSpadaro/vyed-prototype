import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { useTracking } from '../../context/TrackingContext';

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

// BackLink removed as it's no longer needed

const Card = styled.div`
  border: 1px solid #b1b4b6;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #f8f8f8;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #0b0c0c;
`;

const CardText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#00703c' : props.danger ? '#d32f2f' : '#1d70b8'};
  color: white;
  font-size: 19px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.primary ? '#005a30' : props.danger ? '#aa2424' : '#155fa3'};
  }
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const TrackingStatus = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: ${props => props.active ? '#e6f5eb' : '#f3f2f1'};
  border-left: 5px solid ${props => props.active ? '#00703c' : '#505a5f'};
`;

const SignOutPage = () => {
  const navigate = useNavigate();
  const { clearUserType } = useUserType();
  const { isTracking, userId, isInternalTeam, stopTracking } = useTracking();
  
  const handleBackToDashboard = () => {
    navigate('/insights');
  };
  
  // Combined function to sign out and stop tracking if active
  const handleSignOut = () => {
    // If tracking is active, stop it before signing out
    if (isTracking) {
      stopTracking();
    }
    
    // Clear user type and navigate to selection page
    clearUserType();
    navigate('/select-user-type');
  };
  
  return (
    <Container>
      <Title>Sign out</Title>
      
      <Card>
        <CardTitle>Are you sure you want to sign out?</CardTitle>
        <CardText>
          You will be returned to the organisation selection screen.
        </CardText>
        
        {isTracking && (
          <TrackingStatus active={!isInternalTeam}>
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>
              {isInternalTeam 
                ? 'Internal team session is active.' 
                : `Recording session with User ID: ${userId} is active.`}
            </p>
            <p style={{ fontSize: '14px', marginBottom: '10px', color: '#505a5f' }}>
              Signing out will end the current session.
            </p>
          </TrackingStatus>
        )}
        
        <ButtonGroup>
          <Button primary onClick={handleBackToDashboard}>
            Cancel
          </Button>
          <Button onClick={handleSignOut}>
            Sign out
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default SignOutPage;
