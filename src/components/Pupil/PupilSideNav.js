import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { Select } from '../FormElements';

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

// School options for Local Authority users
const schoolOptions = [
  { value: 'all', label: 'All' },
  { value: 'demo-school', label: 'Demo School' },
  { value: 'school-one', label: 'School One' },
  { value: 'school-two', label: 'School Two' },
  { value: 'school-three', label: 'School Three' },
  { value: 'school-four', label: 'School Four' },
  { value: 'school-five', label: 'School Five' }
];

const PupilSideNav = ({ 
  selectedPupil, 
  setSelectedPupil, 
  dropdownOpen, 
  setDropdownOpen, 
  searchTerm, 
  setSearchTerm, 
  filteredPupils, 
  dropdownRef, 
  handlePupilSelect,
  selectedSchool,
  setSelectedSchool
}) => {
  const location = useLocation();
  const path = location.pathname;
  const { userType } = useUserType();
  
  // Handle school selection change
  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };
  
  // Create pupil options for the Select component
  const pupilOptions = filteredPupils.map(pupil => ({
    value: pupil.id.toString(),
    label: pupil.name
  }));
  
  // Handle pupil selection change
  const handlePupilSelectChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId && selectedId !== '') {
      // Find the pupil by ID, ensuring string comparison
      const pupil = filteredPupils.find(p => p.id.toString() === selectedId);
      if (pupil) {
        // Pass the complete pupil object to the parent component
        handlePupilSelect(pupil);
      }
    }
  };
  
  return (
    <SideNavContainer>
      {userType === 'localAuthority' && (
        <PupilSelectionContainer>
          <Select
            id="school-select"
            label="Select school"
            options={schoolOptions}
            value={selectedSchool || 'all'}
            onChange={handleSchoolChange}
          />
        </PupilSelectionContainer>
      )}
      
      <PupilSelectionContainer>
        <Select
          id="pupil-select"
          label="Select pupil"
          options={pupilOptions}
          value={selectedPupil ? selectedPupil.id : ''}
          onChange={handlePupilSelectChange}
          disabled={userType === 'localAuthority' && (!selectedSchool || selectedSchool === 'all')}
          placeholder={userType === 'localAuthority' && (!selectedSchool || selectedSchool === 'all') ? 
            'Please select a school first' : 'Select a pupil'}
        />
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
