import React from 'react';
import styled from 'styled-components';
import TabNavigation from '../Dashboard/TabNavigation';
import UpdatesSection from '../Common/UpdatesSection';
import SupportSection from '../Support/SupportSection';
import Filters from '../Filters/Filters';
import { useUserType } from '../../context/UserTypeContext';
import { media } from '../Dashboard/ResponsiveStyles';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  border: 1px solid #b1b4b6;
  margin-bottom: 30px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #1d70b8;
  padding-bottom: 5px;
`;

const MainContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const SidebarContent = styled.div`
  width: 300px;
  
  ${media.medium`
    width: 100%;
    margin-top: 20px;
  `}
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  margin: 20px 0;
`;

const LocalAuthorityPage = () => {
  const { organisationName } = useUserType();
  
  return (
    <Container>
      <PageTitle>View school attendance data</PageTitle>
      
      <UpdatesSection />
      
      <ContentContainer>
        <TabNavigation />
        
        <MainContentWrapper>
          <MainContent>
            <SectionTitle>Local Authority Overview: {organisationName || 'Your Local Authority'}</SectionTitle>
            
            {/* Content will be implemented later */}
            <PlaceholderText>
              Content for this section will be implemented later.
            </PlaceholderText>
          </MainContent>
          
          <SidebarContent>
            <Filters />
          </SidebarContent>
        </MainContentWrapper>
      </ContentContainer>
      
      <SupportSection />
    </Container>
  );
};

export default LocalAuthorityPage;
