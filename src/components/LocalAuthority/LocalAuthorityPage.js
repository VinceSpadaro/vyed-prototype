import React from 'react';
import styled from 'styled-components';
import TabNavigation from '../Dashboard/TabNavigation';
import UpdatesSection from '../Common/UpdatesSection';
import SupportSection from '../Support/SupportSection';
import { useUserType } from '../../context/UserTypeContext';

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
  padding: 20px;
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
        
        <MainContent>
          <h2>Local Authority Overview</h2>
          <PlaceholderText>
            This page will display Local Authority specific data for {organisationName || 'your Local Authority'}.
          </PlaceholderText>
          <PlaceholderText>
            Content for this tab is currently being developed.
          </PlaceholderText>
        </MainContent>
      </ContentContainer>
      
      <SupportSection />
    </Container>
  );
};

export default LocalAuthorityPage;
