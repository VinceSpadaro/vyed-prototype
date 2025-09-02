import React from 'react';
import styled from 'styled-components';

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

const PupilsTable = ({ pupils, showLastAbsenceDate = false }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Pupil name</TableHeader>
            <TableHeader>UPN</TableHeader>
            <TableHeader>First absence date</TableHeader>
            {showLastAbsenceDate && <TableHeader>Last absence date</TableHeader>}
            <TableHeader>Total sessions absent</TableHeader>
          </tr>
        </thead>
        <tbody>
          {pupils.map((pupil, index) => (
            <TableRow key={index}>
              <TableCell>{pupil.name}</TableCell>
              <TableCell>{pupil.upn}</TableCell>
              <TableCell>{pupil.firstAbsenceDate}</TableCell>
              {showLastAbsenceDate && <TableCell>{pupil.lastAbsenceDate}</TableCell>}
              <TableCell>{pupil.totalSessionsAbsent}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default PupilsTable;
