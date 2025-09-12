import React from 'react';
import styled from 'styled-components';

const SupportContainer = styled.div`
  padding: 20px;
  margin-top: 30px;
  border-top: 1px solid #b1b4b6;
`;

const SupportTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: red;
`;

const SupportText = styled.p`
  margin-bottom: 10px;
  font-size: 0.95rem;
`;

const SupportLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
    background-color: #ffdd00;
  }
`;

const SupportSection = () => {
  return (
    <SupportContainer>
      <SupportTitle>Further support</SupportTitle>
      <SupportText>
        If you need help with anything, you can <SupportLink href="#">submit an enquiry</SupportLink>
      </SupportText>
    </SupportContainer>
  );
};

export default SupportSection;
