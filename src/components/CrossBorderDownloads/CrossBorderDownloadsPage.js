import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`;

const DownloadsSection = styled.section`
  margin-bottom: 40px;
`;

const DownloadsHeading = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const FileTable = styled.div`
  margin-bottom: 40px;
`;

const TableHeader = styled.div`
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const FileRow = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
`;

const FileLink = styled(Link)`
  color: #1d70b8;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 30px 0;
`;

const CrossBorderDownloadsPage = () => {
  return (
    <Container>
      <ToolsBreadcrumbs 
        items={[{ label: 'Monitor your school attendance', to: '/tools' }]} 
        currentPage="Cross-border data downloads" 
      />
      
      <PageTitle></PageTitle>
      
      <DownloadsSection>
        <DownloadsHeading>
          Data downloads file available for London Borough Council (UKPRN 10034567)
        </DownloadsHeading>
        
        <FileTable>
          <TableHeader>File</TableHeader>
          <FileRow>
            <FileLink to="/cross-border-data">
              Official_Sensitive_10034567_Cross_Border_Attendance_21112025.csv
            </FileLink>
          </FileRow>
        </FileTable>
      </DownloadsSection>
      
      <Divider />
      
      <SupportSection />
    </Container>
  );
};

export default CrossBorderDownloadsPage;
