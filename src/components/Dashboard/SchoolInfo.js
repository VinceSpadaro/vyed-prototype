import React from 'react';
import styled from 'styled-components';
import { media } from './ResponsiveStyles';
import { useUserType } from '../../context/UserTypeContext';

const SchoolInfoContainer = styled.div`
  margin-bottom: 0;
`;

const SchoolName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 5px;
  font-weight: 700;
`;

const SchoolYear = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  ${media.medium`
    flex-wrap: wrap;
  `}
  
  ${media.small`
    flex-direction: column;
  `}
`;

const StatBox = styled.div`
  background-color: ${props => props.color || 'var(--stat-card-blue)'};
  color: white;
  padding: 15px;
  flex: 1;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 0;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
`;

const AbsenceSectionsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const AbsenceSection = styled.div`
  flex: 1;
  background-color: #f3f2f1;
  padding: 20px;
`;

const AbsenceSectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
`;

const AbsenceStatsContainer = styled.div`
  display: flex;
  gap: 10px;
  
  ${media.small`
    flex-direction: column;
  `}
`;

const AbsenceStatBox = styled.div`
  text-align: center;
  padding: 10px 0;
  background-color: transparent;
`;

const AbsenceStatTitle = styled.div`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #505a5f;
`;

const AbsenceStatValue = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const LastDaysSection = styled.div`
  margin-top: 30px;
`;

const LastDaysTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LastDaysDateText = styled.span`
  font-size: 0.9rem;
`;

const InfoIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1d70b8;
  color: white;
  text-align: center;
  line-height: 20px;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const LatestSessionInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 30px;
`;

const PresentFullscreenLink = styled.a`
  display: block;
  color: #1d70b8;
  text-decoration: none;
  margin-top: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SchoolInfo = () => {
  const { getEffectiveUserType, selectedSchoolName, userType: actualUserType } = useUserType();
  const userType = getEffectiveUserType();
  
  // Determine the heading based on user type
  const getHeading = () => {
    if (userType === 'localAuthority') {
      return 'Demo Local Authority';
    } else if (userType === 'trust') {
      return 'Demo Trust';
    }
    // If viewing a school from LA/Trust, use the selected school name
    // Otherwise use 'Demo School' for direct school users
    if (selectedSchoolName && (actualUserType === 'localAuthority' || actualUserType === 'trust')) {
      return selectedSchoolName;
    }
    return 'Demo School';
  };
  
  return (
    <SchoolInfoContainer>
      <SchoolName>{getHeading()}</SchoolName>
      <SchoolYear>Current academic year up to Tuesday 11 March 2025</SchoolYear>
      
      <StatsContainer>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>1,744</StatValue>
          <StatLabel>Number of pupils</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>91.4%</StatValue>
          <StatLabel>Overall attendance %</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>8.6%</StatValue>
          <StatLabel>Overall absence %</StatLabel>
        </StatBox>
        <StatBox color="var(--stat-card-blue)">
          <StatValue>3.6%</StatValue>
          <StatLabel>Unauthorised absence %</StatLabel>
        </StatBox>
      </StatsContainer>
      
      <AbsenceSectionsContainer>
        <AbsenceSection>
          <AbsenceSectionTitle>Persistently absent</AbsenceSectionTitle>
          <AbsenceStatsContainer>
            <AbsenceStatBox>
              <AbsenceStatTitle>Number of persistently absent pupils</AbsenceStatTitle>
              <AbsenceStatValue>454</AbsenceStatValue>
            </AbsenceStatBox>
            <AbsenceStatBox>
              <AbsenceStatTitle>Percentage of persistently absent pupils</AbsenceStatTitle>
              <AbsenceStatValue>26.0%</AbsenceStatValue>
            </AbsenceStatBox>
          </AbsenceStatsContainer>
        </AbsenceSection>
        
        <AbsenceSection>
          <AbsenceSectionTitle>Severely absent</AbsenceSectionTitle>
          <AbsenceStatsContainer>
            <AbsenceStatBox>
              <AbsenceStatTitle>Number of severely absent pupils</AbsenceStatTitle>
              <AbsenceStatValue>48</AbsenceStatValue>
            </AbsenceStatBox>
            <AbsenceStatBox>
              <AbsenceStatTitle>Percentage of severely absent pupils</AbsenceStatTitle>
              <AbsenceStatValue>2.8%</AbsenceStatValue>
            </AbsenceStatBox>
          </AbsenceStatsContainer>
        </AbsenceSection>
      </AbsenceSectionsContainer>
      
      <LastDaysSection>
        <LastDaysTitle>
          <LastDaysDateText>Last 5 days (05 March 2025 to 11 March 2025)</LastDaysDateText>
          <InfoIcon>i</InfoIcon>
        </LastDaysTitle>
        
        <StatsContainer>
          <StatBox color="var(--stat-card-dark-grey)">
            <StatValue>91.1%</StatValue>
            <StatLabel>Overall attendance %</StatLabel>
          </StatBox>
          <StatBox color="var(--stat-card-dark-grey)">
            <StatValue>8.9%</StatValue>
            <StatLabel>Overall absence %</StatLabel>
          </StatBox>
          <StatBox color="var(--stat-card-dark-grey)">
            <StatValue>4.2%</StatValue>
            <StatLabel>Unauthorised absence %</StatLabel>
          </StatBox>
        </StatsContainer>
      </LastDaysSection>
      
      <LatestSessionInfo>
        Latest session available<br />
        11/03/2025
      </LatestSessionInfo>
      
      <PresentFullscreenLink href="#">Present in fullscreen</PresentFullscreenLink>
    </SchoolInfoContainer>
  );
};

export default SchoolInfo;
