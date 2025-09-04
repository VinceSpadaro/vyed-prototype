import React from 'react';
import styled from 'styled-components';
import DataTable from './DataTable';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #1d70b8;
  padding-bottom: 5px;
`;

const LastUpdated = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  text-align: right;
`;

const DataTableExample = () => {
  // Example columns configuration
  const columns = [
    { header: 'Pupil name', accessor: 'name' },
    { header: 'UPN', accessor: 'upn' },
    { header: 'Leaving date', accessor: 'leavingDate' },
    { header: 'Last recorded session', accessor: 'lastSession' }
  ];
  
  // Example data
  const data = [
    { 
      name: 'Collins, Eric', 
      upn: 'A15240737286', 
      leavingDate: '24 April 2024', 
      lastSession: '20 May 2024' 
    },
    { 
      name: 'Schneider, Maria', 
      upn: 'A16753963680', 
      leavingDate: '18 October 2024', 
      lastSession: '07 November 2024' 
    },
    { 
      name: 'Ray, Laura', 
      upn: 'A22842045374', 
      leavingDate: '11 March 2024', 
      lastSession: '20 March 2024' 
    },
    { 
      name: 'Diaz, Jackson', 
      upn: 'A27083178304', 
      leavingDate: '28 June 2024', 
      lastSession: '22 July 2024' 
    },
    { 
      name: 'Stewart, Eugene', 
      upn: 'A37840286452', 
      leavingDate: '24 January 2025', 
      lastSession: '31 January 2025' 
    }
  ];

  return (
    <Container>
      <Title>Pupil Leaving Data</Title>
      
      {/* Basic usage */}
      <DataTable 
        columns={columns} 
        data={data} 
      />
      
      {/* Custom styling example */}
      <Title>Custom Styled Table</Title>
      <DataTable 
        columns={columns} 
        data={data}
        headerBackground="#1d70b8"
        headerTextColor="#ffffff"
        stripedColor="#f0f7ff"
        hoverColor="#e6f0ff"
      />
      
      <LastUpdated>Last updated: 4 September 2025</LastUpdated>
    </Container>
  );
};

export default DataTableExample;
