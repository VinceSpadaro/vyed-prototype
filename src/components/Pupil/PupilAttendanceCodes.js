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
  background-color: white;
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
  
  // Attendance code data with session type (AM, PM, or Both)
  const attendanceCodes = [
    { code: '/', name: 'Present (AM)', description: 'Present in the morning session', session: 'AM' },
    { code: '\\', name: 'Present (PM)', description: 'Present in the afternoon session', session: 'PM' },
    { code: 'B', name: 'Educated off site', description: 'Educated off site (not dual registration)', session: 'Both' },
    { code: 'C', name: 'Other authorised circumstances', description: 'Other authorised circumstances', session: 'Both' },
    { code: 'E', name: 'Excluded', description: 'Excluded but no alternative provision made', session: 'Both' },
    { code: 'I', name: 'Illness', description: 'Not Medical or dental appointments', session: 'Both' },
    { code: 'L', name: 'Late', description: 'Late (before registers closed)', session: 'Both' },
    { code: 'O', name: 'Unauthorised absence', description: 'Unauthorised absence', session: 'Both' },
    { code: 'U', name: 'Late', description: 'Late (after registers closed)', session: 'Both' }
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
  
  // Determine which columns to show based on selected codes
  // Only hide a column if we're specifically filtering for AM or PM codes
  const onlyAMCodesSelected = selectedCodes.length > 0 && selectedCodes.every(code => {
    const codeObj = attendanceCodes.find(c => c.code === code);
    return codeObj && codeObj.session === 'AM';
  });
  
  const onlyPMCodesSelected = selectedCodes.length > 0 && selectedCodes.every(code => {
    const codeObj = attendanceCodes.find(c => c.code === code);
    return codeObj && codeObj.session === 'PM';
  });
  
  // Show morning column unless we're only looking at PM codes
  const showMorningColumn = !onlyPMCodesSelected;
  
  // Show afternoon column unless we're only looking at AM codes
  const showAfternoonColumn = !onlyAMCodesSelected;
  
  // Filter data based on selected codes
  const filteredData = attendanceData.filter(item => {
    if (selectedCodes.length === 0) return true;
    
    // For each selected code, check if it appears in the correct column
    return selectedCodes.some(code => {
      const codeObj = attendanceCodes.find(c => c.code === code);
      if (!codeObj) return false;
      
      // For AM-specific codes, only check morning column
      if (codeObj.session === 'AM') {
        return item.morningCode === code;
      }
      
      // For PM-specific codes, only check afternoon column
      if (codeObj.session === 'PM') {
        return item.afternoonCode === code;
      }
      
      // For general codes (Both), check if the code appears in the exact column the user is interested in
      // This means if they select 'C', we only show rows where 'C' appears in the morning column
      // and we don't show other codes in the afternoon column
      return item.morningCode === code || item.afternoonCode === code;
    });
  });
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCodes(attendanceCodes.map(code => code.code));
    } else {
      setSelectedCodes([]);
    }
  };
  
  const handleCodeSelect = (code) => {
    // If code is already selected, remove it
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
      return;
    }
    
    // Get the session type of the selected code
    const selectedCodeObj = attendanceCodes.find(c => c.code === code);
    if (!selectedCodeObj) return;
    
    // For AM/PM specific codes, we need special handling
    if (selectedCodeObj.session === 'AM' || selectedCodeObj.session === 'PM') {
      // If selecting an AM/PM specific code, we can mix it with 'Both' session codes
      // but not with codes from the opposite session
      const oppositeSession = selectedCodeObj.session === 'AM' ? 'PM' : 'AM';
      
      // Filter out any codes from the opposite session
      const compatibleCodes = selectedCodes.filter(c => {
        const codeObj = attendanceCodes.find(item => item.code === c);
        return codeObj && codeObj.session !== oppositeSession;
      });
      
      setSelectedCodes([...compatibleCodes, code]);
    } else {
      // For 'Both' session codes, just add the code
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
        Select an attendance code to see when it has been used. View the <CodeGlossaryLink href="https://www.gov.uk/government/publications/monitor-your-school-attendance-user-guide/monitor-your-school-attendance-user-guide#export-attendance-and-absence-codes">attendance code glossary</CodeGlossaryLink>.
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
              {showMorningColumn && <TableHeader>Morning attendance code</TableHeader>}
              {showAfternoonColumn && <TableHeader>Afternoon attendance code</TableHeader>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                {showMorningColumn && (
                  <TableCell 
                    style={{ 
                      backgroundColor: 'white',
                      fontWeight: selectedCodes.includes(item.morningCode) ? 'bold' : 'normal'
                    }}
                  >
                    {selectedCodes.length === 0 || selectedCodes.includes(item.morningCode) ? item.morningCode : ''}
                  </TableCell>
                )}
                {showAfternoonColumn && (
                  <TableCell 
                    style={{ 
                      backgroundColor: 'white',
                      fontWeight: selectedCodes.includes(item.afternoonCode) ? 'bold' : 'normal'
                    }}
                  >
                    {selectedCodes.length === 0 || selectedCodes.includes(item.afternoonCode) ? item.afternoonCode : ''}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={1 + (showMorningColumn ? 1 : 0) + (showAfternoonColumn ? 1 : 0)} style={{ textAlign: 'center' }}>
                  No data found for the selected attendance codes.
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </TableContainer>
      
      <DateInfo>Latest session available: {formatDate()}</DateInfo>
      
      <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default PupilAttendanceCodes;
