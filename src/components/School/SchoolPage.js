import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getAllPupils } from '../../services/pupilDataService';
import Filters from '../Filters/Filters';
import { media } from '../../styles/mediaQueries';
import SupportSection from '../Support/SupportSection';
import { useUserType } from '../../context/UserTypeContext';
import PageLayout from '../Dashboard/PageLayout';
import Dropdown from '../Common/Dropdown';

// Removed unused ContentContainer

// Removed unused MainContentWrapper

// Removed unused MainContent

// Removed unused SidebarContent

// PageContainer is no longer needed as PageLayout handles this

const SchoolPageContainer = styled.div`
  margin-bottom: 30px;
`;

// Removed unused PageTitle

const TableContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #b1b4b6;
  width: 100%;
  max-width: 100%;
  display: block;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 1000px; /* Ensure table has a minimum width for scrolling */
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.9rem;
  table-layout: auto; /* Allow columns to size based on content */
`;

const TableHeader = styled.thead`
  background-color: #f3f2f1;
  border-bottom: 2px solid #b1b4b6;
  
  th {
    padding: 12px 20px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  tr:hover {
    background-color: #e8f4fa;
  }
  
  td {
    padding: 10px 20px;
    border-bottom: 1px solid #e5e5e5;
    white-space: nowrap;
  }
`;

const InfoText = styled.div`
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const LastUpdated = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 15px;
`;

const SchoolName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 5px;
  font-weight: 700;
`;

const SchoolYear = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  ${media.medium`
    flex-wrap: wrap;
  `}
  
  ${media.small`
    flex-direction: column;
  `}
`;

const StatBox = styled.div`
  background-color: ${props => props.color || 'var(--stat-card-blue)'};
  color: white;
  padding: 15px;
  flex: 1;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 0;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
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

// Sample data for multiple schools
const schoolsMap = {
  'demo-school': 'Demo School',
  'school-one': 'School One',
  'school-two': 'School Two',
  'school-three': 'School Three',
  'school-four': 'School Four',
  'school-five': 'School Five'
};

const SchoolPage = () => {
  const { userType } = useUserType();
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [filteredPupils, setFilteredPupils] = useState([]);
  const [visiblePupils, setVisiblePupils] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialVisibleRows = 15;
  const [visibleRows, setVisibleRows] = useState(initialVisibleRows);
  
  useEffect(() => {
    // Fetch pupil data
    const data = getAllPupils();
    
    // For Local Authority and Trust users, add school name to each pupil
    if (userType === 'localAuthority' || userType === 'trust') {
      // Assign random schools to pupils for demo purposes
      const dataWithSchools = data.map(pupil => {
        const schoolKeys = Object.keys(schoolsMap);
        const randomSchool = schoolKeys[Math.floor(Math.random() * schoolKeys.length)];
        return {
          ...pupil,
          schoolId: randomSchool,
          schoolName: schoolsMap[randomSchool]
        };
      });
      setFilteredPupils(dataWithSchools);
    } else {
      setFilteredPupils(data);
    }
    
    setLoading(false);
  }, [userType]);
  
  // Update visible pupils when filtered pupils change or visible rows change
  useEffect(() => {
    let pupils = filteredPupils;
    
    // Filter by selected school for Local Authority and Trust users
    if ((userType === 'localAuthority' || userType === 'trust') && selectedSchool !== 'all') {
      pupils = filteredPupils.filter(pupil => pupil.schoolId === selectedSchool);
    }
    
    setVisiblePupils(pupils.slice(0, visibleRows));
  }, [filteredPupils, visibleRows, selectedSchool, userType]);
  
  // School selection is now handled directly in the Dropdown component
  
  // Function to load more rows (previously used with scroll)
  const loadMoreRows = useCallback(() => {
    setVisibleRows(prevRows => Math.min(prevRows + 10, filteredPupils.length));
  }, [filteredPupils.length]);
  
  // We'll use handleScroll again since we're making the table scrollable
  const handleScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      // When user scrolls to near bottom, load more rows
      loadMoreRows();
    }
  }, [loadMoreRows]);
  
  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Create the school content component
  const schoolContent = (
    <SchoolPageContainer>
      {userType === 'localAuthority' || userType === 'trust' ? (
        <>
          <SchoolName>{selectedSchool === 'all' ? 'All Schools' : schoolsMap[selectedSchool]}</SchoolName>
          <SchoolYear>Current academic year up to {formattedDate}</SchoolYear>
          <div style={{ marginBottom: '20px' }}>
            <Dropdown
              label="Select School"
              options={schoolOptions.map(option => ({ value: option.value, label: option.label }))}
              value={selectedSchool}
              onChange={(value) => setSelectedSchool(value)}
            />
          </div>
        </>
      ) : (
        <>
          <SchoolName>Demo School</SchoolName>
          <SchoolYear>Current academic year up to {formattedDate}</SchoolYear>
        </>
      )}
      
      <StatsContainer>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>1,744</StatValue>
          <StatLabel>Number of pupils</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>91.4%</StatValue>
          <StatLabel>Overall attendance %</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>454</StatValue>
          <StatLabel>Persistently absent pupils</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>48</StatValue>
          <StatLabel>Severely absent pupils</StatLabel>
        </StatBox>
      </StatsContainer>
      
      <LastUpdated>Latest session available: {formattedDate}</LastUpdated>
      
      <InfoText>
        Get attendance and absence figures for the whole school and pupil characteristic groups. 
        Use the filter pane on the right hand side to select pupil characteristics.
      </InfoText>
      
      {loading ? (
        <div>Loading pupil data...</div>
      ) : (
        <>
          <TableContainer onScroll={handleScroll}>
            <StyledTable>
              <TableHeader>
                <tr>
                  <th style={{ minWidth: '150px' }}>Pupil name</th>
                  {(userType === 'localAuthority' || userType === 'trust') && <th style={{ minWidth: '150px' }}>School name</th>}
                  <th style={{ minWidth: '120px' }}>UPN</th>
                  <th style={{ minWidth: '100px' }}>Attendance</th>
                  <th style={{ minWidth: '100px' }}>Absence</th>
                  <th style={{ minWidth: '100px' }}>Authorized</th>
                  <th style={{ minWidth: '100px' }}>Unauthorized</th>
                  <th style={{ minWidth: '120px' }}>Full days missed</th>
                  <th style={{ minWidth: '140px' }}>Possible sessions</th>
                  <th style={{ minWidth: '120px' }}>Missed sessions</th>
                </tr>
              </TableHeader>
              <TableBody>
                {visiblePupils.map((pupil) => (
                  <tr key={pupil.id}>
                    <td>{pupil.name}</td>
                    {(userType === 'localAuthority' || userType === 'trust') && <td>{pupil.schoolName}</td>}
                    <td>{pupil.upn}</td>
                    <td>{pupil.attendance}</td>
                    <td>{pupil.absence}</td>
                    <td>{pupil.authorized}</td>
                    <td>{pupil.unauthorized}</td>
                    <td>{pupil.fullDaysMissed}</td>
                    <td>{pupil.possibleSessions}</td>
                    <td>{pupil.missedSessions}</td>
                  </tr>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          
          {/* Infinite scroll implemented - no pagination needed */}
        </>
      )}
    </SchoolPageContainer>
  );

  return (
    <PageLayout
      title="School attendance data"
      showUpdates={true}
      showTabs={true}
      contentSideNav={false}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      {schoolContent}
    </PageLayout>
  );
};

export default SchoolPage;
