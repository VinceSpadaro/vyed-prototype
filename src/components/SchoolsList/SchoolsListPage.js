import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { schoolsData as laSchoolsData } from '../../data/localAuthorityData';
import { schoolsData as trustSchoolsData } from '../../data/trustData';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  color: #0b0c0c;
`;

const Subtitle = styled.p`
  font-size: 19px;
  color: #505a5f;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchLabel = styled.label`
  display: block;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0b0c0c;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #0b0c0c;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const ResultsCount = styled.p`
  font-size: 19px;
  margin-bottom: 20px;
  color: #0b0c0c;
`;

const SchoolsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SchoolItem = styled.li`
  border-bottom: 1px solid #b1b4b6;
  padding: 15px 0;
  
  &:first-child {
    border-top: 1px solid #b1b4b6;
  }
`;


const SchoolLink = styled.button`
  background: none;
  border: none;
  color: #1d70b8;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 19px;
  text-align: left;
  font-weight: normal;
  
  &:hover {
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
    background-color: #ffdd00;
  }
`;

const SchoolsListPage = () => {
  const navigate = useNavigate();
  const { userType, organisationName, setViewingContext, setSelectedSchoolName } = useUserType();
  const [searchTerm, setSearchTerm] = useState('');

  // Determine which data to use based on user type
  const schoolsData = userType === 'localAuthority' ? laSchoolsData : trustSchoolsData;

  // Filter schools based on search term
  const filteredSchools = schoolsData.filter(school => {
    const searchLower = searchTerm.toLowerCase();
    return (
      school.name.toLowerCase().includes(searchLower) ||
      school.urn.toLowerCase().includes(searchLower) ||
      school.phase.toLowerCase().includes(searchLower) ||
      school.type.toLowerCase().includes(searchLower)
    );
  });

  const handleSchoolClick = (school) => {
    // Set viewing context to 'school' to show school environment
    setViewingContext('school');
    // Store the selected school name
    setSelectedSchoolName(school.name);
    // Navigate to the tools page which shows school environment
    navigate('/tools');
  };

  const handleViewClick = (viewType) => {
    // Clear viewing context to show LA/Trust environment
    setViewingContext('');
    // Clear selected school name
    setSelectedSchoolName('');
    // Navigate to the tools page
    navigate('/tools');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>
          {userType === 'localAuthority' ? 'Local Authority Schools' : 'Trust Schools'}
        </Title>
        <Subtitle>{organisationName}</Subtitle>
      </Header>

      <SearchContainer>
        <SearchLabel htmlFor="school-search">
          Search for a school
        </SearchLabel>
        <SearchInput
          id="school-search"
          type="text"
          placeholder="Search by school name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <ResultsCount>
        Showing {filteredSchools.length} of {schoolsData.length} schools
      </ResultsCount>

      <SchoolsList>
        {filteredSchools.map((school, index) => {
          // Insert LA/Trust link as the 3rd item (index 2)
          if (index === 2) {
            return (
              <React.Fragment key={`fragment-${index}`}>
                <SchoolItem key="overview-link">
                  <SchoolLink onClick={() => handleViewClick('overview')}>
                    {userType === 'localAuthority' ? 'Local Authority' : 'Trust'}
                  </SchoolLink>
                </SchoolItem>
                <SchoolItem key={school.urn || index}>
                  <SchoolLink onClick={() => handleSchoolClick(school)}>
                    {school.name}
                  </SchoolLink>
                </SchoolItem>
              </React.Fragment>
            );
          }
          
          return (
            <SchoolItem key={school.urn || index}>
              <SchoolLink onClick={() => handleSchoolClick(school)}>
                {school.name}
              </SchoolLink>
            </SchoolItem>
          );
        })}
      </SchoolsList>
    </Container>
  );
};

export default SchoolsListPage;
