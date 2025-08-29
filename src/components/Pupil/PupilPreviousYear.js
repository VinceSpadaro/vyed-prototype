import React from 'react';
import styled from 'styled-components';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

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

const TableContainer = styled.div`
  margin-bottom: 30px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #b1b4b6;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f2f1;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #b1b4b6;
`;

const TrendCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #b1b4b6;
  color: #d4351c;
  text-align: left;
`;

const TrendHeader = styled.tr`
  font-weight: bold;
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
  const data = {
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
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Term</TableHeader>
              <TableHeader>Attendance %</TableHeader>
              <TableHeader>Absence %</TableHeader>
              <TableHeader>Unauthorised absence %</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TrendHeader>
              <td colSpan="4">Autumn</td>
            </TrendHeader>
            <TableRow>
              <TableCell>Autumn 2023-2024</TableCell>
              <TableCell>{data.autumn2023.attendance}%</TableCell>
              <TableCell>{data.autumn2023.absence}%</TableCell>
              <TableCell>{data.autumn2023.unauthorized}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Autumn 2024-2025</TableCell>
              <TableCell>{data.autumn2024.attendance}%</TableCell>
              <TableCell>{data.autumn2024.absence}%</TableCell>
              <TableCell>{data.autumn2024.unauthorized}%</TableCell>
            </TableRow>
            <tr>
              <td></td>
              <TrendCell trend={getTrend(data.autumn2024.attendance, data.autumn2023.attendance)}>
                {getTrend(data.autumn2024.attendance, data.autumn2023.attendance) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.autumn2024.attendance, data.autumn2023.attendance) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.autumn2024.absence, data.autumn2023.absence)}>
                {getTrend(data.autumn2024.absence, data.autumn2023.absence) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.autumn2024.absence, data.autumn2023.absence) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.autumn2024.unauthorized, data.autumn2023.unauthorized)}>
                {getTrend(data.autumn2024.unauthorized, data.autumn2023.unauthorized) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.autumn2024.unauthorized, data.autumn2023.unauthorized) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
            </tr>
            
            <TrendHeader>
              <td colSpan="4">Spring</td>
            </TrendHeader>
            <TableRow>
              <TableCell>Spring 2023-2024</TableCell>
              <TableCell>{data.spring2023.attendance}%</TableCell>
              <TableCell>{data.spring2023.absence}%</TableCell>
              <TableCell>{data.spring2023.unauthorized}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spring 2024-2025</TableCell>
              <TableCell>{data.spring2024.attendance}%</TableCell>
              <TableCell>{data.spring2024.absence}%</TableCell>
              <TableCell>{data.spring2024.unauthorized}%</TableCell>
            </TableRow>
            <tr>
              <td></td>
              <TrendCell trend={getTrend(data.spring2024.attendance, data.spring2023.attendance)}>
                {getTrend(data.spring2024.attendance, data.spring2023.attendance) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.spring2024.attendance, data.spring2023.attendance) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.spring2024.absence, data.spring2023.absence)}>
                {getTrend(data.spring2024.absence, data.spring2023.absence) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.spring2024.absence, data.spring2023.absence) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.spring2024.unauthorized, data.spring2023.unauthorized)}>
                {getTrend(data.spring2024.unauthorized, data.spring2023.unauthorized) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.spring2024.unauthorized, data.spring2023.unauthorized) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
            </tr>
            
            <TrendHeader>
              <td colSpan="4">Summer</td>
            </TrendHeader>
            <TableRow>
              <TableCell>Summer 2023-2024</TableCell>
              <TableCell>{data.summer2023.attendance}%</TableCell>
              <TableCell>{data.summer2023.absence}%</TableCell>
              <TableCell>{data.summer2023.unauthorized}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summer 2024-2025</TableCell>
              <TableCell>{data.summer2024.attendance}%</TableCell>
              <TableCell>{data.summer2024.absence}%</TableCell>
              <TableCell>{data.summer2024.unauthorized}%</TableCell>
            </TableRow>
            <tr>
              <td></td>
              <TrendCell trend={getTrend(data.summer2024.attendance, data.summer2023.attendance)}>
                {getTrend(data.summer2024.attendance, data.summer2023.attendance) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.summer2024.attendance, data.summer2023.attendance) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.summer2024.absence, data.summer2023.absence)}>
                {getTrend(data.summer2024.absence, data.summer2023.absence) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.summer2024.absence, data.summer2023.absence) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.summer2024.unauthorized, data.summer2023.unauthorized)}>
                {getTrend(data.summer2024.unauthorized, data.summer2023.unauthorized) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.summer2024.unauthorized, data.summer2023.unauthorized) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
            </tr>
            
            <TrendHeader>
              <td colSpan="4">Overall</td>
            </TrendHeader>
            <TableRow>
              <TableCell>Overall 2023-2024</TableCell>
              <TableCell>{data.overall2023.attendance}%</TableCell>
              <TableCell>{data.overall2023.absence}%</TableCell>
              <TableCell>{data.overall2023.unauthorized}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Overall 2024-2025</TableCell>
              <TableCell>{data.overall2024.attendance}%</TableCell>
              <TableCell>{data.overall2024.absence}%</TableCell>
              <TableCell>{data.overall2024.unauthorized}%</TableCell>
            </TableRow>
            <tr>
              <td></td>
              <TrendCell trend={getTrend(data.overall2024.attendance, data.overall2023.attendance)}>
                {getTrend(data.overall2024.attendance, data.overall2023.attendance) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.overall2024.attendance, data.overall2023.attendance) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.overall2024.absence, data.overall2023.absence)}>
                {getTrend(data.overall2024.absence, data.overall2023.absence) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.overall2024.absence, data.overall2023.absence) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
              <TrendCell trend={getTrend(data.overall2024.unauthorized, data.overall2023.unauthorized)}>
                {getTrend(data.overall2024.unauthorized, data.overall2023.unauthorized) === 'up' ? <FaArrowUp /> : 
                 getTrend(data.overall2024.unauthorized, data.overall2023.unauthorized) === 'down' ? <FaArrowDown /> : '-'}
              </TrendCell>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
      
      <DateInfo>Latest session available: {formatDate()}</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilPreviousYear;
