import React, { useState } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import DataTable from '../Common/DataTable';

const Container = styled.div`
  padding: 0;
  margin-bottom: 30px;
  width: 100%;
  overflow: visible;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
`;

const GuidanceLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
  
  &:hover {
    color: #003078;
  }
`;

const InfoText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 0;
  border-bottom: 1px solid #b1b4b6;
`;

const Tab = styled.button`
  padding: 12px 20px;
  background: ${props => props.active ? '#fff' : '#f3f2f1'};
  border: 1px solid #b1b4b6;
  border-bottom: ${props => props.active ? '0' : '1px solid #b1b4b6'};
  margin-right: 5px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  bottom: -1px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background: ${props => props.active ? '#fff' : '#e8e8e8'};
  }
`;

const LatestSession = styled.div`
  font-size: 14px;
  color: #505a5f;
  margin-top: 20px;
  font-weight: bold;
`;

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #b1b4b6;
  border-top: 0;
`;

// Generate synthetic data for 10 days of continuous absence
const generateContinuousAbsenceData = () => {
  faker.seed(456); // Set seed for consistent data
  const data = [];
  
  for (let i = 0; i < 15; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const upn = faker.string.alphanumeric({ length: 13, casing: 'upper' });
    const schoolName = faker.helpers.arrayElement([
      'Oakwood Primary School',
      'Riverside Academy',
      'St. Mary\'s Catholic School',
      'Greenfield High School',
      'Brookside Community School',
      'Hillside Secondary School',
      'Meadowbrook Primary',
      'Westfield Academy'
    ]);
    const ukprn = faker.string.numeric(8);
    const firstAbsenceDate = faker.date.between({ from: '2025-09-01', to: '2025-10-15' });
    const lastAbsenceDate = faker.date.between({ from: firstAbsenceDate, to: '2025-11-26' });
    const totalSessionsAbsent = faker.number.int({ min: 20, max: 45 });
    const currentlyAbsent = faker.helpers.arrayElement(['Yes', 'No']);
    
    data.push({
      pupilName: `${firstName} ${lastName}`,
      upn,
      schoolName,
      schoolUkprn: ukprn,
      firstAbsenceDate: firstAbsenceDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      lastAbsenceDate: lastAbsenceDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      totalSessionsAbsent,
      currentlyAbsent
    });
  }
  
  return data;
};

// Generate synthetic data for 15 days of sickness
const generateSicknessData = () => {
  faker.seed(789); // Set seed for consistent data
  const data = [];
  
  for (let i = 0; i < 12; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const upn = faker.string.alphanumeric({ length: 13, casing: 'upper' });
    const schoolName = faker.helpers.arrayElement([
      'Oakwood Primary School',
      'Riverside Academy',
      'St. Mary\'s Catholic School',
      'Greenfield High School',
      'Brookside Community School',
      'Hillside Secondary School',
      'Meadowbrook Primary',
      'Westfield Academy'
    ]);
    const ukprn = faker.string.numeric(8);
    const daysWithSickness = faker.number.int({ min: 41, max: 54 });
    
    data.push({
      pupilName: `${firstName} ${lastName}`,
      upn,
      schoolName,
      schoolUkprn: ukprn,
      daysWithSickness
    });
  }
  
  return data;
};

const AttendanceReturns = () => {
  const [activeTab, setActiveTab] = useState('continuous');
  
  const continuousAbsenceData = generateContinuousAbsenceData();
  const sicknessData = generateSicknessData();
  
  // Column definitions for 10 days of continuous absence
  const continuousAbsenceColumns = [
    { header: 'Pupil name', accessor: 'pupilName' },
    { header: 'UPN', accessor: 'upn' },
    { header: 'School name', accessor: 'schoolName' },
    { header: 'School UKPRN', accessor: 'schoolUkprn' },
    { header: 'First absence date', accessor: 'firstAbsenceDate' },
    { header: 'Last absence date', accessor: 'lastAbsenceDate' },
    { header: 'Total sessions absent', accessor: 'totalSessionsAbsent' },
    { header: 'Currently absent', accessor: 'currentlyAbsent' }
  ];
  
  // Column definitions for 15 days of sickness
  const sicknessColumns = [
    { header: 'Pupil Name', accessor: 'pupilName' },
    { header: 'UPN', accessor: 'upn' },
    { header: 'School Name', accessor: 'schoolName' },
    { header: 'School UKPRN', accessor: 'schoolUkprn' },
    { header: 'Number of days that contain a sickness code', accessor: 'daysWithSickness' }
  ];
  
  return (
    <Container>
      <Title>Attendance and sickness returns</Title>
      <Description>
        Identify pupils who meet the criteria for attendance and sickness returns in your local authority (page 21 of the{' '}
        <GuidanceLink 
          href="https://assets.publishing.service.gov.uk/media/66bf300da44f1c4c23e5bd1b/Working_together_to_improve_school_attendance_-_August_2024.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Working together to improve school attendance guidance
        </GuidanceLink>
        ). Results are for the current academic year-to-date and updated daily.
      </Description>
      <InfoText>
        This page is not intended to display pupils who have met the national threshold for penalty notices.
      </InfoText>
      <GuidanceLink 
        href="https://www.gov.uk/government/publications/monitor-your-school-attendance-user-guide/monitor-your-school-attendance-user-guide"
        target="_blank"
        rel="noopener noreferrer"
      >
        How we calculate results and how to use this report.
      </GuidanceLink>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'continuous'} 
          onClick={() => setActiveTab('continuous')}
        >
          10 days of continuous absence
        </Tab>
        <Tab 
          active={activeTab === 'sickness'} 
          onClick={() => setActiveTab('sickness')}
        >
          15 days of sickness
        </Tab>
      </TabContainer>
      
      {activeTab === 'continuous' && (
        <TableWrapper>
          <DataTable 
            columns={continuousAbsenceColumns} 
            data={continuousAbsenceData} 
          />
        </TableWrapper>
      )}
      
      {activeTab === 'sickness' && (
        <TableWrapper>
          <DataTable 
            columns={sicknessColumns} 
            data={sicknessData} 
          />
        </TableWrapper>
      )}
      
      <LatestSession>
        Latest session available<br />
        21/11/2025
      </LatestSession>
    </Container>
  );
};

export default AttendanceReturns;
