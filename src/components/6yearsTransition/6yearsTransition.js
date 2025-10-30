import React from 'react';
import styled from 'styled-components';
import SupportSection from '../Support/SupportSection';
import { Link } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
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
  const { getEffectiveUserType, selectedSchoolName, userType: actualUserType } = useUserType();
  const userType = getEffectiveUserType();

  // Get UKPRN based on user type
  const getUKPRN = () => {
    if (userType === 'localAuthority') {
      return '10012345'; // Synthetic UKPRN for Demo Local Authority
    } else if (userType === 'trust') {
      return '10067890'; // Synthetic UKPRN for Demo Trust
    }
    return '10000045'; // Default school UKPRN
  };

  // Get school name for display
  const getSchoolName = () => {
    if (selectedSchoolName && (actualUserType === 'localAuthority' || actualUserType === 'trust')) {
      return selectedSchoolName.toUpperCase();
    }
    return 'DEMO SCHOOL';
  };

  const ukprn = getUKPRN();

  // Generate report files
  const reportFiles = [
    `Official_Sensitive_${ukprn}_Year6_Transition_Absence_YTD_04112024.xlsx`,
  ];

  return (
    <Container>
      <ToolsBreadcrumbs 
        items={[
          { label: 'Monitor your school attendance', to: '/tools' }, 
          { label: 'View school attendance data', to: '/insights' }
        ]} 
        currentPage="Year 6 transition data" 
      />
      
      <PageTitle>Year 6 transition data</PageTitle>
      
      <ReportsSection>
        <ReportsHeading>Year 6 transition data file available for {getSchoolName()} (UKPRN: {ukprn})</ReportsHeading>
        
        <FileTable>
          <TableHeader>File</TableHeader>
          {reportFiles.map((file, index) => (
            <FileRow key={index}>
              <FileLink href="#" download>{file}</FileLink>
            </FileRow>
          ))}
        </FileTable>
      </ReportsSection>
      
      <Divider />
      
      <SupportSection />
    </Container>
  );
};

export default ReportsPage;
