import React from 'react';
import styled from 'styled-components';
import TabNavigation from '../Dashboard/TabNavigation';
import SideNav from '../Navigation/SideNav';
import UpdatesSection from '../Common/UpdatesSection';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 850px;
`;

const SideNavContainer = styled.div`
  flex: 0 0 auto;
`;

const MainContentContainer = styled.div`
  flex: 1;
  padding: 20px 20px 20px 20px;
  min-width: 0; /* This prevents flex items from overflowing */
  overflow-x: hidden; /* Changed from auto to hidden */
  overflow-y: hidden; /* Changed from auto to hidden */
  height: 100%;
`;

const SidebarContainer = styled.div`
  flex: 0 0 300px;
  height: 100%;
  overflow-y: hidden; /* Let the child components handle scrolling */
`;

const SupportSectionWrapper = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #b1b4b6;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  
  a {
    color: #1d70b8;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DataVisualisationsPageLayout = ({ 
  title, 
  showUpdates = true,
  showTabs = true, 
  contentSideNav = false, 
  contentSidebar = null, 
  supportSection = null, 
  children 
}) => {
  return (
    <PageContainer>
      <PageTitle>{title}</PageTitle>
      
      {showUpdates && <UpdatesSection />}
      
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
        typeof supportSection === 'string' || typeof supportSection === 'number' ? (
          /* If it's a simple string or number, wrap it with our styled container */
          <SupportSectionWrapper>
            <h2>Further support</h2>
            {supportSection}
          </SupportSectionWrapper>
        ) : (
          /* Otherwise, it's a component or element, render it directly */
          supportSection
        )
      )}
    </PageContainer>
  );
};

export default DataVisualisationsPageLayout;
