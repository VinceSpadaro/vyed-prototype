import React from 'react';
import styled from 'styled-components';
import { useUserType } from '../../context/UserTypeContext';
import { Link } from 'react-router-dom';

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

const OrgName = styled.span`
  font-weight: bold;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#2e7d32' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 3px;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.primary ? '#1b5e20' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const Header = () => {
  const { userType, organisationName, hasUserTypeSelected, clearUserType } = useUserType();
  
  const handleSignOut = () => {
    clearUserType();
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
        <Title to="/">View your education data</Title>
        {hasUserTypeSelected && (
          <UserInfo>
            <UserType>{getUserTypeLabel(userType)}</UserType>
            <OrgName>{organisationName}</OrgName>
          </UserInfo>
        )}
      </div>
      <ButtonsContainer>
        <Button as={Link} to="/select-user-type" primary>
          {hasUserTypeSelected ? 'Change organisation' : 'Select organisation'}
        </Button>
        {hasUserTypeSelected && (
          <Button onClick={handleSignOut}>Sign out</Button>
        )}
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;
