import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  flex: 1; /* Take all available space */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f8f8f8;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
  font-size: 16px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const AbsenceLink = styled(Link)`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatusTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 140px; /* Fixed width for all tags */
  background-color: ${props => {
    if (props.status === 'Approaching') return '#fff2cc';
    if (props.status === 'Persistently absent') return '#f8d7da';
    if (props.status === 'Severely absent') return '#f5c6cb';
    return 'transparent';
  }};
`;

const StatusCell = styled(TableCell)`
  text-align: center;
`;

const absenceBandsData = [
  { id: 1, range: 'Absence from 0% to less than 5%', total: 833, percentage: '48.8%', status: '' },
  { id: 2, range: 'Absence from 5% to less than 10%', total: 421, percentage: '24.6%', status: 'Approaching' },
  { id: 3, range: 'Absence from 10% to less than 15%', total: 180, percentage: '10.5%', status: 'Persistently absent' },
  { id: 4, range: 'Absence from 15% to less than 20%', total: 85, percentage: '5.0%', status: 'Persistently absent' },
  { id: 5, range: 'Absence from 20% to less than 25%', total: 57, percentage: '3.3%', status: 'Persistently absent' },
  { id: 6, range: 'Absence from 25% to less than 30%', total: 32, percentage: '1.9%', status: 'Persistently absent' },
  { id: 7, range: 'Absence from 30% to less than 35%', total: 20, percentage: '1.2%', status: 'Persistently absent' },
  { id: 8, range: 'Absence from 35% to less than 40%', total: 11, percentage: '0.6%', status: 'Persistently absent' },
  { id: 9, range: 'Absence from 40% to less than 45%', total: 13, percentage: '0.8%', status: 'Persistently absent' },
  { id: 10, range: 'Absence from 45% to less than 50%', total: 10, percentage: '0.6%', status: 'Persistently absent' },
  { id: 11, range: 'Absence greater than or equal to 50%', total: 46, percentage: '2.7%', status: 'Severely absent' },
];

const AbsenceBandingsTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell>Absence band</TableHeaderCell>
            <TableHeaderCell>Total number of pupils</TableHeaderCell>
            <TableHeaderCell>Total percentage of pupils</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {absenceBandsData.map((band) => (
            <TableRow key={band.id}>
              <TableCell>
                <AbsenceLink to={`/absence-bandings/${band.id}`}>
                  {band.range}
                </AbsenceLink>
              </TableCell>
              <TableCell>{band.total}</TableCell>
              <TableCell>{band.percentage}</TableCell>
              <StatusCell>
                {band.status && <StatusTag status={band.status}>{band.status}</StatusTag>}
              </StatusCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default AbsenceBandingsTable;
