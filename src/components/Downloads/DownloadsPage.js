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

const DownloadsPage = () => {
  const { getEffectiveUserType } = useUserType();
  const userType = getEffectiveUserType();
  
  // Generate synthetic UKPRN based on user type
  const getUKPRN = () => {
    if (userType === 'localAuthority') {
      return '10012345'; // Synthetic UKPRN for Demo Local Authority
    } else if (userType === 'trust') {
      return '10067890'; // Synthetic UKPRN for Demo Trust
    }
    return '90240218'; // Default school UKPRN
  };
  
  // Get organization name based on user type
  const getOrganizationName = () => {
    if (userType === 'localAuthority') {
      return 'Demo Local Authority';
    } else if (userType === 'trust') {
      return 'Demo Trust';
    }
    return 'Demo School';
  };
  
  // Get breadcrumb text based on user type
  const getBreadcrumbText = () => {
    if (userType === 'localAuthority') {
      return 'Monitor your local authority attendance';
    } else if (userType === 'trust') {
      return 'Monitor your trust attendance';
    }
    return 'Monitor your school attendance';
  };
  
  const ukprn = getUKPRN();
  const organizationName = getOrganizationName();
  const breadcrumbText = getBreadcrumbText();
  
  // Get page title based on user type
  const getPageTitle = () => {
    if (userType === 'localAuthority') {
      return 'Local authority attendance downloads';
    } else if (userType === 'trust') {
      return 'Trust attendance downloads';
    }
    return 'School attendance downloads';
  };

  return (
    <Container>
      <ToolsBreadcrumbs 
        items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View attendance data', to: '/insights' }]} 
        currentPage="Attendance data downloads" 
      />
      
      <PageTitle>{getPageTitle()}</PageTitle>
      
      <DownloadsSection>
        <DownloadsHeading>
          Attendance data files available for {organizationName} (UKPRN {ukprn})
        </DownloadsHeading>
        
        <FileTable>
          <TableHeader>File</TableHeader>
          <FileRow>
            <FileLink href="#" download>
              Official_Sensitive_{ukprn}_School_Attendance_27032025.csv
            </FileLink>
          </FileRow>
          <FileRow>
            <FileLink href="#" download>
              Official_Sensitive_{ukprn}_School_Attendance_end_of_20032025_27032025.csv
            </FileLink>
          </FileRow>
        </FileTable>
      </DownloadsSection>
      
      <Divider />
      
      <SupportSection />
    </Container>
  );
};

export default DownloadsPage;
