import React from 'react';
import styled from 'styled-components';
import TabNavigation from './TabNavigation';
import SideNav from '../Navigation/SideNav';

const PageContainer = styled.div`
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const UpdatesBox = styled.div`
  border: 1px solid #b1b4b6;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #1d70b8;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SideNavContainer = styled.div`
  flex: 0 0 auto;
`;

const MainContentContainer = styled.div`
  flex: 1;
  padding: 0 20px;
  min-width: 0; /* This prevents flex items from overflowing */
  overflow-x: auto;
`;

const SidebarContainer = styled.div`
  flex: 0 0 300px;
`;

const SupportSection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #b1b4b6;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #1d70b8;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PageLayout = ({ 
  title, 
  updatesBox, 
  showTabs = true, 
  contentSideNav = false, 
  contentSidebar = null, 
  supportSection = null, 
  children 
}) => {
  return (
    <PageContainer>
      <PageTitle>{title}</PageTitle>
      
      {updatesBox && (
        typeof updatesBox === 'object' && updatesBox.type && updatesBox.type.name === 'UpdatesSection' ? 
        updatesBox : 
        <UpdatesBox>
          <h2>Get updates on:</h2>
          {updatesBox}
        </UpdatesBox>
      )}
      
      {showTabs && <TabNavigation />}
      
      <ContentContainer>
        {contentSideNav && (
          <SideNavContainer>
            <SideNav />
          </SideNavContainer>
        )}
        
        <MainContentContainer>
          {children}
        </MainContentContainer>
        
        {contentSidebar && (
          <SidebarContainer>
            {contentSidebar}
          </SidebarContainer>
        )}
      </ContentContainer>
      
      {supportSection && (
        <SupportSection>
          <h2>Further support</h2>
          {supportSection}
        </SupportSection>
      )}
    </PageContainer>
  );
};

export default PageLayout;
