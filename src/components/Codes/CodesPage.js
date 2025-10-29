import React, { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import TabNavigation from '../Dashboard/TabNavigation';
import SupportSection from '../Support/SupportSection';
import CodesSideNav from './CodesSideNav';
import Filters from '../Filters/Filters';
import { useUserType } from '../../context/UserTypeContext';
import { media } from '../../styles/mediaQueries';
import { FiInfo } from 'react-icons/fi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

const Container = styled.div`
  padding: 0 20px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 100%;
`;

const MainContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  width: 100%;
  max-width: 100%;
  
  ${media.medium`
    flex-direction: column;
  `}
`;

const MainContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
`;

const TabContent = styled.div`
  padding: 20px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
`;

const SidebarContainer = styled.div`
  flex: 0 0 300px;
  
  ${media.medium`
    flex: 1;
  `}
`;

const PageContent = styled.div`
  padding: 0;
`;

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 700;
`;

const InfoText = styled.p`
  margin-bottom: 10px;
  line-height: 1.5;
  color: #0b0c0c;
`;

const InfoLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
  
  &:hover {
    color: #003078;
  }
`;

const ExportSection = styled.div`
  margin-bottom: 30px;
`;

const ExportTitle = styled.h3`
  font-size: 19px;
  margin-bottom: 15px;
  font-weight: 700;
`;

const ExportText = styled.p`
  margin-bottom: 15px;
  color: #0b0c0c;
`;

const DataInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 20px;
  color: #505a5f;
  font-size: 16px;
  position: relative;
  min-width: fit-content;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 84px;
`;

const InfoIconContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const InfoIconButton = styled.button`
  background: transparent;
  color: #505a5f;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  line-height: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0b0c0c;
  }
`;

const InfoOverlay = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #b1b4b6;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  margin-top: 8px;
  z-index: 1000;
  min-width: 250px;
  max-height: 400px;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f3f2f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #b1b4b6;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #6f777b;
  }
`;

const OverlayTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const OverlayTableRow = styled.tr`
  border-bottom: 1px solid #e5e5e5;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OverlayTableCell = styled.td`
  padding: 6px 8px;
  text-align: left;
  color: #0b0c0c;
  
  &:first-child {
    font-weight: 600;
    width: 60%;
  }
  
  &:last-child {
    text-align: right;
    width: 40%;
  }
`;

const MenuIconContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const MenuIconButton = styled.button`
  background: transparent;
  color: #505a5f;
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  font-size: 24px;
  line-height: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0b0c0c;
  }
`;

const MenuOverlay = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #b1b4b6;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 1000;
  min-width: 200px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: white;
  color: #0b0c0c;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f2f1;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f3f2f1;
  }
`;

const TableContainerWrapper = styled.div`
  position: relative;
`;

const TableContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #b1b4b6;
  width: 100%;
  max-width: 100%;
  display: block;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.9rem;
  table-layout: auto;
`;

const TableHead = styled.thead`
  background-color: #f3f2f1;
  border-bottom: 2px solid #b1b4b6;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #b1b4b6;
  
  &:hover {
    background-color: #e8f4fa;
  }
  
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 16px;
  color: #0b0c0c;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 10px 20px;
  font-size: 16px;
  color: #0b0c0c;
  border-bottom: 1px solid #e5e5e5;
  white-space: nowrap;
`;

const CodesPage = () => {
  const { getEffectiveUserType } = useUserType();
  const userType = getEffectiveUserType();
  
  // Complete list of attendance codes (matching dropdown)
  const attendanceCodes = ['--', '#', '/', '\\', 'B', 'C', 'C1', 'C2', 'D', 'E', 'G', 'I', 'J1', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y1', 'Y2', 'Y3', 'Y4', 'Y7', 'Z'];
  
  // Initialize with all codes selected
  const [selectedCode, setSelectedCode] = useState(attendanceCodes);
  const [startDate, setStartDate] = useState('01/08/2025');
  const [endDate, setEndDate] = useState('24/10/2025');

  // School names used throughout the app
  const schoolNames = ['School One', 'School Two', 'School Three', 'School Four', 'School Five'];
  
  // Period types
  const periodTypes = ['Morning attendance', 'Afternoon attendance', 'Authorised attendance'];

  // Generate fake data using faker
  const allCodesData = useMemo(() => {
    faker.seed(123); // Set seed for consistent data
    return Array.from({ length: 200 }, (_, index) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const upn = faker.string.alphanumeric({ length: 13, casing: 'upper' });
      const school = schoolNames[Math.floor(Math.random() * schoolNames.length)];
      const code = attendanceCodes[Math.floor(Math.random() * attendanceCodes.length)];
      const period = periodTypes[Math.floor(Math.random() * periodTypes.length)];
      const date = faker.date.between({ from: '2025-08-01', to: '2025-10-24' });
      const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      
      return {
        fullName: `${lastName}, ${firstName}`,
        upn: upn,
        schoolName: school,
        sessionDate: formattedDate,
        attendanceCode: code,
        periodAbsence: period
      };
    });
  }, []);

  // Filter data based on selected codes
  const codesData = useMemo(() => {
    if (!Array.isArray(selectedCode) || selectedCode.length === 0) {
      return [];
    }
    return allCodesData.filter(row => selectedCode.includes(row.attendanceCode));
  }, [allCodesData, selectedCode]);

  const totalRows = codesData.length;
  const [showInfoOverlay, setShowInfoOverlay] = useState(false);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [isTableHovered, setIsTableHovered] = useState(false);
  const menuRef = useRef(null);
  const hideIconTimeoutRef = useRef(null);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuOverlay(false);
      }
    };

    if (showMenuOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showMenuOverlay]);

  // Handle icon disappearance with delay
  const handleTableLeave = () => {
    setIsTableHovered(false);
    setShowMenuOverlay(false);
    
    // Clear any existing timeout
    if (hideIconTimeoutRef.current) {
      clearTimeout(hideIconTimeoutRef.current);
    }
  };

  // Handle menu toggle - reset timer and keep icon visible while menu is open
  const handleMenuToggle = () => {
    const newMenuState = !showMenuOverlay;
    setShowMenuOverlay(newMenuState);
    
    if (newMenuState) {
      // Menu is opening - clear any pending timeout to keep icon visible
      if (hideIconTimeoutRef.current) {
        clearTimeout(hideIconTimeoutRef.current);
      }
    }
  };

  // Calculate code counts
  const codeCountMap = useMemo(() => {
    const counts = {};
    // Initialize all codes with 0
    attendanceCodes.forEach(code => {
      counts[code] = 0;
    });
    // Count occurrences in data
    codesData.forEach(row => {
      const code = row.attendanceCode;
      if (counts.hasOwnProperty(code)) {
        counts[code] = (counts[code] || 0) + 1;
      }
    });
    return counts;
  }, [codesData, attendanceCodes]);

  // Sort codes for display
  const sortedCodes = useMemo(() => {
    return attendanceCodes.map(code => ({ code, count: codeCountMap[code] || 0 }));
  }, [codeCountMap, attendanceCodes]);

  return (
    <Container>
      <PageTitle>Export attendance and absence codes</PageTitle>
      
      <TabNavigation />
      
      <ContentContainer>
        <MainContentWrapper>
          <CodesSideNav
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          <MainContent>
            <TabContent>
              <PageContent>
        <InfoSection>
          <InfoTitle>Demo Local Authority</InfoTitle>
          <InfoText>
            Select an attendance or absence code to see when it has been used in the current academic year.
          </InfoText>
          <InfoText>
            A list of DfE attendance and absence codes are available in chapter 6 of the{' '}
            <InfoLink href="https://www.gov.uk/government/publications/school-attendance" target="_blank" rel="noopener noreferrer">
              Working together to improve school attendance
            </InfoLink>{' '}
            guidance.
          </InfoText>
        </InfoSection>

        <ExportSection>
          <ExportTitle>How to export the data</ExportTitle>
          <ExportText>
            You can export up to 150,000 rows of data at a time as a .csv file. The total number of rows is shown on the right hand side of the table. Hover your cursor over the help icon and then the export data region from the drop down.
          </ExportText>
          <ExportText>Use the filters on the right to narrow down your results.</ExportText>
        </ExportSection>

        <DataInfo>
          <div>
            Number of data rows<br />
            {totalRows.toLocaleString()} / 150,000
          </div>
          <IconsContainer>
            <InfoIconContainer
              onMouseEnter={() => setShowInfoOverlay(true)}
              onMouseLeave={() => setShowInfoOverlay(false)}
            >
              <InfoIconButton>
                <FiInfo size={24} />
              </InfoIconButton>
              {showInfoOverlay && (
                <InfoOverlay>
                  <OverlayTable>
                    <tbody>
                      {sortedCodes.map(({ code, count }) => (
                        <OverlayTableRow key={code}>
                          <OverlayTableCell>{code}</OverlayTableCell>
                          <OverlayTableCell>{count}</OverlayTableCell>
                        </OverlayTableRow>
                      ))}
                      <OverlayTableRow style={{ borderTop: '2px solid #b1b4b6', fontWeight: 'bold' }}>
                        <OverlayTableCell style={{ fontWeight: 'bold' }}>Total</OverlayTableCell>
                        <OverlayTableCell style={{ fontWeight: 'bold' }}>{totalRows}</OverlayTableCell>
                      </OverlayTableRow>
                    </tbody>
                  </OverlayTable>
                </InfoOverlay>
              )}
            </InfoIconContainer>
            {isTableHovered && (
              <MenuIconContainer ref={menuRef}>
                <MenuIconButton onClick={handleMenuToggle}>
                  <HiEllipsisHorizontal size={28} />
                </MenuIconButton>
                {showMenuOverlay && (
                  <MenuOverlay>
                    <MenuItem>Export data</MenuItem>
                    <MenuItem>Show as a table</MenuItem>
                    <MenuItem>Get insights</MenuItem>
                    <MenuItem>Sort descending</MenuItem>
                    <MenuItem>Sort ascending</MenuItem>
                    <MenuItem>Sort by</MenuItem>
                  </MenuOverlay>
                )}
              </MenuIconContainer>
            )}
          </IconsContainer>
        </DataInfo>

        <TableContainerWrapper
          onMouseEnter={() => {
            // Clear any pending timeout when entering
            if (hideIconTimeoutRef.current) {
              clearTimeout(hideIconTimeoutRef.current);
            }
            setIsTableHovered(true);
          }}
          onMouseLeave={() => {
            // Set timeout to hide icon after 2 seconds
            hideIconTimeoutRef.current = setTimeout(() => {
              handleTableLeave();
            }, 1500);
          }}
        >
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>UPN</TableHeader>
                <TableHeader>School Name</TableHeader>
                <TableHeader>Session date</TableHeader>
                <TableHeader>Attendance code</TableHeader>
                <TableHeader>Period Attendance Code</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {codesData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.upn}</TableCell>
                  <TableCell>{row.schoolName}</TableCell>
                  <TableCell>{row.sessionDate}</TableCell>
                  <TableCell>{row.attendanceCode}</TableCell>
                  <TableCell>{row.periodAbsence}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        </TableContainerWrapper>
              </PageContent>
            </TabContent>
          </MainContent>
          
          <SidebarContainer>
            <Filters />
          </SidebarContainer>
        </MainContentWrapper>
      </ContentContainer>
      
      <SupportSection />
    </Container>
  );
};

export default CodesPage;
