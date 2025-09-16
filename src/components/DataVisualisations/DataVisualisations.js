import React, { useState } from 'react';
import styled from 'styled-components';
import LineChart from './LineChart';
import Dropdown from '../Common/Dropdown';

const Container = styled.div`
  padding: 20px 20px 20px 20px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

const DateRangeContainer = styled.div`
  margin-bottom: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #b1b4b6;
`;

const Tab = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.active ? '#f3f2f1' : 'transparent'};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: #f3f2f1;
  }
`;

const ChartContainer = styled.div`
  margin-bottom: 20px;
`;

const ChartDescription = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
`;

const FullscreenLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  color: #1d70b8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LatestSession = styled.div`
  font-size: 12px;
  color: #6f777b;
  margin-bottom: 10px;
`;

const DataVisualisations = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [dateRange, setDateRange] = useState('all');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const getChartDescription = () => {
    switch(activeTab) {
      case 'attendance':
        return 'Graph showing attendance % for different pupil groups. Use the key to identify pupil groups. Zoom in and out using the slider on the right.';
      case 'absence':
        return 'Graph showing absence % for different pupil group. Use the key to identify pupil groups. Zoom in and out using the slider on the left.';
      case 'unauthorised':
        return 'Graph showing unauthorised absence % for different pupil group. Use the key to identify pupil groups. Zoom in and out using the slider on the left.';
      default:
        return '';
    }
  };
  
  return (
    <Container>
      <Title>Data visualisations</Title>
      <Description>
        Select a form from the drop down to get data visualisations for attendance, absence and unauthorised absence for your school.
        Updated each week.
      </Description>
      
      <DateRangeContainer>
        <Dropdown
          label="Select a date range"
          options={[
            { value: 'all', label: 'All' },
            { value: 'autumn', label: 'Autumn 2024-2025' },
            { value: 'spring', label: 'Spring 2024-2025' }
          ]}
          value={dateRange}
          onChange={(value) => setDateRange(value)}
        />
      </DateRangeContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'attendance'} 
          onClick={() => handleTabClick('attendance')}
        >
          Attendance %
        </Tab>
        <Tab 
          active={activeTab === 'absence'} 
          onClick={() => handleTabClick('absence')}
        >
          Absence %
        </Tab>
        <Tab 
          active={activeTab === 'unauthorised'} 
          onClick={() => handleTabClick('unauthorised')}
        >
          Unauthorised absence %
        </Tab>
      </TabsContainer>
      
      <ChartContainer>
        <ChartDescription>
          {getChartDescription()}
        </ChartDescription>
        <LineChart chartType={activeTab} />
      </ChartContainer>
      
      <LatestSession>Latest session available: 07/03/2023</LatestSession>
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default DataVisualisations;
