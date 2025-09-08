import React from 'react';
import styled from 'styled-components';
import AcademicYearTable from '../Common/AcademicYearTable';

const Container = styled.div`
  padding: 0;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #0b0c0c;
`;


const PreviousAcademicYear = () => {
  // Data from the screenshot
  const data = {
    autumn: [
      { year: '2023-2024', attendance: '92.1%', absence: '11.2%', unauthorised: '8.5%' },
      { year: '2024-2025', attendance: '98.3%', absence: '13.6%', unauthorised: '2.8%' },
      { trends: { attendance: 'up', absence: 'up', unauthorised: 'down' } }
    ],
    spring: [
      { year: '2023-2024', attendance: '95.6%', absence: '0.2%', unauthorised: '7.4%' },
      { year: '2024-2025', attendance: '89.8%', absence: '13.4%', unauthorised: '6.4%' },
      { trends: { attendance: 'down', absence: 'up', unauthorised: 'down' } }
    ],
    summer: [
      { year: '2023-2024', attendance: '90.8%', absence: '10.2%', unauthorised: '9.2%' },
      { year: '2024-2025', attendance: '94.6%', absence: '0.1%', unauthorised: '9.6%' },
      { trends: { attendance: 'up', absence: 'down', unauthorised: 'up' } }
    ],
    overall: [
      { year: '2023-2024', attendance: '88.2%', absence: '15.4%', unauthorised: '3.1%' },
      { year: '2024-2025', attendance: '83.3%', absence: '12.7%', unauthorised: '7.7%' },
      { trends: { attendance: 'down', absence: 'down', unauthorised: 'up' } }
    ]
  };

  const formatTermData = (termName, termData) => {
    const capitalizedTerm = termName.charAt(0).toUpperCase() + termName.slice(1);
    
    return {
      name: capitalizedTerm,
      rows: termData.slice(0, 2).map(row => ({
        term: `${capitalizedTerm} ${row.year}`,
        attendance: row.attendance,
        absence: row.absence,
        unauthorised: row.unauthorised
      })),
      trends: {
        attendance: termData[2].trends.attendance,
        absence: termData[2].trends.absence,
        unauthorised: termData[2].trends.unauthorised
      }
    };
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
          formatTermData('autumn', data.autumn),
          formatTermData('spring', data.spring),
          formatTermData('summer', data.summer),
          formatTermData('overall', data.overall)
        ]}
      />
    </Container>
  );
};

export default PreviousAcademicYear;
