import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SideNavContainer = styled.div`
  width: 220px;
  border-right: 1px solid #b1b4b6;
  padding: 20px 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 5px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #0b0c0c;
  border-left: 4px solid ${props => props.active ? '#1d70b8' : 'transparent'};
  background-color: ${props => props.active ? '#f3f2f1' : 'transparent'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: #f3f2f1;
  }
`;

const PupilSideNav = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <SideNavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/pupil" active={path === '/pupil'}>
            Current insights
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pupil/visualisations" active={path === '/pupil/visualisations'}>
            Data visualisations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pupil/previous-year" active={path === '/pupil/previous-year'}>
            Previous academic year
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pupil/comparison" active={path === '/pupil/comparison'}>
            Year-to-date comparison
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pupil/codes" active={path === '/pupil/codes'}>
            Attendance codes
          </NavLink>
        </NavItem>
      </NavList>
    </SideNavContainer>
  );
};

export default PupilSideNav;
