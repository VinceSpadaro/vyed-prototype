import React from 'react';
import styled from 'styled-components';
import { useUserType } from '../../context/UserTypeContext';
import { useTracking } from '../../context/TrackingContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../FormElements/Button';

const HeaderContainer = styled.header`
  background-color: #0b0c0c;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled(Link)`
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
`;

const UserType = styled.span`
  background-color: #1d70b8;
  padding: 3px 8px;
  border-radius: 3px;
  margin-right: 10px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const TrackingStatus = styled.span`
  background-color: ${props => props.active ? '#1d70b8' : '#505a5f'};
  padding: 3px 8px;
  border-radius: 3px;
  margin-right: 10px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

const TrackingDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-right: 5px;
`;

// Removed unused OrgName styled component

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled(Button)`
  color: white;
  border: ${props => props.variant === 'primary' ? 'none' : '2px solid white'};
  border-radius: 0;
  background-color: ${props => props.variant === 'primary' ? '#2e7d32' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#1b5e20' : 'transparent'};
    border-color: white;
  }
`;

const Header = () => {
  const { userType, hasUserTypeSelected } = useUserType();
  const { isTracking, isInternalTeam } = useTracking();
  const navigate = useNavigate();
  
  // Navigate to sign out page instead of handling sign out directly
  const handleSignOut = () => {
    navigate('/sign-out');
  };
  
  const getUserTypeLabel = (type) => {
    switch(type) {
      case 'school': return 'School';
      case 'localAuthority': return 'LA';
      case 'trust': return 'Trust';
      default: return '';
    }
  };
  
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title to="/select-user-type">View your education data</Title>
        {hasUserTypeSelected && (
          <UserInfo>
            <UserType>{getUserTypeLabel(userType)}</UserType>
            {isTracking && !isInternalTeam && (
              <TrackingStatus active={true}>
                <TrackingDot /> Recording
              </TrackingStatus>
            )}
            {isTracking && isInternalTeam && (
              <TrackingStatus active={false}>
                <TrackingDot /> Internal
              </TrackingStatus>
            )}
          </UserInfo>
        )}
      </div>
      <ButtonsContainer>
        <Link to="/select-user-type">
          <HeaderButton variant="primary">
            {hasUserTypeSelected ? 'Change organisation' : 'Select organisation'}
          </HeaderButton>
        </Link>
        
        {hasUserTypeSelected && (
          <button 
            onClick={handleSignOut} 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '16px',
              height: '40px',
              boxSizing: 'border-box'
            }}
          >
            Sign out
          </button>
        )}
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;
