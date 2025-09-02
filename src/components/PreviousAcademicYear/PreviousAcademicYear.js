import React from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

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

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid #b1b4b6;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: bold;
  color: #0b0c0c;
`;

const TableBody = styled.tbody``;

const TermRow = styled.tr`
  background-color: #f8f8f8;
  font-weight: bold;
`;

const DataRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f2f1;
  }
  border-bottom: 1px solid #e5e5e5;
`;

const TableCell = styled.td`
  padding: 10px;
  color: #0b0c0c;
`;

const TrendCell = styled.td`
  color: ${props => props.trend === 'up' ? '#00703c' : '#d4351c'};
  text-align: left;
  padding: 10px;
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

  const renderTrend = (trend) => {
    if (trend === 'up') {
      return <FaArrowUp />;
    } else if (trend === 'down') {
      return <FaArrowDown />;
    }
    return null;
  };

  const renderTermSection = (termName, termData) => {
    const capitalizedTerm = termName.charAt(0).toUpperCase() + termName.slice(1);
    
    return (
      <>
        <TermRow>
          <TableCell colSpan="4">{capitalizedTerm}</TableCell>
        </TermRow>
        {termData.slice(0, 2).map((row, index) => (
          <DataRow key={index}>
            <TableCell>{`${capitalizedTerm} ${row.year}`}</TableCell>
            <TableCell>{row.attendance}</TableCell>
            <TableCell>{row.absence}</TableCell>
            <TableCell>{row.unauthorised}</TableCell>
          </DataRow>
        ))}
        <tr>
          <td></td>
          <TrendCell trend={termData[2].trends.attendance}>
            {renderTrend(termData[2].trends.attendance)}
          </TrendCell>
          <TrendCell trend={termData[2].trends.absence}>
            {renderTrend(termData[2].trends.absence)}
          </TrendCell>
          <TrendCell trend={termData[2].trends.unauthorised}>
            {renderTrend(termData[2].trends.unauthorised)}
          </TrendCell>
        </tr>
      </>
    );
  };

  return (
    <Container>
      <Title>Previous academic year</Title>
      <Description>
        Use this page to compare previous academic years to the current year. Data is updated daily.
      </Description>
      
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Term</TableHeader>
              <TableHeader>Attendance %</TableHeader>
              <TableHeader>Absence %</TableHeader>
              <TableHeader>Unauthorised absence %</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {renderTermSection('autumn', data.autumn)}
            {renderTermSection('spring', data.spring)}
            {renderTermSection('summer', data.summer)}
            {renderTermSection('overall', data.overall)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PreviousAcademicYear;
