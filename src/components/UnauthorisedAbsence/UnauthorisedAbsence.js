import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PupilsTable from './PupilsTable';
import { currentlyAbsentPupils, returnedPupils } from './mockData';

const Container = styled.div`
  padding: 0;
  margin-bottom: 30px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #b1b4b6;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#fff' : '#f3f2f1'};
  border: 1px solid #b1b4b6;
  border-bottom: ${props => props.active ? '0' : '1px solid #b1b4b6'};
  margin-right: 5px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  bottom: -1px;
`;

const GuidanceLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
`;

const FullscreenLink = styled(Link)`
  color: #1d70b8;
  text-decoration: underline;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LatestSession = styled.div`
  font-size: 14px;
  color: #505a5f;
  margin-top: 20px;
`;

const UnauthorisedAbsence = () => {
  const [activeTab, setActiveTab] = useState('currently');
  
  return (
    <Container>
      <Title>10 days of continuous unauthorised absence</Title>
      <Description>
        Identify pupils with 10 days (calculated as 20 sessions) or more of continuous unauthorised absence. Data is for the current academic year-to-date and is updated daily.
      </Description>
      <InfoText>
        You can use this page to help you complete attendance returns to your local authority, although further information may still be required. This report is not intended to display pupils who have met the national threshold for penalty notices. Schools and local authorities should continue to follow the <GuidanceLink href="#">statutory guidance on penalty notices</GuidanceLink> (Working together to improve school attendance guidance, page 56)
      </InfoText>
      <GuidanceLink href="#">How to use this report</GuidanceLink>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'currently'} 
          onClick={() => setActiveTab('currently')}
        >
          Currently absent pupils
        </Tab>
        <Tab 
          active={activeTab === 'returned'} 
          onClick={() => setActiveTab('returned')}
        >
          Pupils returned from continuous absence
        </Tab>
      </TabContainer>
      
      {activeTab === 'currently' && (
        <div>
          <PupilsTable pupils={currentlyAbsentPupils} showLastAbsenceDate={false} />
        </div>
      )}
      
      {activeTab === 'returned' && (
        <div>
          <PupilsTable pupils={returnedPupils} showLastAbsenceDate={true} />
        </div>
      )}
      
      <LatestSession>
        Latest session available: <br />
        11/03/2025
      </LatestSession>
      
      <FullscreenLink to="#">Present in fullscreen</FullscreenLink>
    </Container>
  );
};

export default UnauthorisedAbsence;
