import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 30px;
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
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.sortable ? '#f0f0f0' : 'transparent'};
  }
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

const SortIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
`;

// Sample data for pupils in the 5-10% absence band
const pupilsData = [
  { upn: 'R52065344289', name: 'Green, Deanna', absence: '9.9%', yearGroup: 12 },
  { upn: 'U72823293346', name: 'Jackson, Christopher', absence: '9.9%', yearGroup: 10 },
  { upn: 'F95272598202', name: 'Bauer, Rebecca', absence: '9.9%', yearGroup: 13 },
  { upn: 'A53173092376', name: 'Vega, Melanie', absence: '9.8%', yearGroup: 8 },
  { upn: 'A73335395433', name: 'West, Jermaine', absence: '9.8%', yearGroup: 11 },
  { upn: 'C60617057353', name: 'Horn, Sarah', absence: '9.8%', yearGroup: 9 },
  { upn: 'F49827982574', name: 'Gibson, Jordan', absence: '9.8%', yearGroup: 8 },
  { upn: 'G76349222210', name: 'Hardy, Nathaniel', absence: '9.8%', yearGroup: 10 },
  { upn: 'J37544262960', name: 'Williams, Andrew', absence: '9.8%', yearGroup: 9 },
  { upn: 'J40277232874', name: 'Christensen, Nicole', absence: '9.8%', yearGroup: 8 },
  { upn: 'N73091573819', name: 'Patterson, Jessica', absence: '9.8%', yearGroup: 11 },
  { upn: 'N98652422943', name: 'Miles, Michael', absence: '9.8%', yearGroup: 10 },
  { upn: 'R95954978803', name: 'Brennan, Sheila', absence: '9.8%', yearGroup: 8 },
  { upn: 'V41964965047', name: 'Murray, Joe', absence: '9.8%', yearGroup: 11 },
  { upn: 'W87581210147', name: 'Smith, Alice', absence: '9.8%', yearGroup: 11 },
];

const PupilsInBandTable = ({ bandId, bandName }) => {
  const [sortField, setSortField] = React.useState('name');
  const [sortDirection, setSortDirection] = React.useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPupils = [...pupilsData].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'absence') {
      comparison = parseFloat(a.absence) - parseFloat(b.absence);
    } else if (sortField === 'yearGroup') {
      comparison = a.yearGroup - b.yearGroup;
    } else if (sortField === 'upn') {
      comparison = a.upn.localeCompare(b.upn);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell 
              sortable 
              onClick={() => handleSort('upn')}
            >
              UPN
              {sortField === 'upn' && (
                <SortIcon>{sortDirection === 'asc' ? '▲' : '▼'}</SortIcon>
              )}
            </TableHeaderCell>
            <TableHeaderCell 
              sortable 
              onClick={() => handleSort('name')}
            >
              Pupil Name
              {sortField === 'name' && (
                <SortIcon>{sortDirection === 'asc' ? '▲' : '▼'}</SortIcon>
              )}
            </TableHeaderCell>
            <TableHeaderCell 
              sortable 
              onClick={() => handleSort('absence')}
            >
              Overall absence
              {sortField === 'absence' && (
                <SortIcon>{sortDirection === 'asc' ? '▲' : '▼'}</SortIcon>
              )}
            </TableHeaderCell>
            <TableHeaderCell 
              sortable 
              onClick={() => handleSort('yearGroup')}
            >
              Year group
              {sortField === 'yearGroup' && (
                <SortIcon>{sortDirection === 'asc' ? '▲' : '▼'}</SortIcon>
              )}
            </TableHeaderCell>
          </tr>
        </TableHead>
        <tbody>
          {sortedPupils.map((pupil) => (
            <TableRow key={pupil.upn}>
              <TableCell>{pupil.upn}</TableCell>
              <TableCell>{pupil.name}</TableCell>
              <TableCell>{pupil.absence}</TableCell>
              <TableCell>{pupil.yearGroup}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default PupilsInBandTable;
