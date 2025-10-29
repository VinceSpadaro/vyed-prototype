import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// GOV.UK Design System breadcrumbs styling
const BreadcrumbNav = styled.nav`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  
  @media (max-width: 40.0625em) {
    font-size: 14px;
  }
`;

const BreadcrumbItem = styled.li`
  display: inline-block;
  position: relative;
  margin-bottom: 5px;
  margin-left: 10px;
  padding-left: 15px;
  
  &:first-child {
    margin-left: 0;
    padding-left: 0;
  }
  
  &:not(:first-child)::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2px;
    width: 7px;
    height: 7px;
    margin: auto 0;
    transform: rotate(45deg);
    border: solid;
    border-width: 1px 1px 0 0;
    border-color: #505a5f;
  }
  
  @media print {
    &:not(:first-child)::before {
      display: none;
    }
  }
`;

const BreadcrumbLink = styled(Link)`
  font-family: "GDS Transport", arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  text-decoration: underline;
  text-decoration-thickness: max(1px, 0.0625rem);
  text-underline-offset: 0.1578em;
  
  &:hover {
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    text-decoration-skip-ink: none;
    text-decoration-skip: none;
  }
  
  &:focus {
    outline: 3px solid transparent;
    color: #0b0c0c;
    background-color: #ffdd00;
    box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c;
    text-decoration: none;
  }
  
  @media print {
    color: #0b0c0c;
    text-decoration: none;
  }
`;

const ToolsBreadcrumbs = ({ items = [], currentPage }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/tools' },
    ...items
  ];
  
  // Only add currentPage if it's provided
  if (currentPage) {
    breadcrumbItems.push({ label: currentPage });
  }

  return (
    <BreadcrumbNav className="govuk-breadcrumbs" aria-label="Breadcrumb">
      <BreadcrumbList className="govuk-breadcrumbs__list">
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem 
            key={`${item.label}-${index}`}
            className="govuk-breadcrumbs__list-item"
          >
            {item.to ? (
              <BreadcrumbLink 
                to={item.to}
                className="govuk-breadcrumbs__link"
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink 
                as="span"
                className="govuk-breadcrumbs__link"
              >
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

export default ToolsBreadcrumbs;
