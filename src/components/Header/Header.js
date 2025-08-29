import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #0b0c0c;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  font-weight: normal;
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
  return (
    <HeaderContainer>
      <Title>View your education data</Title>
      <ButtonsContainer>
        <Button primary>Impersonate</Button>
        <Button>Sign out</Button>
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;
