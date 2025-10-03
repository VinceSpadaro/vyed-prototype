import React from 'react';
import styled from 'styled-components';
import SupportSection from '../Support/SupportSection';
import { Link } from 'react-router-dom';

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

const ReportsSection = styled.section`
  margin-bottom: 40px;
`;

const ReportsHeading = styled.h2`
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

const FileLink = styled.a`
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

const BreadcrumbNav = styled.div`
  margin-bottom: 20px;
  color: #1d70b8;
  font-size: 14px;
`;

const BreadcrumbLink = styled(Link)`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: #1d70b8;
`;

const CurrentPage = styled.span`
  color: #1d70b8;
`;

const ReportsPage = () => {
  return (
    <Container>
      <BreadcrumbNav>
        <BreadcrumbLink to="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink to="/insights">Monitor your school attendance</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink to="/insights">View school attendance data (demo)</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <CurrentPage>Your attendance summary reports</CurrentPage>
      </BreadcrumbNav>
      
      <PageTitle>School attendance downloads</PageTitle>
      
      <ReportsSection>
        <ReportsHeading>Your attendance summary reports file available for VYED TEAM (UKPRN 90240218)</ReportsHeading>
        
        <FileTable>
          <TableHeader>File</TableHeader>
          <FileRow>
            <FileLink href="#" download>Official_Sensitive_90240218_Secondary_School_Attendance_Summary_First_Spring_Term_27342025.docx</FileLink>
          </FileRow>
        </FileTable>
      </ReportsSection>
      
      <Divider />
      
      <SupportSection />
    </Container>
  );
};

export default ReportsPage;
