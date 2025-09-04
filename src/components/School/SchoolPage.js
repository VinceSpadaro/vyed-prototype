import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllPupils } from '../../services/pupilDataService';
import TabNavigation from '../Dashboard/TabNavigation';
import Filters from '../Filters/Filters';
import { media } from '../../styles/mediaQueries';
import SupportSection from '../Support/SupportSection';
import UpdatesSection from '../Common/UpdatesSection';

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

const SchoolPageContainer = styled.div`
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
  border: 1px solid #b1b4b6;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const TableHeader = styled.thead`
  background-color: #f3f2f1;
  border-bottom: 2px solid #b1b4b6;
  
  th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  tr:hover {
    background-color: #e8f4fa;
  }
  
  td {
    padding: 10px 15px;
    border-bottom: 1px solid #e5e5e5;
  }
`;

const InfoText = styled.div`
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const LastUpdated = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 15px;
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

const SchoolPage = () => {
  const [filteredPupils, setFilteredPupils] = useState([]);
  const [visiblePupils, setVisiblePupils] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialVisibleRows = 15;
  const [visibleRows, setVisibleRows] = useState(initialVisibleRows);
  
  useEffect(() => {
    // Fetch pupil data
    const data = getAllPupils();
    setFilteredPupils(data);
    setLoading(false);
  }, []);
  
  // Update visible pupils when filtered pupils change or visible rows change
  useEffect(() => {
    setVisiblePupils(filteredPupils.slice(0, visibleRows));
  }, [filteredPupils, visibleRows]);
  
  // Function to handle scroll and load more rows
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      // When user scrolls to near bottom, load more rows
      setVisibleRows(prevRows => Math.min(prevRows + 10, filteredPupils.length));
    }
  };
  
  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return (
    <div>
      <PageTitle>School attendance data</PageTitle>
      
      <UpdatesSection />
      
      <TabNavigation />
      
      <ContentContainer>
        <MainContentWrapper>
          <MainContent>
            <SchoolPageContainer>
              <SchoolName>Demo School</SchoolName>
              <SchoolYear>Current academic year up to {formattedDate}</SchoolYear>
              
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
                  <StatValue>454</StatValue>
                  <StatLabel>Persistently absent pupils</StatLabel>
                </StatBox>
                <StatBox color="var(--stat-card-blue)">
                  <StatValue>48</StatValue>
                  <StatLabel>Severely absent pupils</StatLabel>
                </StatBox>
              </StatsContainer>
              
              <LastUpdated>Latest session available: {formattedDate}</LastUpdated>
              
              <InfoText>
                Get attendance and absence figures for the whole school and pupil characteristic groups. 
                Use the filter pane on the right hand side to select pupil characteristics.
              </InfoText>
              
              {loading ? (
                <div>Loading pupil data...</div>
              ) : (
                <>
                  <TableContainer onScroll={handleScroll} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <StyledTable>
                      <TableHeader>
                        <tr>
                          <th>Pupil name</th>
                          <th>UPN</th>
                          <th>Attendance</th>
                          <th>Absence</th>
                          <th>Authorized</th>
                          <th>Unauthorized</th>
                          <th>Full days missed</th>
                          <th>Possible sessions</th>
                          <th>Missed sessions</th>
                        </tr>
                      </TableHeader>
                      <TableBody>
                        {visiblePupils.map((pupil) => (
                          <tr key={pupil.id}>
                            <td>{pupil.name}</td>
                            <td>{pupil.upn}</td>
                            <td>{pupil.attendance}</td>
                            <td>{pupil.absence}</td>
                            <td>{pupil.authorized}</td>
                            <td>{pupil.unauthorized}</td>
                            <td>{pupil.fullDaysMissed}</td>
                            <td>{pupil.possibleSessions}</td>
                            <td>{pupil.missedSessions}</td>
                          </tr>
                        ))}
                      </TableBody>
                    </StyledTable>
                  </TableContainer>
                  
                  {/* Infinite scroll implemented - no pagination needed */}
                </>
              )}
            </SchoolPageContainer>
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

export default SchoolPage;
