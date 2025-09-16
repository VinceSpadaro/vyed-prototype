import React, { useState } from 'react';
import styled from 'styled-components';
import AttendanceLineChart from './AttendanceLineChart';
import AbsenceLineChart from './AbsenceLineChart';
import UnauthorisedAbsenceLineChart from './UnauthorisedAbsenceLineChart';
import Dropdown from '../Common/Dropdown';

// Styled components for the school stats dashboard
const Container = styled.div`
  padding: 0;
  margin-bottom: 30px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const HowFiltersWork = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const HowFiltersTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const HowFiltersDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;

const TermSelectorContainer = styled.div`
  margin: 20px 0;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #b1b4b6;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => props.active ? '#f3f2f1' : 'transparent'};
  border: 1px solid #b1b4b6;
  border-bottom: ${props => props.active ? '1px solid white' : '1px solid #b1b4b6'};
  margin-bottom: -1px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const FullscreenLink = styled.a`
  display: block;
  margin-top: 20px;
  color: #1d70b8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const YearToDateComparison = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedTerm, setSelectedTerm] = useState('all');
  
  return (
    <Container>
      <Title>Year-to-date comparison</Title>
      <Description>
        Compare attendance, absence and unauthorised absence in the current academic year-to-date to the previous year. Data is updated weekly.
      </Description>
      
      <HowFiltersWork>
        <HowFiltersTitle>How filters work on this page</HowFiltersTitle>
        <HowFiltersDescription>
          Filters identify a cohort of pupils based on their last recorded characteristics. Results are for the current year compared to their attendance last year. For example, selecting the filter for year 8 shows you the attendance outcomes of the current year 8 cohort, compared to their outcomes in year 7 (the previous academic year).
        </HowFiltersDescription>
      </HowFiltersWork>
      
      <TermSelectorContainer>
        <Dropdown
          label="Select a term"
          options={[
            { value: 'all', label: 'All' },
            { value: 'autumn', label: 'Autumn 2024-2025' },
            { value: 'spring', label: 'Spring 2024-2025' },
            { value: 'summer', label: 'Summer 2024-2025' }
          ]}
          value={selectedTerm}
          onChange={(value) => setSelectedTerm(value)}
        />
      </TermSelectorContainer>
      
      <TabContainer>
        <Tab active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>Attendance %</Tab>
        <Tab active={activeTab === 'absence'} onClick={() => setActiveTab('absence')}>Absence %</Tab>
        <Tab active={activeTab === 'unauthorised'} onClick={() => setActiveTab('unauthorised')}>Unauthorised absence %</Tab>
      </TabContainer>
      
      {activeTab === 'attendance' && <AttendanceLineChart />}
      
      {activeTab === 'absence' && <AbsenceLineChart />}
      
      {activeTab === 'unauthorised' && <UnauthorisedAbsenceLineChart />}
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default YearToDateComparison;
