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
import { media } from '../../styles/mediaQueries';
import { useUserType } from '../../context/UserTypeContext';

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #b1b4b6;
  margin-bottom: 30px;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabContent = styled.div`
  padding: 20px;
  flex: 1;
`;

// These styled components are used in PupilSideNav
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

const PupilDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PupilName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  ${media.medium`
    grid-template-columns: 1fr;
  `}
`;

const DetailsColumn = styled.div``;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const DetailLabel = styled.div`
  width: 100px;
  font-weight: bold;
`;

const DetailValue = styled.div``;

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
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid #b1b4b6;
  
  &:first-child {
    background-color: #f3f2f1;
    font-weight: bold;
  }
`;

const TableCell = styled.div`
  padding: 10px;
`;

const DaysTable = styled.div`
  margin-bottom: 30px;
`;

const DaysTableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #b1b4b6;
  
  &:first-child {
    background-color: #f3f2f1;
    font-weight: bold;
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


const WeekSelector = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const WeekSelectorLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const WeekSelectorDropdown = styled.div`
  position: relative;
  width: 200px;
`;

const SupportSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #b1b4b6;
`;

const SupportTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const SupportText = styled.p`
  margin-bottom: 10px;
`;

const SupportLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PupilInsights = ({ selectedPupil, formatDate }) => {
  console.log('PupilInsights received selectedPupil:', selectedPupil);
  return (
    <>
      
      {selectedPupil && (
        <>
          <PupilName>{selectedPupil.name}</PupilName>
          
          <PupilDetailsContainer>
            <DetailsGrid>
              <DetailsColumn>
                <DetailRow>
                  <DetailLabel>UPN</DetailLabel>
                  <DetailValue>{selectedPupil.upn}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Year</DetailLabel>
                  <DetailValue>{Math.floor(Math.random() * 12) + 1}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Sex</DetailLabel>
                  <DetailValue>{Math.random() > 0.5 ? 'FEMALE' : 'MALE'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>FSM</DetailLabel>
                  <DetailValue>{Math.random() > 0.7 ? 'Yes' : 'No'}</DetailValue>
                </DetailRow>
              </DetailsColumn>
              <DetailsColumn>
                <DetailRow>
                  <DetailLabel>SEN support</DetailLabel>
                  <DetailValue>{Math.random() > 0.8 ? 'Yes' : 'Unknown'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>LAC</DetailLabel>
                  <DetailValue>{Math.random() > 0.9 ? 'Yes' : 'No'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>PLAC</DetailLabel>
                  <DetailValue>{Math.random() > 0.9 ? 'Yes' : 'No'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>EHCP</DetailLabel>
                  <DetailValue>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</DetailValue>
                </DetailRow>
              </DetailsColumn>
            </DetailsGrid>
            <DetailsGrid>
              <DetailsColumn>
                <DetailRow>
                  <DetailLabel>CIN</DetailLabel>
                  <DetailValue>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>CPP</DetailLabel>
                  <DetailValue>{Math.random() > 0.9 ? 'Yes' : 'Unknown'}</DetailValue>
                </DetailRow>
              </DetailsColumn>
              <DetailsColumn>
                <DetailRow>
                  <DetailLabel>Days since last absence</DetailLabel>
                  <DetailValue>{Math.floor(Math.random() * 30)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Persistently absent</DetailLabel>
                  <DetailValue>{parseFloat(selectedPupil.absence) > 10 ? 'Yes' : 'No'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Severely absent</DetailLabel>
                  <DetailValue>{parseFloat(selectedPupil.absence) > 50 ? 'Yes' : 'No'}</DetailValue>
                </DetailRow>
              </DetailsColumn>
            </DetailsGrid>
          </PupilDetailsContainer>
          
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
    
    // For Local Authority users, add school name to each pupil
    if (userType === 'localAuthority') {
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
    
    // For Local Authority users
    if (userType === 'localAuthority') {
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
    if (userType === 'localAuthority' && (!selectedSchool || selectedSchool === 'all')) {
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
      
      <ContentContainer>
        <TabNavigation />
        
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
        </MainContentWrapper>
      </ContentContainer>
      
      <SupportSection>
        <SupportTitle>Further support</SupportTitle>
        <SupportText>
          If you need help with anything, you can <SupportLink href="#">submit an enquiry</SupportLink>.
        </SupportText>
      </SupportSection>
    </Container>
  );
};

export default PupilPage;
