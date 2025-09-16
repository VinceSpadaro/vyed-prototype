import React, { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Dropdown from '../Common/Dropdown';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const TermSelectorContainer = styled.div`
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
  margin-bottom: 30px;
  border: 1px solid #b1b4b6;
  padding: 20px;
`;

const ChartDescription = styled.p`
  margin-bottom: 20px;
`;

const ChartLegend = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const LegendText = styled.span``;

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

const PupilYearToDateComparison = ({ selectedPupil }) => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedTerm, setSelectedTerm] = useState('all');
  
  // Generate academic week labels (1-48)
  const generateWeekLabels = () => {
    const weeks = [];
    for (let i = 1; i <= 48; i++) {
      weeks.push(i);
    }
    return weeks;
  };
  
  // Generate random data for current academic year
  const generateCurrentYearData = () => {
    return Array.from({ length: 48 }, () => Math.floor(Math.random() * 30) + 70);
  };
  
  // Generate random data for previous academic year
  const generatePreviousYearData = () => {
    return Array.from({ length: 48 }, () => Math.floor(Math.random() * 30) + 70);
  };
  
  const chartData = {
    labels: generateWeekLabels(),
    datasets: [
      {
        label: '2024/2025',
        data: generateCurrentYearData(),
        borderColor: '#1d70b8',
        backgroundColor: 'rgba(29, 112, 184, 0.5)',
        tension: 0.1,
        pointRadius: 3,
      },
      {
        label: '2023/2024',
        data: generatePreviousYearData(),
        borderColor: '#d4351c',
        backgroundColor: 'rgba(212, 53, 28, 0.5)',
        tension: 0.1,
        pointRadius: 3,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Academic week'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  // Format date for the latest session
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const handleTermChange = (value) => {
    setSelectedTerm(value);
  };
  
  return (
    <Container>
      <PageTitle>Year-to-date comparison</PageTitle>
      <Description>
        Use this page to compare current academic year-to-date data with the previous year for a pupil. Data is updated weekly.
      </Description>
      
      <TermSelectorContainer>
        <Dropdown
          label="Select a term"
          options={[
            { value: 'all', label: 'All' },
            { value: 'autumn', label: 'Autumn' },
            { value: 'spring', label: 'Spring' },
            { value: 'summer', label: 'Summer' }
          ]}
          value={selectedTerm}
          onChange={handleTermChange}
        />
      </TermSelectorContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'attendance'} 
          onClick={() => setActiveTab('attendance')}
        >
          Attendance %
        </Tab>
        <Tab 
          active={activeTab === 'absence'} 
          onClick={() => setActiveTab('absence')}
        >
          Absence %
        </Tab>
        <Tab 
          active={activeTab === 'unauthorized'} 
          onClick={() => setActiveTab('unauthorized')}
        >
          Unauthorised absence %
        </Tab>
      </TabsContainer>
      
      <ChartContainer>
        <ChartDescription>
          Graph showing year-to-date and previous academic year attendance for selected pupil. Use the slider on the left to zoom in and out.
        </ChartDescription>
        
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <ChartLegend>
          <LegendItem>
            <LegendColor color="#1d70b8" />
            <LegendText>2024/2025</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#d4351c" />
            <LegendText>2023/2024</LegendText>
          </LegendItem>
        </ChartLegend>
      </ChartContainer>
      
      <DateInfo>Latest session available: {formatDate()}</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilYearToDateComparison;
