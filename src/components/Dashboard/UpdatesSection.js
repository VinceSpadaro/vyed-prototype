import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UpdatesContainer = styled.div`
  border: 2px solid #1d70b8;
  padding: 20px;
  margin-bottom: 30px;
  background-color: #fff;
`;

const UpdatesTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 15px;
  color: #1d70b8;
`;

const UpdatesList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const UpdateItem = styled.li`
  margin-bottom: 5px;
`;

const UpdateLink = styled(Link)`
  color: #1d70b8;
  text-decoration: none;
  font-weight: normal;
  
  &:hover {
    text-decoration: underline;
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const UpdatesSection = () => {
  return (
    <UpdatesContainer>
      <UpdatesTitle>Get updates on:</UpdatesTitle>
      <UpdatesList>
        <UpdateItem>
          <UpdateLink to="/">how to use the tool</UpdateLink>
        </UpdateItem>
        <UpdateItem>
          <UpdateLink to="/">current technical issues</UpdateLink>
        </UpdateItem>
      </UpdatesList>
    </UpdatesContainer>
  );
};

export default UpdatesSection;
