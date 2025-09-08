import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UpdatesContainer = styled.div`
  border: 4px solid #005ea5;
  padding: 20px;
  margin: 20px 0;
  width: 70%;
`;

const UpdatesTitle = styled.h2`
  color: #1d70b8;
  margin-top: 0;
`;

const UpdatesList = styled.ul`
  padding-left: 20px;
`;

const UpdatesListItem = styled.li`
  margin-bottom: 8px;
`;

const UpdatesLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const UpdatesRouterLink = styled(Link)`
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

const UpdatesSection = ({ links = [] }) => {
  // If no links are provided, use default links
  const defaultLinks = [
    { text: 'how to use the tool', url: '/', internal: true },
    { text: 'current technical issues', url: '/', internal: true }
  ];
  
  const linksToUse = links.length > 0 ? links : defaultLinks;
  
  return (
    <UpdatesContainer>
      <UpdatesTitle>Get updates on:</UpdatesTitle>
      <UpdatesList>
        {linksToUse.map((link, index) => (
          <UpdatesListItem key={index}>
            {link.internal ? (
              <UpdatesRouterLink to={link.url} data-discover={true}>
                {link.text}
              </UpdatesRouterLink>
            ) : (
              <UpdatesLink href={link.url} data-discover={true}>
                {link.text}
              </UpdatesLink>
            )}
          </UpdatesListItem>
        ))}
      </UpdatesList>
    </UpdatesContainer>
  );
};

export default UpdatesSection;
