import React from 'react';
import styled from 'styled-components';
import AcademicYearTable from '../Common/AcademicYearTable';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
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

const PupilPreviousYear = ({ selectedPupil }) => {
  // Generate random data for the table
  const generateAttendanceData = () => {
    return {
      attendance: (Math.random() * 20 + 80).toFixed(1),
      absence: (Math.random() * 20).toFixed(1),
      unauthorized: (Math.random() * 10).toFixed(1)
    };
  };
  
  // Generate data for different terms
  const rawData = {
    autumn2023: generateAttendanceData(),
    autumn2024: generateAttendanceData(),
    spring2023: generateAttendanceData(),
    spring2024: generateAttendanceData(),
    summer2023: generateAttendanceData(),
    summer2024: generateAttendanceData(),
    overall2023: generateAttendanceData(),
    overall2024: generateAttendanceData()
  };
  
  // Helper function to determine trend
  const getTrend = (current, previous) => {
    const diff = parseFloat(current) - parseFloat(previous);
    if (diff > 0) return 'up';
    if (diff < 0) return 'down';
    return 'same';
  };
  
  // Format data for the AcademicYearTable component
  const formatTermData = (termName) => {
    const currentYear = `${termName}2024`;
    const previousYear = `${termName}2023`;
    
    return {
      name: termName.charAt(0).toUpperCase() + termName.slice(1),
      rows: [
        {
          term: `${termName.charAt(0).toUpperCase() + termName.slice(1)} 2023-2024`,
          attendance: `${rawData[previousYear].attendance}%`,
          absence: `${rawData[previousYear].absence}%`,
          unauthorised: `${rawData[previousYear].unauthorized}%`
        },
        {
          term: `${termName.charAt(0).toUpperCase() + termName.slice(1)} 2024-2025`,
          attendance: `${rawData[currentYear].attendance}%`,
          absence: `${rawData[currentYear].absence}%`,
          unauthorised: `${rawData[currentYear].unauthorized}%`
        }
      ],
      trends: {
        attendance: getTrend(rawData[currentYear].attendance, rawData[previousYear].attendance),
        absence: getTrend(rawData[currentYear].absence, rawData[previousYear].absence),
        unauthorised: getTrend(rawData[currentYear].unauthorized, rawData[previousYear].unauthorized)
      }
    };
  };
  
  // Format date for the latest session
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  return (
    <Container>
      <Title>Previous academic year</Title>
      <Description>
        Use this page to compare previous academic years to the current year. Data is updated daily.
      </Description>
      
      <AcademicYearTable 
        columns={[
          { key: 'term', header: 'Term' },
          { key: 'attendance', header: 'Attendance %' },
          { key: 'absence', header: 'Absence %' },
          { key: 'unauthorised', header: 'Unauthorised absence %' }
        ]}
        terms={[
          formatTermData('autumn'),
          formatTermData('spring'),
          formatTermData('summer'),
          formatTermData('overall')
        ]}
      />
      
      <DateInfo>Latest session available: {formatDate()}</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilPreviousYear;
