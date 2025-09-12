import React, { useState } from 'react';
import styled from 'styled-components';
import TabNavigation from '../Dashboard/TabNavigation';
import UpdatesSection from '../Common/UpdatesSection';
import SupportSection from '../Support/SupportSection';
import Filters from '../Filters/Filters';
import { useUserType } from '../../context/UserTypeContext';
import { media } from '../Dashboard/ResponsiveStyles';
import { Select } from '../FormElements';
import DataTable from '../Common/DataTable';
import { localAuthorityOverviewData, schoolOptions, schoolsData } from '../../data/localAuthorityData';

const Container = styled.div`
  padding: 0 20px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
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
  overflow-x: hidden;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const MainContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  padding-left: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1.5;
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
  background-color: ${props => props.color || '#1d70b8'};  
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

const TableContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  border: 1px solid #b1b4b6;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const LastUpdated = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  text-align: right;
`;


const SidebarContent = styled.div`
  width: 300px;
  
  ${media.medium`
    width: 100%;
    margin-top: 20px;
  `}
`;


const LocalAuthorityPage = () => {
  const { organisationName } = useUserType();
  const [selectedSchool, setSelectedSchool] = useState('all');
  
  // Table columns configuration
  const columns = [
    { header: 'School name', accessor: 'name' },
    { header: 'URN', accessor: 'urn' },
    { header: 'UKPRN', accessor: 'ukprn' },
    { header: 'Phase', accessor: 'phase' },
    { header: 'School type', accessor: 'type' },
    { header: 'Establishment type', accessor: 'establishmentType' },
    { header: 'Academy trust name', accessor: 'academyTrustName' },
    { header: 'Academy trust type', accessor: 'academyTrustType' },
    { header: 'Pupils', accessor: 'pupils' },
    { header: 'Attendance', accessor: 'attendance' },
    { header: 'Absence', accessor: 'absence' },
    { header: 'Authorised', accessor: 'authorised' },
    { header: 'Unauthorised', accessor: 'unauthorised' },
    { header: 'Persistently absent', accessor: 'persistentlyAbsent' },
    { header: 'Persistently absent %', accessor: 'persistentlyAbsentPercentage' },
    { header: 'Severely absent', accessor: 'severelyAbsent' },
    { header: 'Severely absent %', accessor: 'severelyAbsentPercentage' }
  ];
  
  // Filter schools based on selection
  const filteredSchools = selectedSchool === 'all' 
    ? schoolsData 
    : schoolsData.filter(school => school.name.toLowerCase().replace(' ', '-') === selectedSchool);
  
  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };
  
  return (
    <Container>
      <PageTitle>Local authority attendance data</PageTitle>
      
      <UpdatesSection />
      
      <TabNavigation />
      
      <ContentContainer>
        <MainContent>
          <SectionTitle>Local Authority Overview: {organisationName || 'Your Local Authority'}</SectionTitle>
          
          <Description>
            Get attendance and absence figures for the whole LA, school and pupil characteristic groups. 
            Use filter panel on the right hand side of the screen to select pupil characteristics. 
            Data is updated daily.
          </Description>
          
          <Select
            id="school-select"
            label="Select School"
            options={schoolOptions}
            value={selectedSchool}
            onChange={handleSchoolChange}
          />
          
          <StatsContainer>
            <StatBox color="#1d70b8">
              <StatValue>{localAuthorityOverviewData.numberOfSchools}</StatValue>
              <StatLabel>Number of schools</StatLabel>
            </StatBox>
            <StatBox color="#1d70b8">
              <StatValue>{localAuthorityOverviewData.numberOfPupils}</StatValue>
              <StatLabel>Number of pupils</StatLabel>
            </StatBox>
            <StatBox color="#1d70b8">
              <StatValue>{localAuthorityOverviewData.overallAttendance}</StatValue>
              <StatLabel>Overall attendance</StatLabel>
            </StatBox>
            <StatBox color="#1d70b8">
              <StatValue>{localAuthorityOverviewData.persistentlyAbsentPupils}</StatValue>
              <StatLabel>Persistently absent pupils</StatLabel>
            </StatBox>
            <StatBox color="#1d70b8">
              <StatValue>{localAuthorityOverviewData.severelyAbsentPupils}</StatValue>
              <StatLabel>Severely absent pupils</StatLabel>
            </StatBox>
          </StatsContainer>
          
          <TableContainer>
            <DataTable 
              columns={columns} 
              data={filteredSchools} 
            />
          </TableContainer>
          
          <LastUpdated>Last updated: 4 September 2025</LastUpdated>
        </MainContent>
        
        <SidebarContent>
          <Filters />
        </SidebarContent>
      </ContentContainer>
      
      <SupportSection />
    </Container>
  );
};

export default LocalAuthorityPage;
