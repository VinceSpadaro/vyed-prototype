import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TabNavigation from '../Dashboard/TabNavigation';
import UpdatesSection from '../Common/UpdatesSection';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

// Using shared UpdatesSection component

const MainContent = styled.main`
  display: flex;
  margin-bottom: 30px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #1d70b8;
  text-decoration: none;
  
  &:before {
    content: "< ";
  }
`;

const GuidanceTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.5;
`;

const BlueLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
`;

const FullscreenLink = styled(Link)`
  color: #1d70b8;
  text-decoration: underline;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SupportSection = styled.section`
  padding: 20px 0;
  border-top: 1px solid #ddd;
`;

const SupportTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FiltersSidebar = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-left: none;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const FiltersTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const FiltersIcon = styled.span`
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
`;

const NoFiltersText = styled.p`
  color: #666;
`;

const GuidancePage = () => {
  return (
    <Container>
      <Header>
        <Title>View school attendance data</Title>
        <UpdatesSection />
      </Header>
      
      <TabNavigation />
      
      <MainContent>
        <ContentArea>
          <BackLink to="/">Back</BackLink>
          
          <GuidanceTitle>Guidance</GuidanceTitle>
          
          <Section>
            <SectionTitle>Where does the data comes from?</SectionTitle>
            <Paragraph>
              Monitor your school attendance contains OFFICIAL-SENSITIVE data from schools <BlueLink href="#">sharing daily attendance data with DfE</BlueLink>. All data comes from 
              school management information systems (MISs) twice daily (AM and PM).
            </Paragraph>
            <Paragraph>
              Data may not be accurate and can change when systems get updated.
            </Paragraph>
            <Paragraph>
              <BlueLink href="#">Read the data definitions used</BlueLink>.
            </Paragraph>
          </Section>
          
          <Section>
            <SectionTitle>How to use this tool?</SectionTitle>
            <Paragraph>
              Navigation: use the bar at the top of the page to move between different parts of the report.
            </Paragraph>
            <Paragraph>
              Using filters: the data filters on the side of the page can be opened and closed, use the arrows at the top of the filter panel.
            </Paragraph>
            <Paragraph>
              Data tables: select column headers on the tables to sort the data.
            </Paragraph>
          </Section>
          
          <Section>
            <SectionTitle>Get help</SectionTitle>
            <Paragraph>
              Check our current <BlueLink href="#">technical issues</BlueLink> before you <BlueLink href="#">raise a ticket</BlueLink>.
            </Paragraph>
            <Paragraph>
              <BlueLink href="#">Read the guidance about maintaining high levels of attendance</BlueLink>.
            </Paragraph>
          </Section>
          
          <FullscreenLink to="#">Present in fullscreen</FullscreenLink>
        </ContentArea>
        
        <FiltersSidebar>
          <FiltersHeader>
            <FiltersTitle>Filters</FiltersTitle>
            <FiltersIcon>&gt;</FiltersIcon>
          </FiltersHeader>
          <SearchInput type="text" placeholder="Search" />
          <NoFiltersText>There aren't any filters to display.</NoFiltersText>
        </FiltersSidebar>
      </MainContent>
      
      <SupportSection>
        <SupportTitle>Further support</SupportTitle>
        <Paragraph>
          If you need help with anything, you can <BlueLink href="/submit-enquiry">submit an enquiry</BlueLink>.
        </Paragraph>
      </SupportSection>
    </Container>
  );
};

export default GuidancePage;
