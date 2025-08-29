import React, { useState } from 'react';
import styled from 'styled-components';

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

const CodeSelectorContainer = styled.div`
  margin-bottom: 20px;
`;

const CodeSelectorLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CodeGlossaryLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
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

const CheckboxContainer = styled.div`
  margin-bottom: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 10px;
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

const PupilAttendanceCodes = ({ selectedPupil }) => {
  const [selectedCodes, setSelectedCodes] = useState([]);
  
  // Attendance code data
  const attendanceCodes = [
    { code: '/', name: 'Present (AM)', description: 'Present in the morning session' },
    { code: '\\', name: 'Present (PM)', description: 'Present in the afternoon session' },
    { code: 'B', name: 'Educated off site', description: 'Educated off site (not dual registration)' },
    { code: 'C', name: 'Other authorised circumstances', description: 'Other authorised circumstances' },
    { code: 'E', name: 'Excluded', description: 'Excluded but no alternative provision made' },
    { code: 'I', name: 'Illness', description: 'Not Medical or dental appointments' },
    { code: 'L', name: 'Late', description: 'Late (before registers closed)' },
    { code: 'O', name: 'Unauthorised absence', description: 'Unauthorised absence' },
    { code: 'U', name: 'Late', description: 'Late (after registers closed)' }
  ];
  
  // Generate random attendance data for the selected pupil
  const generateAttendanceData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
      const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      
      // Randomly assign morning and afternoon codes
      const morningCode = attendanceCodes[Math.floor(Math.random() * attendanceCodes.length)].code;
      const afternoonCode = attendanceCodes[Math.floor(Math.random() * attendanceCodes.length)].code;
      
      data.push({
        date: `${dayName} ${dateStr}`,
        morningCode,
        afternoonCode
      });
    }
    
    return data;
  };
  
  const attendanceData = generateAttendanceData();
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCodes(attendanceCodes.map(code => code.code));
    } else {
      setSelectedCodes([]);
    }
  };
  
  const handleCodeSelect = (code) => {
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
    } else {
      setSelectedCodes([...selectedCodes, code]);
    }
  };
  
  // Format date for the latest session
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  return (
    <Container>
      <PageTitle>Attendance codes</PageTitle>
      <Description>
        Select an attendance code to see when it has been used. View the <CodeGlossaryLink href="#">attendance code glossary</CodeGlossaryLink>.
      </Description>
      
      <CodeSelectorContainer>
        <CodeSelectorLabel>Select attendance codes to view</CodeSelectorLabel>
        <CheckboxContainer>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              checked={selectedCodes.length === attendanceCodes.length}
              onChange={handleSelectAll}
            />
            Select all
          </CheckboxLabel>
        </CheckboxContainer>
        
        {attendanceCodes.map((code, index) => (
          <CheckboxContainer key={index}>
            <CheckboxLabel>
              <Checkbox 
                type="checkbox" 
                checked={selectedCodes.includes(code.code)}
                onChange={() => handleCodeSelect(code.code)}
              />
              {code.code} - {code.name}
            </CheckboxLabel>
          </CheckboxContainer>
        ))}
      </CodeSelectorContainer>
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Morning attendance code</TableHeader>
              <TableHeader>Afternoon attendance code</TableHeader>
            </tr>
          </thead>
          <tbody>
            {attendanceData
              .filter(item => 
                (selectedCodes.length === 0) || 
                (selectedCodes.includes(item.morningCode) || selectedCodes.includes(item.afternoonCode))
              )
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell style={{ backgroundColor: selectedCodes.includes(item.morningCode) ? '#f3f2f1' : 'transparent' }}>
                    {item.morningCode}
                  </TableCell>
                  <TableCell style={{ backgroundColor: selectedCodes.includes(item.afternoonCode) ? '#f3f2f1' : 'transparent' }}>
                    {item.afternoonCode}
                  </TableCell>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </TableContainer>
      
      <DateInfo>Latest session available: {formatDate()}</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilAttendanceCodes;
