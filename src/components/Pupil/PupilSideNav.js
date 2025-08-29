import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SideNavContainer = styled.div`
  width: 220px;
  border-right: 1px solid #b1b4b6;
  padding: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
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

const PupilSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SelectLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.div`
  border: 1px solid #b1b4b6;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const DropdownIcon = styled.span`
  margin-left: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #b1b4b6;
  border-top: none;
  z-index: 10;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #b1b4b6;
`;

const SearchIcon = styled.span`
  margin-right: 8px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f2f1;
  }
`;

const PupilSideNav = ({ 
  selectedPupil, 
  setSelectedPupil, 
  dropdownOpen, 
  setDropdownOpen, 
  searchTerm, 
  setSearchTerm, 
  filteredPupils, 
  dropdownRef, 
  handlePupilSelect 
}) => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <SideNavContainer>
      <PupilSelectionContainer>
        <SelectLabel>Select pupil</SelectLabel>
        <SelectContainer ref={dropdownRef}>
          <StyledSelect onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedPupil ? selectedPupil.name : 'select pupil'}
            <DropdownIcon>▼</DropdownIcon>
          </StyledSelect>
          
          <DropdownMenu isOpen={dropdownOpen}>
            <SearchInput>
              <SearchIcon>🔍</SearchIcon>
              <Input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
            
            {filteredPupils.map((pupil) => (
              <DropdownItem 
                key={pupil.id} 
                onClick={() => handlePupilSelect(pupil)}
              >
                {pupil.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </SelectContainer>
      </PupilSelectionContainer>
      
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
