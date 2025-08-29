import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbContainer = styled.nav`
  padding: 15px 0;
`;

const BreadcrumbList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: '›';
    margin: 0 8px;
    color: #666;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #005ea5;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CurrentPage = styled.span`
  color: #333;
`;

const Breadcrumb = () => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">Monitor your school attendance</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">View school attendance data (demo)</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <CurrentPage>View school attendance data</CurrentPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
