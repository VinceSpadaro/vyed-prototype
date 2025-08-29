import React from 'react';
import styled from 'styled-components';
import TabNavigation from './TabNavigation';
import SchoolInfo from './SchoolInfo';
import UpdatesSection from './UpdatesSection';
import Filters from '../Filters/Filters';
import SideNav from '../Navigation/SideNav';
import SupportSection from '../Support/SupportSection';
import { media } from './ResponsiveStyles';

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const MainContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const MainContent = styled.div`
  flex: 1;
`;

const SidebarContent = styled.div`
  width: 300px;
  
  ${media.medium`
    width: 100%;
    margin-top: 20px;
  `}
`;

const AttendanceData = () => {
  return (
    <div>
      <PageTitle>View school attendance data</PageTitle>
      
      <UpdatesSection />
      
      <TabNavigation />
      
      <ContentContainer>
        <SideNav />
        
        <MainContentWrapper>
          <MainContent>
            <SchoolInfo />
          </MainContent>
          
          <SidebarContent>
            <Filters />
          </SidebarContent>
        </MainContentWrapper>
      </ContentContainer>
      
      <SupportSection />
    </div>
  );
};

export default AttendanceData;
