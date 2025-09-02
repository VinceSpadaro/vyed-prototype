import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #b1b4b6;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  width: 100%;
`;


const Tab = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 12px 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  font-size: 0.9rem;
  text-align: center;
  position: relative;
  
  &:hover {
    background-color: #f3f2f1;
  }
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #1d70b8;
    }
  `}
`;

const TabNavigation = () => {
  const location = useLocation();
  const { pathname } = location;
  
  // Consider data-visualisations, previous-academic-year, year-to-date-comparison, absence-bandings, unauthorised-absence, and check-leaver-data as part of insights dashboard
  const isInsightsDashboardActive = pathname === '/' || pathname === '/data-visualisations' || pathname === '/previous-academic-year' || pathname === '/year-to-date-comparison' || pathname === '/absence-bandings' || pathname === '/unauthorised-absence' || pathname === '/check-leaver-data';
  
  return (
    <TabsContainer>
      <Tab to="/" active={isInsightsDashboardActive ? true : undefined}>Insights dashboard</Tab>
      <Tab to="/school" active={pathname === '/school' ? true : undefined}>School</Tab>
      <Tab to="/pupil" active={pathname.startsWith('/pupil') ? true : undefined}>Pupil</Tab>
      <div style={{ flexGrow: 1 }}></div>
      <Tab to="/guidance" active={pathname === '/guidance' ? true : undefined}>Guidance</Tab>
      <Tab to="/feedback" active={pathname === '/feedback' ? true : undefined}>Feedback</Tab>
    </TabsContainer>
  );
};

export default TabNavigation;
