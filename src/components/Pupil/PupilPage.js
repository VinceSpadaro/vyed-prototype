import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { getAllPupils } from '../../services/pupilDataService';
import TabNavigation from '../Dashboard/TabNavigation';
import PupilSideNav from './PupilSideNav';
import PupilVisualisations from './PupilVisualisations';
import PupilPreviousYear from './PupilPreviousYear';
import PupilYearToDateComparison from './PupilYearToDateComparison';
import PupilAttendanceCodes from './PupilAttendanceCodes';
import UpdatesSection from '../Common/UpdatesSection';
import SupportSection from '../Support/SupportSection';
import { media } from '../../styles/mediaQueries';
import { useUserType } from '../../context/UserTypeContext';

// Styled components
const Container = styled.div`
  padding: 0 20px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;


const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 100%;
`;

const MainContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  width: 100%;
  max-width: 100%;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const MainContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
`;

const TabContent = styled.div`
  padding: 20px;
  flex: 1;
  min-width: 0; /* This prevents flex items from overflowing */
  overflow-x: auto;
`;

// These styled components are used in PupilSideNav
const StyledSelect = styled.div`
  border: 1px solid #b1b4b6;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  font-size: 16px;
`;

const DropdownIcon = styled.span`
  margin-left: 10px;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 20px;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const PupilDetailsContainer = styled.div`
  flex: 0 0 250px;
  margin-bottom: 20px;
`;

const PupilName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const DetailsSection = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  border-bottom: 1px solid #b1b4b6;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
`;


const DetailLabel = styled.div`
  font-weight: normal;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  ${media.medium`
    grid-template-columns: 1fr;
  `}
`;

const StatCard = styled.div`
  background-color: #1d70b8;
  color: white;
  padding: 20px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin: 20px 0 10px;
`;

const SessionsTable = styled.div`
  margin-bottom: 30px;
  background-color: #f3f2f1;
  border-radius: 4px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  &:first-child {
    font-weight: bold;
  }
  
  &:last-child {
    border-top: 1px solid #b1b4b6;
  }
`;

const TableCell = styled.div`
  padding: 10px;
`;

const DaysTable = styled.div`
  margin-bottom: 30px;
  background-color: #f3f2f1;
  border-radius: 4px;
`;

const DaysTableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  
  &:first-child {
    font-weight: bold;
  }
  
  &:last-child {
    border-top: 1px solid #b1b4b6;
  }
`;

const DaysTableCell = styled.div`
  padding: 10px;
`;

const DateInfo = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #505a5f;
`;

const FullscreenLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;


const MainContentArea = styled.div`
  flex: 1;
`;

const WeekSelector = styled.div`
  margin-bottom: 20px;
`;

const WeekSelectorLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const WeekSelectorDropdown = styled.div`
  position: relative;
  width: 300px;
`;

// Support section styling removed as we're using the global SupportSection component

const PupilInsights = ({ selectedPupil, formatDate }) => {
  return (
    <>
      {selectedPupil && (
        <>
          <PupilName>{selectedPupil.name}</PupilName>
          
          <ContentLayout>
            {/* Left column - Pupil details */}
            <PupilDetailsContainer>
              <DetailsSection>
                <SectionTitle>Pupil details</SectionTitle>
                
                <DetailItem>
                  <DetailLabel>UPN</DetailLabel>
                  <span>{selectedPupil.upn}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Year</DetailLabel>
                  <span>{Math.floor(Math.random() * 12) + 1}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Sex</DetailLabel>
                  <span>{Math.random() > 0.5 ? 'FEMALE' : 'MALE'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>FSM</DetailLabel>
                  <span>{Math.random() > 0.7 ? 'Yes' : 'No'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>SEN support</DetailLabel>
                  <span>{Math.random() > 0.8 ? 'Yes' : 'Unknown'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>LAC</DetailLabel>
                  <span>{Math.random() > 0.9 ? 'Yes' : 'No'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>PLAC</DetailLabel>
                  <span>{Math.random() > 0.9 ? 'Yes' : 'No'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>EHCP</DetailLabel>
                  <span>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>CIN</DetailLabel>
                  <span>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>CPP</DetailLabel>
                  <span>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Days since last absence</DetailLabel>
                  <span>{Math.floor(Math.random() * 30)}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Persistently absent</DetailLabel>
                  <span>{parseFloat(selectedPupil.absence) > 10 ? 'Yes' : 'No'}</span>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Severely absent</DetailLabel>
                  <span>{parseFloat(selectedPupil.absence) > 50 ? 'Yes' : 'No'}</span>
                </DetailItem>
              </DetailsSection>
            </PupilDetailsContainer>
            
            {/* Right column - Main content */}
            <MainContentArea>
              <WeekSelector>
                <WeekSelectorLabel>Select week commencing date</WeekSelectorLabel>
                <WeekSelectorDropdown>
                  <StyledSelect>
                    All
                    <DropdownIcon>▼</DropdownIcon>
                  </StyledSelect>
                </WeekSelectorDropdown>
              </WeekSelector>
              
              <StatsContainer>
                <StatCard>
                  <StatValue>{selectedPupil.attendance}</StatValue>
                  <StatLabel>Overall attendance %</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{selectedPupil.absence}</StatValue>
                  <StatLabel>Overall absence %</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{selectedPupil.unauthorized}</StatValue>
                  <StatLabel>Unauthorised absence %</StatLabel>
                </StatCard>
              </StatsContainer>
              
              <SectionTitle>Sessions</SectionTitle>
              <SessionsTable>
                <TableRow>
                  <TableCell>Number of sessions missed</TableCell>
                  <TableCell>Number of late sessions</TableCell>
                  <TableCell>Possible sessions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{selectedPupil.missedSessions}</TableCell>
                  <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
                  <TableCell>{selectedPupil.possibleSessions}</TableCell>
                </TableRow>
              </SessionsTable>
              
              <SectionTitle>Days</SectionTitle>
              <DaysTable>
                <DaysTableRow>
                  <DaysTableCell>Full day(s) missed</DaysTableCell>
                  <DaysTableCell>Partial day(s) missed</DaysTableCell>
                </DaysTableRow>
                <DaysTableRow>
                  <DaysTableCell>{selectedPupil.fullDaysMissed}</DaysTableCell>
                  <DaysTableCell>{Math.floor(Math.random() * 5)}</DaysTableCell>
                </DaysTableRow>
              </DaysTable>
              
              <DateInfo>Latest session available: {formatDate()}</DateInfo>
              
              <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
            </MainContentArea>
          </ContentLayout>
        </>
      )}
    </>
  );
};

// Sample data for multiple schools
const schoolsMap = {
  'demo-school': 'Demo School',
  'school-one': 'School One',
  'school-two': 'School Two',
  'school-three': 'School Three',
  'school-four': 'School Four',
  'school-five': 'School Five'
};

const PupilPage = () => {
  const { userType } = useUserType();
  const [pupils, setPupils] = useState([]);
  const [selectedPupil, setSelectedPupil] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPupils, setFilteredPupils] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('all');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch pupil data
    const pupilData = getAllPupils();
    
    // For Local Authority and Trust users, add school name to each pupil
    if (userType === 'localAuthority' || userType === 'trust') {
      // Assign random schools to pupils for demo purposes
      const dataWithSchools = pupilData.map(pupil => {
        const schoolKeys = Object.keys(schoolsMap);
        const randomSchool = schoolKeys[Math.floor(Math.random() * schoolKeys.length)];
        return {
          ...pupil,
          schoolId: randomSchool,
          schoolName: schoolsMap[randomSchool]
        };
      });
      setPupils(dataWithSchools);
      setFilteredPupils(dataWithSchools);
    } else {
      setPupils(pupilData);
      setFilteredPupils(pupilData);
    }
  }, [userType]);

  // Effect for filtering pupils based on search and school selection
  useEffect(() => {
    // Filter pupils based on search term and selected school
    let filtered = pupils;
    
    // For Local Authority and Trust users
    if (userType === 'localAuthority' || userType === 'trust') {
      // If no school is selected or 'all' is selected, show no pupils
      if (!selectedSchool || selectedSchool === 'all') {
        filtered = [];
      } else {
        // Filter by the selected school
        filtered = filtered.filter(pupil => pupil.schoolId === selectedSchool);
        
        // Then filter by search term if provided
        if (searchTerm) {
          filtered = filtered.filter(pupil => 
            pupil.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
    } else {
      // For non-LA users, just filter by search term
      if (searchTerm) {
        filtered = filtered.filter(pupil => 
          pupil.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
    
    setFilteredPupils(filtered);
  }, [searchTerm, pupils, selectedSchool, userType]);
  
  // Separate effect to clear selected pupil when school changes
  useEffect(() => {
    if ((userType === 'localAuthority' || userType === 'trust') && (!selectedSchool || selectedSchool === 'all')) {
      setSelectedPupil(null);
    }
  }, [selectedSchool, userType, setSelectedPupil]);
  
  // Log when selectedPupil changes
  useEffect(() => {
    console.log('selectedPupil state updated:', selectedPupil);
  }, [selectedPupil]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePupilSelect = (pupil) => {
    // Make sure we're setting a complete pupil object with all required properties
    if (pupil && pupil.id) {
      // Create a new object to ensure React detects the state change
      const selectedPupilData = {
        ...pupil,
        id: pupil.id,
        name: pupil.name,
        upn: pupil.upn,
        attendance: pupil.attendance,
        absence: pupil.absence,
        authorized: pupil.authorized,
        unauthorized: pupil.unauthorized,
        fullDaysMissed: pupil.fullDaysMissed,
        possibleSessions: pupil.possibleSessions,
        missedSessions: pupil.missedSessions
      };
      
      setSelectedPupil(selectedPupilData);
      setDropdownOpen(false);
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Container>
      <PageTitle>View school attendance data</PageTitle>
      
      <UpdatesSection />
      
      <TabNavigation />
      
      <ContentContainer>
        <MainContentWrapper>
          <PupilSideNav 
            selectedPupil={selectedPupil}
            setSelectedPupil={setSelectedPupil}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredPupils={filteredPupils}
            dropdownRef={dropdownRef}
            handlePupilSelect={handlePupilSelect}
            selectedSchool={selectedSchool}
            setSelectedSchool={setSelectedSchool}
          />
          
          <MainContent>
            <TabContent>
            {console.log('Rendering Routes with selectedPupil:', selectedPupil)}
            <Routes>
              <Route index element={
                <PupilInsights 
                  selectedPupil={selectedPupil}
                  formatDate={formatDate}
                />
              } />
              <Route path="visualisations" element={
                <PupilVisualisations selectedPupil={selectedPupil} />
              } />
              <Route path="previous-year" element={
                <PupilPreviousYear selectedPupil={selectedPupil} />
              } />
              <Route path="comparison" element={
                <PupilYearToDateComparison selectedPupil={selectedPupil} />
              } />
              <Route path="codes" element={
                <PupilAttendanceCodes selectedPupil={selectedPupil} />
              } />
            </Routes>
          </TabContent>
          </MainContent>
        </MainContentWrapper>
      </ContentContainer>
      
      <SupportSection />
    </Container>
  );
};

export default PupilPage;
