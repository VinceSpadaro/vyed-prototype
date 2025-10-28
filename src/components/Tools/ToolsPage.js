import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Accordion from '../Common/Accordion';
import Details from '../Common/Details';
import InputField from '../FormElements/InputField';
import Button from '../FormElements/Button';
import { useUserType } from '../../context/UserTypeContext';

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
  align-items: flex-end;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  max-width: 300px;
`;

const LinkItem = styled.div`
  margin-bottom: 15px;
`;



const ToolsPage = () => {
  // Get user type from context - use effective user type which respects viewing context
  const { getEffectiveUserType } = useUserType();
  const userType = getEffectiveUserType();
  
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
  
  // Create styled components for bullet points
  const BulletList = styled.ul`
    margin-top: 10px;
    padding-left: 20px;
  `;

  const BulletItem = styled.li`
    margin-bottom: 10px;
  `;

  const BulletDescription = styled.div`
    margin-top: 5px;
    font-size: 0.95rem;
  `;

  // Create the school user content with proper structure
  const schoolUserContent = (
    <>
      <Details summary="View school attendance data">
        <BulletList>
          <BulletItem>
            <Link to="/insights">View school attendance data</Link>
            <BulletDescription>
              View attendance data and insights for your school, pupil groups and individual pupils.
            </BulletDescription>
          </BulletItem>
          
          <BulletItem>
            <Link to="/reports">Your attendance summary reports</Link>
            <BulletDescription>
              Download a Word document of your school's attendance. New files are added at the end of each half and full term.
            </BulletDescription>
          </BulletItem>
          
          <BulletItem>
            <a href="https://www.gov.uk/government/publications/school-attendance" target="_blank" rel="noopener noreferrer">
              Absence bandings user guide on GOV.UK (opens in new tab)
            </a>
            <BulletDescription>
              Find out how the absence bandings report works, what the data shows you and how to use it to target your resources across your school, academy trust or local authority.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Compare your attendance">
        <BulletList>
          <BulletItem>
            <Link to="/compare">Compare your attendance</Link>
            <BulletDescription>
              Use this tool to compare your attendance with other schools (mainstream primary and secondary schools only).
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Similar schools comparison reports">
        <BulletList>
          <BulletItem>
            <Link to="/reports">Your similar schools comparison reports</Link>
            <BulletDescription>
              Download a summary comparing your school's attendance with 20 similar schools. Identify your strengths and areas that require focus. You can share this report with your academy trust, governing body, or local authority.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Year 6 transition data download">
        <BulletList>
          <BulletItem>
            <a href="https://www.gov.uk/government/publications/school-attendance" target="_blank" rel="noopener noreferrer">
              Year 6 transition data
            </a>
            <BulletDescription>
              Download absence data for year 6 pupils offered a place at your school in the 2025 to 2026 academic year. This is only available to secondary schools.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
    </>
  );
  
  // Create the local authority user content based on the screenshot
  const localAuthorityContent = (
    <>
      <Details summary="Monitor your school attendance">
        <BulletList>
          <BulletItem>
            <Link to="/insights">View school attendance data</Link>
            <BulletDescription>
              View attendance data and insights for your local authority, pupil groups and individual pupils.
            </BulletDescription>
          </BulletItem>
          
          <BulletItem>
            <Link to="/downloads">Attendance data downloads</Link>
            <BulletDescription>
              Download a CSV file of year-to-date pupil level data up to the latest week. New files are added every Monday for the period up to the previous Friday.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Your attendance summary reports">
        <BulletList>
          <BulletItem>
            <Link to="/reports">Attendance summary reports</Link>
            <BulletDescription>
              Download a Word document report of school attendance in your local authority. New files are added at the end of each half and full term.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Attendance and absence codes">
        <BulletList>
          <BulletItem>
            <Link to="/codes">Export attendance and absence codes</Link>
            <BulletDescription>
              View and export attendance and absence codes used by schools in your local authority in the current academic year.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Monitor your cross-border school attendance">
        <BulletList>
          <BulletItem>
            <Link to="/downloads">Data downloads</Link>
            <BulletDescription>
              Download a CSV file showing out of area pupils, updated to the latest week. We update the file every Monday to cover data up to the previous Friday.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
    </>
  );
  
  // Create the trust user content based on the screenshot
  const trustContent = (
    <>
      <Details summary="Monitor your school attendance">
        <BulletList>
          <BulletItem>
            <Link to="/insights">View school attendance data</Link>
            <BulletDescription>
              View attendance data and insights for your trust, pupil groups and individual pupils.
            </BulletDescription>
          </BulletItem>
          
          <BulletItem>
            <Link to="/downloads">Attendance data downloads</Link>
            <BulletDescription>
              Download a CSV file of year-to-date pupil level data up to the latest week. New files are added every Monday for the period up to the previous Friday.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
      
      <Details summary="Your attendance summary reports">
        <BulletList>
          <BulletItem>
            <Link to="/reports">Attendance summary reports</Link>
            <BulletDescription>
              Download a Word document report of school attendance in your trust. New files are added at the end of each half and full term.
            </BulletDescription>
          </BulletItem>
        </BulletList>
      </Details>
    </>
  );
  
  // Create the content for all users (default content)
  const allUsersContent = (
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
  
  // Define accordion sections based on user type
  const accordionSections = (() => {
    switch(userType) {
      case 'school':
        return [
          {
            id: 'attendance',
            title: 'Monitor your school attendance',
            content: schoolUserContent
          }
        ];
      case 'localAuthority':
        return [
          {
            id: 'attendance',
            title: 'Monitor your school attendance',
            content: localAuthorityContent
          }
        ];
      case 'trust':
        return [
          {
            id: 'attendance',
            title: 'Monitor your school attendance',
            content: trustContent
          }
        ];
      default:
        return [
          {
            id: 'attendance',
            title: 'Monitor your school attendance',
            content: allUsersContent
          }
        ];
    }
  })();
  
  const toolsContent = (
    <>
      <SearchContainer>
        <SearchForm>
          <SearchInputWrapper>
            <InputField 
              id="search-query"
              label="Find a product:"
              type="text" 
              value={searchQuery} 
              onChange={handleSearchChange}
              noMargin
            />
          </SearchInputWrapper>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
          <Button variant="secondary" onClick={handleClearSearch}>Clear search</Button>
        </SearchForm>
      </SearchContainer>
      
      <Accordion 
        sections={accordionSections} 
        defaultExpanded={true} 
      />
    </>
  );

  return (
    <Container>
      {toolsContent}
    </Container>
  );
};

export default ToolsPage;
