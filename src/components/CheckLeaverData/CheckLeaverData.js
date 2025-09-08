import React from 'react';
import styled from 'styled-components';

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

const GuidanceLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #b1b4b6;
  font-weight: bold;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #b1b4b6;
  white-space: nowrap;
`;

// Mock data for leaver pupils
const leaverPupils = [
  { name: "Collins, Eric", upn: "A15240737286", leavingDate: "24 April 2024", lastRecordedSession: "20 May 2024" },
  { name: "Schneider, Maria", upn: "A16753963680", leavingDate: "18 October 2024", lastRecordedSession: "07 November 2024" },
  { name: "Ray, Laura", upn: "A22842045374", leavingDate: "11 March 2024", lastRecordedSession: "20 March 2024" },
  { name: "Diaz, Jackson", upn: "A27083178304", leavingDate: "28 June 2024", lastRecordedSession: "22 July 2024" },
  { name: "Stewart, Eugene", upn: "A37840286452", leavingDate: "24 January 2025", lastRecordedSession: "31 January 2025" },
  { name: "Beck, Matthew", upn: "A46171797901", leavingDate: "28 June 2024", lastRecordedSession: "22 July 2024" },
  { name: "Hill, Denise", upn: "A48888481776", leavingDate: "22 July 2024", lastRecordedSession: "16 September 2024" },
  { name: "Gilmore, Shirley", upn: "A50503536248", leavingDate: "20 October 2023", lastRecordedSession: "24 November 2023" },
  { name: "Barton, Raymond", upn: "A56572363948", leavingDate: "23 February 2024", lastRecordedSession: "29 February 2024" },
  { name: "Hubbard, Pamela", upn: "A74384996882", leavingDate: "21 July 2023", lastRecordedSession: "08 September 2023" },
  { name: "Adams, Derrick", upn: "A82484916936", leavingDate: "04 September 2024", lastRecordedSession: "01 October 2024" },
  { name: "Larson, Linda", upn: "A84920451747", leavingDate: "26 April 2024", lastRecordedSession: "16 May 2024" }
];

const CheckLeaverData = () => {
  return (
    <Container>
      <Title>Check your leaver data</Title>
      <Description>
        Review a list of pupils with session data recorded after their leaving date. We exclude these sessions when calculating results in your school attendance reports. This page is updated daily based on changes in your management information system (MIS).
      </Description>
      
      <GuidanceLink href="https://www.gov.uk/government/publications/monitor-your-school-attendance-user-guide/monitor-your-school-attendance-user-guide#check-your-leaver-data-report">How to record accurate leaver data in your MIS or update leaving dates.</GuidanceLink>
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Pupil name</TableHeader>
              <TableHeader>UPN</TableHeader>
              <TableHeader>Leaving date</TableHeader>
              <TableHeader>Last recorded session</TableHeader>
            </tr>
          </thead>
          <tbody>
            {leaverPupils.map((pupil, index) => (
              <TableRow key={index}>
                <TableCell>{pupil.name}</TableCell>
                <TableCell>{pupil.upn}</TableCell>
                <TableCell>{pupil.leavingDate}</TableCell>
                <TableCell>{pupil.lastRecordedSession}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CheckLeaverData;
