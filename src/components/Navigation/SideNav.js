import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { media } from '../Dashboard/ResponsiveStyles';

const SideNavContainer = styled.nav`
  width: 250px;
  border-right: 1px solid #dee0e2;
  padding: 20px 0;
  
  ${media.medium`
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #dee0e2;
    margin-bottom: 20px;
  `}
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #0b0c0c;
  text-decoration: none;
  border-left: 4px solid ${props => props.active ? '#1d70b8' : 'transparent'};
  background-color: ${props => props.active ? '#f3f2f1' : 'transparent'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: #f3f2f1;
    text-decoration: underline;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
    background-color: #ffdd00;
  }
`;

const SideNav = () => {
  const location = useLocation();
  const { pathname } = location;
  
  return (
    <SideNavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/" active={pathname === '/' ? true : undefined}>Current insights</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/data-visualisations" active={pathname === '/data-visualisations' ? true : undefined}>Data visualisations</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/previous-academic-year">Previous academic year</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/year-to-date-comparison">Year-to-date comparison</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/absence-bandings">Absence bandings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/unauthorised-absence">Unauthorised absence</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/check-leaver-data">Check leaver data</NavLink>
        </NavItem>
      </NavList>
    </SideNavContainer>
  );
};

export default SideNav;
