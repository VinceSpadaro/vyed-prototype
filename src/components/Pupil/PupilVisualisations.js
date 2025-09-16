import React, { useState } from 'react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { media } from '../../styles/mediaQueries';
import Dropdown from '../Common/Dropdown';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  
  ${media.medium`
    flex-direction: column;
    align-items: center;
  `}
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  
  ${media.medium`
    margin-right: 0;
    margin-bottom: 10px;
  `}
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

const PupilVisualisations = ({ selectedPupil }) => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [dateRange, setDateRange] = useState('all');
  
  // Generate dates for the chart (last 20 weeks)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 19; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 7);
      dates.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }));
    }
    
    return dates;
  };
  
  // Generate random attendance data
  const generateAttendanceData = () => {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 70);
  };
  
  // Generate random school average data
  const generateSchoolData = () => {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 10) + 85);
  };
  
  // Data for line charts (attendance, absence, unauthorised)
  const lineChartData = {
    labels: generateDates(),
    datasets: [
      {
        label: 'Selected pupil',
        data: generateAttendanceData(),
        borderColor: '#1d70b8',
        backgroundColor: 'rgba(29, 112, 184, 0.5)',
        tension: 0.1,
        pointRadius: 3,
      },
      {
        label: 'Overall School',
        data: generateSchoolData(),
        borderColor: '#d4351c',
        backgroundColor: 'rgba(212, 53, 28, 0.5)',
        tension: 0.1,
        pointRadius: 3,
        borderDash: [5, 5],
      },
    ],
  };
  
  // Data for weekly bar chart
  const weeklyChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Present',
        data: [80, 78, 75, 77, 76],
        backgroundColor: '#1d70b8',
        barPercentage: 1,
        categoryPercentage: 0.9,
        stack: 'Stack 0',
      },
      {
        label: 'Authorised absence',
        data: [15, 17, 15, 18, 19],
        backgroundColor: '#b1b4b6',
        barPercentage: 1,
        categoryPercentage: 0.9,
        stack: 'Stack 0',
      },
      {
        label: 'Unauthorised absence',
        data: [5, 5, 10, 5, 5],
        backgroundColor: '#d4351c',
        barPercentage: 1,
        categoryPercentage: 0.9,
        stack: 'Stack 0',
      },
    ],
  };
  
  // Options for line charts
  const lineChartOptions = {
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
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  // Options for weekly bar chart
  const weeklyChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Percentage %'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Day of the week'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
  };
  
  return (
    <Container>
      <PageTitle>Data visualisations</PageTitle>
      <Description>
        Select a term from the drop down to get data visualisations for attendance, absence and unauthorised absence for a pupil. This page is updated weekly.
      </Description>
      
      <DateRangeContainer>
        <Dropdown
          label="Select a date range"
          options={[
            { value: 'all', label: 'All' },
            { value: 'autumn', label: 'Autumn term' },
            { value: 'spring', label: 'Spring term' },
            { value: 'summer', label: 'Summer term' }
          ]}
          value={dateRange}
          onChange={(value) => setDateRange(value)}
        />
      </DateRangeContainer>
      
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
          active={activeTab === 'unauthorised'} 
          onClick={() => setActiveTab('unauthorised')}
        >
          Unauthorised absence %
        </Tab>
        <Tab 
          active={activeTab === 'weekly'} 
          onClick={() => setActiveTab('weekly')}
        >
          Weekly chart
        </Tab>
      </TabsContainer>
      
      <ChartContainer>
        {activeTab !== 'weekly' ? (
          <>
            <ChartDescription>
              Graph showing {activeTab === 'attendance' ? 'attendance' : activeTab === 'absence' ? 'absence' : 'unauthorised absence'} % for selected pupil and overall school. Use the slider on the left to zoom in and out.
            </ChartDescription>
            
            <div style={{ height: '400px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
            
            <ChartLegend>
              <LegendItem>
                <LegendColor color="#1d70b8" />
                <LegendText>Selected pupil</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#d4351c" />
                <LegendText>Overall School</LegendText>
              </LegendItem>
            </ChartLegend>
          </>
        ) : (
          <>
            <ChartDescription>
              Chart showing number of sessions and % of present, authorised absence and unauthorised absence per day.
            </ChartDescription>
            
            <div style={{ height: '400px' }}>
              <Bar data={weeklyChartData} options={weeklyChartOptions} />
            </div>
            
            <ChartLegend>
              <LegendItem>
                <LegendColor color="#1d70b8" />
                <LegendText>Present</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#b1b4b6" />
                <LegendText>Authorised absence</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#d4351c" />
                <LegendText>Unauthorised absence</LegendText>
              </LegendItem>
            </ChartLegend>
          </>
        )}
      </ChartContainer>
      
      <DateInfo>Latest session available: 07/03/2025</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilVisualisations;
