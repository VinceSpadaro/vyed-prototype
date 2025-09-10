import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Accordion from '../Common/Accordion';
import Details from '../Common/Details';

// Main container for the page
const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// Styled components for the page
const SearchContainer = styled.div`
  margin-bottom: 30px;
`;


const SearchForm = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: #00703c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #005a30;
  }
`;

const ClearButton = styled.button`
  background-color: #f3f2f1;
  color: #0b0c0c;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #dbdad9;
  }
`;

const LinkItem = styled.div`
  margin-bottom: 15px;
`;



const ToolsPage = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  // Create the content for the attendance section
  const attendanceContent = (
    <>
      <Details summary="View school attendance data (demo)">
        <p>Access the demo version of school attendance data visualization tools.</p>
        <LinkItem>
          <Link to="/insights">Go to attendance data demo</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Compare your attendance (demo)">
        <p>Compare attendance data across different metrics in the demo version.</p>
        <LinkItem>
          <Link to="/compare">Go to attendance comparison demo</Link>
        </LinkItem>
      </Details>
      
      <Details summary="View school attendance data">
        <p>Access real-time school attendance data visualization tools.</p>
        <LinkItem>
          <Link to="/insights">Go to attendance data</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Compare your attendance">
        <p>Compare attendance data across different metrics.</p>
        <LinkItem>
          <Link to="/compare">Go to attendance comparison</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Similar schools comparison reports">
        <p>View reports comparing attendance with similar schools.</p>
        <LinkItem>
          <Link to="/reports">View comparison reports</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Year 6 transition data download">
        <p>Download data related to Year 6 student transitions.</p>
        <LinkItem>
          <a href="https://www.gov.uk/government/publications/school-attendance" target="_blank" rel="noopener noreferrer">Download transition data</a>
        </LinkItem>
      </Details>
      
      <Details summary="Monitor your school attendance">
        <p>Tools for monitoring overall school attendance.</p>
        <LinkItem>
          <Link to="/insights">Go to monitoring tools</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Your attendance summary reports">
        <p>Access summary reports of attendance data.</p>
        <LinkItem>
          <Link to="/reports">View summary reports</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Attendance and absence codes">
        <p>Reference guide for attendance and absence codes.</p>
        <LinkItem>
          <Link to="/guidance">View codes guide</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Monitor your cross-border school attendance">
        <p>Tools for monitoring attendance across different regions.</p>
        <LinkItem>
          <Link to="/insights">Go to cross-border tools</Link>
        </LinkItem>
      </Details>
      
      <Details summary="Monitor your school attendance - Engagement">
        <p>Tools focused on student engagement metrics.</p>
        <LinkItem>
          <Link to="/insights">Go to engagement tools</Link>
        </LinkItem>
      </Details>
      
      <Details summary="MPQX report">
        <p>Access specialized MPQX reporting tools.</p>
        <LinkItem>
          <a href="https://www.gov.uk/government/publications/school-attendance" target="_blank" rel="noopener noreferrer">View MPQX report</a>
        </LinkItem>
      </Details>
    </>
  );
  
  // Define accordion sections
  const accordionSections = [
    {
      id: 'attendance',
      title: 'Monitor your school attendance',
      content: attendanceContent
    }
  ];
  
  const toolsContent = (
    <>
      <SearchContainer>
        <SearchForm>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="Search for tools and resources"
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
          <ClearButton onClick={handleClearSearch}>Clear search</ClearButton>
        </SearchForm>
      </SearchContainer>
      
      <Accordion sections={accordionSections} />
    </>
  );

  return (
    <Container>
      <h2>Find a product:</h2>
      {toolsContent}
    </Container>
  );
};

export default ToolsPage;
