import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SupportSection from '../Support/SupportSection';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 20px;
  color: #1d70b8;
  font-size: 14px;
`;

const BreadcrumbLink = styled(Link)`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: #1d70b8;
`;

const CurrentPage = styled.span`
  color: #1d70b8;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #b1b4b6;
  margin-bottom: 0;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 15px 20px;
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  border: none;
  border-bottom: ${props => props.active ? '3px solid #1d70b8' : 'none'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.active ? '#fff' : '#e8e8e8'};
  }
`;

const ContentContainer = styled.div`
  border: 1px solid #ddd;
  border-top: none;
  padding: 20px;
  background-color: #fff;
`;


const ContentTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const ContentDescription = styled.p`
  margin-bottom: 15px;
`;

const StyledLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FiltersSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #f3f2f1;
  padding: 20px;
  border-radius: 5px;
`;

const FiltersTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #1d70b8;
  color: white;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  margin-left: 5px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilterColumn = styled.div`
  width: 50%;
  margin-bottom: 20px;
`;

const FilterOption = styled.div`
  margin-bottom: 10px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const TableContainer = styled.div`
  margin-top: 30px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #b1b4b6;
`;

const TableHeaderCell = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #b1b4b6;
  background-color: ${props => props.striped ? '#f8f8f8' : 'transparent'};
`;

const TableCell = styled.div`
  padding: 10px;
`;

const LastUpdated = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const FullscreenLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 30px 0;
`;

// Mock data sets for different filter combinations
const mockDataSets = {
  // Default data (whole school, whole school)
  default: [
    { measure: 'Overall attendance', percentage: '91.9%', ranking: 'You are ranked 7th out of 23 schools' },
    { measure: 'Overall absence', percentage: '8.1%', ranking: 'You are ranked 7th out of 23 schools' },
    { measure: 'Authorised absence', percentage: '5.1%', ranking: 'You are ranked 5th out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '3.0%', ranking: 'You are ranked 11th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '23.0%', ranking: 'You are ranked 8th out of 23 schools' },
    { measure: 'Severely absent', percentage: '3.3%', ranking: 'You are ranked 7th out of 23 schools' },
  ],
  // SEN support, whole school
  sen_support_whole: [
    { measure: 'Overall attendance', percentage: '88.5%', ranking: 'You are ranked 12th out of 23 schools' },
    { measure: 'Overall absence', percentage: '11.5%', ranking: 'You are ranked 14th out of 23 schools' },
    { measure: 'Authorised absence', percentage: '7.2%', ranking: 'You are ranked 15th out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '4.3%', ranking: 'You are ranked 10th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '29.7%', ranking: 'You are ranked 18th out of 23 schools' },
    { measure: 'Severely absent', percentage: '5.1%', ranking: 'You are ranked 16th out of 23 schools' },
  ],
  // No SEN support, whole school
  no_sen_whole: [
    { measure: 'Overall attendance', percentage: '93.2%', ranking: 'You are ranked 5th out of 23 schools' },
    { measure: 'Overall absence', percentage: '6.8%', ranking: 'You are ranked 5th out of 23 schools' },
    { measure: 'Authorised absence', percentage: '4.5%', ranking: 'You are ranked 3rd out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '2.3%', ranking: 'You are ranked 8th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '18.4%', ranking: 'You are ranked 6th out of 23 schools' },
    { measure: 'Severely absent', percentage: '2.1%', ranking: 'You are ranked 4th out of 23 schools' },
  ],
  // Whole school, FSM
  whole_fsm: [
    { measure: 'Overall attendance', percentage: '87.3%', ranking: 'You are ranked 15th out of 23 schools' },
    { measure: 'Overall absence', percentage: '12.7%', ranking: 'You are ranked 15th out of 23 schools' },
    { measure: 'Authorised absence', percentage: '7.9%', ranking: 'You are ranked 17th out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '4.8%', ranking: 'You are ranked 14th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '32.5%', ranking: 'You are ranked 19th out of 23 schools' },
    { measure: 'Severely absent', percentage: '6.2%', ranking: 'You are ranked 18th out of 23 schools' },
  ],
  // Whole school, no FSM
  whole_no_fsm: [
    { measure: 'Overall attendance', percentage: '94.1%', ranking: 'You are ranked 3rd out of 23 schools' },
    { measure: 'Overall absence', percentage: '5.9%', ranking: 'You are ranked 3rd out of 23 schools' },
    { measure: 'Authorised absence', percentage: '4.1%', ranking: 'You are ranked 2nd out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '1.8%', ranking: 'You are ranked 5th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '14.2%', ranking: 'You are ranked 4th out of 23 schools' },
    { measure: 'Severely absent', percentage: '1.7%', ranking: 'You are ranked 3rd out of 23 schools' },
  ],
  // SEN support, FSM
  sen_fsm: [
    { measure: 'Overall attendance', percentage: '84.6%', ranking: 'You are ranked 20th out of 23 schools' },
    { measure: 'Overall absence', percentage: '15.4%', ranking: 'You are ranked 20th out of 23 schools' },
    { measure: 'Authorised absence', percentage: '9.3%', ranking: 'You are ranked 21st out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '6.1%', ranking: 'You are ranked 19th out of 23 schools' },
    { measure: 'Persistently absent', percentage: '38.7%', ranking: 'You are ranked 22nd out of 23 schools' },
    { measure: 'Severely absent', percentage: '8.9%', ranking: 'You are ranked 21st out of 23 schools' },
  ],
  // No SEN, No FSM
  no_sen_no_fsm: [
    { measure: 'Overall attendance', percentage: '95.8%', ranking: 'You are ranked 1st out of 23 schools' },
    { measure: 'Overall absence', percentage: '4.2%', ranking: 'You are ranked 1st out of 23 schools' },
    { measure: 'Authorised absence', percentage: '3.1%', ranking: 'You are ranked 1st out of 23 schools' },
    { measure: 'Unauthorised absence', percentage: '1.1%', ranking: 'You are ranked 2nd out of 23 schools' },
    { measure: 'Persistently absent', percentage: '9.5%', ranking: 'You are ranked 2nd out of 23 schools' },
    { measure: 'Severely absent', percentage: '0.9%', ranking: 'You are ranked 1st out of 23 schools' },
  ],
};

const ComparePage = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [senFilter, setSenFilter] = useState('whole');
  const [fsmFilter, setFsmFilter] = useState('whole');
  const [tableData, setTableData] = useState(mockDataSets.default);
  
  // Update table data when filters change
  useEffect(() => {
    // Determine which data set to use based on filter selections
    if (senFilter === 'whole' && fsmFilter === 'whole') {
      setTableData(mockDataSets.default);
    } else if (senFilter === 'support' && fsmFilter === 'whole') {
      setTableData(mockDataSets.sen_support_whole);
    } else if (senFilter === 'no_support' && fsmFilter === 'whole') {
      setTableData(mockDataSets.no_sen_whole);
    } else if (senFilter === 'whole' && fsmFilter === 'fsm') {
      setTableData(mockDataSets.whole_fsm);
    } else if (senFilter === 'whole' && fsmFilter === 'no_fsm') {
      setTableData(mockDataSets.whole_no_fsm);
    } else if (senFilter === 'support' && fsmFilter === 'fsm') {
      setTableData(mockDataSets.sen_fsm);
    } else if (senFilter === 'no_support' && fsmFilter === 'no_fsm') {
      setTableData(mockDataSets.no_sen_no_fsm);
    } else {
      // For any other combinations, use default data
      setTableData(mockDataSets.default);
    }
  }, [senFilter, fsmFilter]);
  
  // Handle filter changes
  const handleSenFilterChange = (value) => {
    setSenFilter(value);
  };
  
  const handleFsmFilterChange = (value) => {
    setFsmFilter(value);
  };
  
  return (
    <Container>
      <BreadcrumbNav>
        <BreadcrumbLink to="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink to="/insights">Monitor your school attendance</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink to="/compare">Compare your attendance (demo)</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <CurrentPage>Compare your attendance</CurrentPage>
      </BreadcrumbNav>
      
      <PageTitle>Compare your attendance</PageTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'local'} 
          onClick={() => setActiveTab('local')}
        >
          Local authority comparison
        </Tab>
        <Tab 
          active={activeTab === 'national'} 
          onClick={() => setActiveTab('national')}
        >
          National comparison
        </Tab>
        <Tab 
          active={activeTab === 'improving'} 
          onClick={() => setActiveTab('improving')}
        >
          Improving your attendance
        </Tab>
        <div style={{ flexGrow: 1 }}></div>
        <Tab 
          active={activeTab === 'feedback'} 
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {activeTab === 'local' && (
          <>
            <ContentTitle>Local authority comparison</ContentTitle>
            <ContentDescription>
              Compare your attendance and absence in the same phase of education (primary or secondary) in your local authority. Data is from schools sharing daily attendance data with DfE. It is updated every 2 weeks.
            </ContentDescription>
            <ContentDescription>
              Results show data for compulsory school age pupils in the academic year-to-date.
            </ContentDescription>
            <StyledLink href="#">How we calculate your position.</StyledLink>
            
            <FiltersSection>
              <FiltersTitle>
                Filters
                <InfoIcon>i</InfoIcon>
              </FiltersTitle>
              
              <FilterGroup>
                <FilterColumn>
                  <h4>Special educational needs (SEN) support</h4>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="sen" 
                        checked={senFilter === 'whole'}
                        onChange={() => handleSenFilterChange('whole')} 
                      />
                      Results for whole school
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="sen" 
                        checked={senFilter === 'support'}
                        onChange={() => handleSenFilterChange('support')} 
                      />
                      Pupils with SEN support
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="sen" 
                        checked={senFilter === 'no_support'}
                        onChange={() => handleSenFilterChange('no_support')} 
                      />
                      Pupils with no or unknown SEN support
                    </RadioLabel>
                  </FilterOption>
                </FilterColumn>
                
                <FilterColumn>
                  <h4>Free school meals (FSM)</h4>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="fsm" 
                        checked={fsmFilter === 'whole'}
                        onChange={() => handleFsmFilterChange('whole')} 
                      />
                      Results for whole school
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="fsm" 
                        checked={fsmFilter === 'fsm'}
                        onChange={() => handleFsmFilterChange('fsm')} 
                      />
                      Pupils with FSM
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="fsm" 
                        checked={fsmFilter === 'no_fsm'}
                        onChange={() => handleFsmFilterChange('no_fsm')} 
                      />
                      Pupils with no or unknown FSM
                    </RadioLabel>
                  </FilterOption>
                </FilterColumn>
              </FilterGroup>
            </FiltersSection>
            
            <TableContainer>
              <TableHeader>
                <TableHeaderCell>Attendance measure</TableHeaderCell>
                <TableHeaderCell>Percentage</TableHeaderCell>
                <TableHeaderCell>
                  Ranking
                  <InfoIcon>i</InfoIcon>
                </TableHeaderCell>
              </TableHeader>
              
              {tableData.map((row, index) => (
                <TableRow key={row.measure} striped={index % 2 === 1}>
                  <TableCell>{row.measure}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>{row.ranking}</TableCell>
                </TableRow>
              ))}
            </TableContainer>
            
            <LastUpdated>Last updated: 06/03/2025</LastUpdated>
            <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
          </>
        )}
        
        {activeTab === 'national' && (
          <div>
            <h2>National comparison content will go here</h2>
            <p>This tab is not implemented in the current prototype.</p>
          </div>
        )}
        
        {activeTab === 'improving' && (
          <div>
            <div style={{ backgroundColor: '#1d70b8', padding: '20px', color: 'white', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Improving your attendance</h2>
            </div>
            
            <p>
              Comparing your attendance with other schools can help you improve your attendance by giving you an understanding of how you're performing.
              You can find out how we calculate your position and what data we include in the <StyledLink href="#">Monitor your school attendance user guide</StyledLink>.
            </p>
            
            <p>To help you improve attendance, you can:</p>
            
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>
                get local authority, regional and national comparisons, using the <StyledLink href="#">pupil attendance and absence in England dashboard</StyledLink>
              </li>
              <li style={{ marginBottom: '10px' }}>
                read guidance on <StyledLink href="#">how schools and local authorities work together to improve school attendance</StyledLink>
              </li>
              <li style={{ marginBottom: '10px' }}>
                read case studies and learn about <StyledLink href="#">good practice for improving attendance for schools and multi-academy trusts</StyledLink>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <StyledLink href="#">access a trust and school improvement offer</StyledLink> if your school receives a 'requires improvement' Ofsted judgment in the current academic year
              </li>
              <li style={{ marginBottom: '10px' }}>
                speak to your <StyledLink href="#">local authority school attendance support team</StyledLink> (Chapter 4, working together to improve school attendance guidance)
              </li>
            </ul>
            
            <FullscreenLink href="#">Present in fullscreen</FullscreenLink>
          </div>
        )}
        
        {activeTab === 'feedback' && (
          <div>
            <div style={{ backgroundColor: '#00a39e', padding: '30px 40px', color: 'white', borderRadius: '5px 5px 0 0' }}>
              <h2 style={{ margin: 0, fontSize: '28px', marginBottom: '20px' }}>Give feedback about Monitor your school attendance</h2>
              <p style={{ margin: 0, fontSize: '16px' }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            
            <div style={{ backgroundColor: '#f3f2f1', padding: '30px 40px', marginBottom: '30px' }}>
              <p>This form is to give feedback only. Do not use this form to report a problem, or if you need a response.</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                <button 
                  style={{ 
                    backgroundColor: '#00a39e', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Start now
                </button>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <img src="https://static.forms.office.net/forms/images/microsoft365-logo.svg" alt="Microsoft 365" style={{ height: '20px', marginRight: '10px' }} />
              <p>
                This content is created by the owner of the form. The data you submit will be sent to the form owner. Microsoft is not responsible for the privacy or security practices of its customers, including those of this form owner. Never give out your password.
              </p>
            </div>
          </div>
        )}
      </ContentContainer>
      
      <Divider />
      
      <SupportSection />
    </Container>
  );
};

export default ComparePage;
