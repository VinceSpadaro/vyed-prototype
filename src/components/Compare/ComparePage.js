import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

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

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
  const [nationalSubTab, setNationalSubTab] = useState('overall-attendance');
  const [senFilter, setSenFilter] = useState('whole-school');
  const [fsmFilter, setFsmFilter] = useState('whole-school');
  const [tableData, setTableData] = useState(mockDataSets.default);
  
  // Update table data when filters change
  useEffect(() => {
    // Determine which data set to use based on filter selections
    if (senFilter === 'whole-school' && fsmFilter === 'whole-school') {
      setTableData(mockDataSets.default);
    } else if (senFilter === 'sen-support' && fsmFilter === 'whole-school') {
      setTableData(mockDataSets.sen_support_whole);
    } else if (senFilter === 'no-sen' && fsmFilter === 'whole-school') {
      setTableData(mockDataSets.no_sen_whole);
    } else if (senFilter === 'whole-school' && fsmFilter === 'fsm') {
      setTableData(mockDataSets.whole_fsm);
    } else if (senFilter === 'whole-school' && fsmFilter === 'no-fsm') {
      setTableData(mockDataSets.whole_no_fsm);
    } else if (senFilter === 'sen-support' && fsmFilter === 'fsm') {
      setTableData(mockDataSets.sen_fsm);
    } else if (senFilter === 'no-sen' && fsmFilter === 'no-fsm') {
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

  // Mock datasets for different filter combinations
  const nationalComparisonData = {
    // Default data (no filters)
    default: {
      attendancePercentage: '92.1%',
      decilePosition: 'You are in decile 6, the bottom 40-50% of schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 96.5%', schools: '2,200', lowest: '96.5%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 95.8% to 96.4%', schools: '2,200', lowest: '95.8%', highest: '96.4%' },
        { decile: '3', description: 'Schools with attendance 95.2% to 95.7%', schools: '2,200', lowest: '95.2%', highest: '95.7%' },
        { decile: '4', description: 'Schools with attendance 94.5% to 95.1%', schools: '2,200', lowest: '94.5%', highest: '95.1%' },
        { decile: '5', description: 'Schools with attendance 93.8% to 94.4%', schools: '2,200', lowest: '93.8%', highest: '94.4%' },
        { decile: '6', description: 'Schools with attendance 93.0% to 93.7%', schools: '2,200', lowest: '93.0%', highest: '93.7%' },
        { decile: '7', description: 'Schools with attendance 92.1% to 92.9%', schools: '2,200', lowest: '92.1%', highest: '92.9%' },
        { decile: '8', description: 'Schools with attendance 91.0% to 92.0%', schools: '2,200', lowest: '91.0%', highest: '92.0%' },
        { decile: '9', description: 'Schools with attendance 89.5% to 90.9%', schools: '2,200', lowest: '89.5%', highest: '90.9%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 89.4%', schools: '2,200', lowest: '0%', highest: '89.4%' },
      ]
    },
    // SEN with EHCP
    'sen-ehcp': {
      attendancePercentage: '89.5%',
      decilePosition: 'decile 3, above average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 94.2%', schools: '1,800', lowest: '94.2%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 92.8% to 94.1%', schools: '1,800', lowest: '92.8%', highest: '94.1%' },
        { decile: '3', description: 'Schools with attendance 91.5% to 92.7%', schools: '1,800', lowest: '91.5%', highest: '92.7%' },
        { decile: '4', description: 'Schools with attendance 90.3% to 91.4%', schools: '1,800', lowest: '90.3%', highest: '91.4%' },
        { decile: '5', description: 'Schools with attendance 89.0% to 90.2%', schools: '1,800', lowest: '89.0%', highest: '90.2%' },
        { decile: '6', description: 'Schools with attendance 87.5% to 88.9%', schools: '1,800', lowest: '87.5%', highest: '88.9%' },
        { decile: '7', description: 'Schools with attendance 85.8% to 87.4%', schools: '1,800', lowest: '85.8%', highest: '87.4%' },
        { decile: '8', description: 'Schools with attendance 83.9% to 85.7%', schools: '1,800', lowest: '83.9%', highest: '85.7%' },
        { decile: '9', description: 'Schools with attendance 81.2% to 83.8%', schools: '1,800', lowest: '81.2%', highest: '83.8%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 81.1%', schools: '1,800', lowest: '0%', highest: '81.1%' },
      ]
    },
    // SEN support
    'sen-support': {
      attendancePercentage: '90.2%',
      decilePosition: 'decile 4, above average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 95.0%', schools: '2,100', lowest: '95.0%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 93.8% to 94.9%', schools: '2,100', lowest: '93.8%', highest: '94.9%' },
        { decile: '3', description: 'Schools with attendance 92.7% to 93.7%', schools: '2,100', lowest: '92.7%', highest: '93.7%' },
        { decile: '4', description: 'Schools with attendance 91.5% to 92.6%', schools: '2,100', lowest: '91.5%', highest: '92.6%' },
        { decile: '5', description: 'Schools with attendance 90.4% to 91.4%', schools: '2,100', lowest: '90.4%', highest: '91.4%' },
        { decile: '6', description: 'Schools with attendance 89.2% to 90.3%', schools: '2,100', lowest: '89.2%', highest: '90.3%' },
        { decile: '7', description: 'Schools with attendance 87.9% to 89.1%', schools: '2,100', lowest: '87.9%', highest: '89.1%' },
        { decile: '8', description: 'Schools with attendance 86.3% to 87.8%', schools: '2,100', lowest: '86.3%', highest: '87.8%' },
        { decile: '9', description: 'Schools with attendance 84.1% to 86.2%', schools: '2,100', lowest: '84.1%', highest: '86.2%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 84.0%', schools: '2,100', lowest: '0%', highest: '84.0%' },
      ]
    },
    // No SEN
    'no-sen': {
      attendancePercentage: '94.3%',
      decilePosition: 'decile 7, below average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 97.2%', schools: '2,300', lowest: '97.2%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 96.7% to 97.1%', schools: '2,300', lowest: '96.7%', highest: '97.1%' },
        { decile: '3', description: 'Schools with attendance 96.3% to 96.6%', schools: '2,300', lowest: '96.3%', highest: '96.6%' },
        { decile: '4', description: 'Schools with attendance 95.9% to 96.2%', schools: '2,300', lowest: '95.9%', highest: '96.2%' },
        { decile: '5', description: 'Schools with attendance 95.5% to 95.8%', schools: '2,300', lowest: '95.5%', highest: '95.8%' },
        { decile: '6', description: 'Schools with attendance 95.1% to 95.4%', schools: '2,300', lowest: '95.1%', highest: '95.4%' },
        { decile: '7', description: 'Schools with attendance 94.6% to 95.0%', schools: '2,300', lowest: '94.6%', highest: '95.0%' },
        { decile: '8', description: 'Schools with attendance 94.0% to 94.5%', schools: '2,300', lowest: '94.0%', highest: '94.5%' },
        { decile: '9', description: 'Schools with attendance 93.2% to 93.9%', schools: '2,300', lowest: '93.2%', highest: '93.9%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 93.1%', schools: '2,300', lowest: '0%', highest: '93.1%' },
      ]
    },
    // FSM eligible
    'fsm-eligible': {
      attendancePercentage: '88.7%',
      decilePosition: 'decile 6, below average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 93.5%', schools: '1,950', lowest: '93.5%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 92.4% to 93.4%', schools: '1,950', lowest: '92.4%', highest: '93.4%' },
        { decile: '3', description: 'Schools with attendance 91.5% to 92.3%', schools: '1,950', lowest: '91.5%', highest: '92.3%' },
        { decile: '4', description: 'Schools with attendance 90.6% to 91.4%', schools: '1,950', lowest: '90.6%', highest: '91.4%' },
        { decile: '5', description: 'Schools with attendance 89.7% to 90.5%', schools: '1,950', lowest: '89.7%', highest: '90.5%' },
        { decile: '6', description: 'Schools with attendance 88.8% to 89.6%', schools: '1,950', lowest: '88.8%', highest: '89.6%' },
        { decile: '7', description: 'Schools with attendance 87.7% to 88.7%', schools: '1,950', lowest: '87.7%', highest: '88.7%' },
        { decile: '8', description: 'Schools with attendance 86.5% to 87.6%', schools: '1,950', lowest: '86.5%', highest: '87.6%' },
        { decile: '9', description: 'Schools with attendance 84.8% to 86.4%', schools: '1,950', lowest: '84.8%', highest: '86.4%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 84.7%', schools: '1,950', lowest: '0%', highest: '84.7%' },
      ]
    },
    // Not FSM eligible
    'not-fsm-eligible': {
      attendancePercentage: '93.8%',
      decilePosition: 'decile 4, above average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 96.9%', schools: '2,250', lowest: '96.9%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 96.2% to 96.8%', schools: '2,250', lowest: '96.2%', highest: '96.8%' },
        { decile: '3', description: 'Schools with attendance 95.6% to 96.1%', schools: '2,250', lowest: '95.6%', highest: '96.1%' },
        { decile: '4', description: 'Schools with attendance 95.0% to 95.5%', schools: '2,250', lowest: '95.0%', highest: '95.5%' },
        { decile: '5', description: 'Schools with attendance 94.4% to 94.9%', schools: '2,250', lowest: '94.4%', highest: '94.9%' },
        { decile: '6', description: 'Schools with attendance 93.8% to 94.3%', schools: '2,250', lowest: '93.8%', highest: '94.3%' },
        { decile: '7', description: 'Schools with attendance 93.1% to 93.7%', schools: '2,250', lowest: '93.1%', highest: '93.7%' },
        { decile: '8', description: 'Schools with attendance 92.3% to 93.0%', schools: '2,250', lowest: '92.3%', highest: '93.0%' },
        { decile: '9', description: 'Schools with attendance 91.2% to 92.2%', schools: '2,250', lowest: '91.2%', highest: '92.2%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 91.1%', schools: '2,250', lowest: '0%', highest: '91.1%' },
      ]
    },
    // Combined filters
    'sen-ehcp-fsm-eligible': {
      attendancePercentage: '85.3%',
      decilePosition: 'decile 2, well above average schools',
      decileData: [
        { decile: '1 (highest)', description: 'Schools with attendance >= 89.0%', schools: '1,600', lowest: '89.0%', highest: '100%' },
        { decile: '2', description: 'Schools with attendance 87.2% to 88.9%', schools: '1,600', lowest: '87.2%', highest: '88.9%' },
        { decile: '3', description: 'Schools with attendance 85.6% to 87.1%', schools: '1,600', lowest: '85.6%', highest: '87.1%' },
        { decile: '4', description: 'Schools with attendance 84.1% to 85.5%', schools: '1,600', lowest: '84.1%', highest: '85.5%' },
        { decile: '5', description: 'Schools with attendance 82.7% to 84.0%', schools: '1,600', lowest: '82.7%', highest: '84.0%' },
        { decile: '6', description: 'Schools with attendance 81.2% to 82.6%', schools: '1,600', lowest: '81.2%', highest: '82.6%' },
        { decile: '7', description: 'Schools with attendance 79.5% to 81.1%', schools: '1,600', lowest: '79.5%', highest: '81.1%' },
        { decile: '8', description: 'Schools with attendance 77.6% to 79.4%', schools: '1,600', lowest: '77.6%', highest: '79.4%' },
        { decile: '9', description: 'Schools with attendance 74.8% to 77.5%', schools: '1,600', lowest: '74.8%', highest: '77.5%' },
        { decile: '10 (lowest)', description: 'Schools with attendance <= 74.7%', schools: '1,600', lowest: '0%', highest: '74.7%' },
      ]
    }
  };

  // Helper function to get the current dataset based on filters
  const getCurrentDataset = () => {
    if (senFilter === 'sen-ehcp' && fsmFilter === 'fsm-eligible') {
      return nationalComparisonData['sen-ehcp-fsm-eligible'];
    } else if (senFilter === 'sen-ehcp') {
      return nationalComparisonData['sen-ehcp'];
    } else if (senFilter === 'sen-support') {
      return nationalComparisonData['sen-support'];
    } else if (senFilter === 'no-sen') {
      return nationalComparisonData['no-sen'];
    } else if (fsmFilter === 'fsm-eligible') {
      return nationalComparisonData['fsm-eligible'];
    } else if (fsmFilter === 'not-fsm-eligible') {
      return nationalComparisonData['not-fsm-eligible'];
    } else {
      return nationalComparisonData.default;
    }
  };

  // Render content for National comparison tab based on selected sub-tab
  const renderNationalComparisonContent = () => {
    // Get the current dataset based on filters
    const currentData = getCurrentDataset();
    const attendancePercentage = currentData.attendancePercentage;
    const decilePosition = currentData.decilePosition;
    const decileData = currentData.decileData;
    
    // Get title based on selected sub-tab
    const getTitle = () => {
      switch (nationalSubTab) {
        case 'overall-attendance': return 'Overall attendance';
        case 'overall-absence': return 'Overall absence';
        case 'authorised-absence': return 'Authorised absence';
        case 'unauthorised-absence': return 'Unauthorised absence';
        case 'persistently-absent': return 'Persistently absent';
        default: return 'Overall attendance';
      }
    };

    return (
      <div>
        <h3>{getTitle()}</h3>
        
        {/* Display attendance percentage and decile position */}
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <div style={{ 
            backgroundColor: '#1d70b8', 
            color: 'white',
            padding: '15px 20px',
            marginRight: '20px',
            width: '200px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '5px' }}>Your overall attendance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{attendancePercentage}</div>
          </div>
          <div style={{ 
            backgroundColor: '#1d70b8', 
            color: 'white', 
            padding: '20px',
            width: '300px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', lineHeight: '1.4' }}>{decilePosition}</div>
          </div>
        </div>
        
        
        {/* Table showing deciles */}
        <TableContainer>
          <div style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: '800px' }}>
              <TableHeader style={{ gridTemplateColumns: '0.5fr 1fr 1fr 1fr 1fr' }}>
                <TableHeaderCell>Decile</TableHeaderCell>
                <TableHeaderCell>Decile description</TableHeaderCell>
                <TableHeaderCell>Number of schools <InfoIcon>i</InfoIcon></TableHeaderCell>
                <TableHeaderCell>Lowest in decile <InfoIcon>i</InfoIcon></TableHeaderCell>
                <TableHeaderCell>Highest in decile <InfoIcon>i</InfoIcon></TableHeaderCell>
              </TableHeader>
              <TableBody style={{ gridTemplateColumns: '0.5fr 1fr 1fr 1fr 1fr' }}>
                {decileData.map((row, index) => (
                  <TableRow key={row.decile} striped={index % 2 === 1}>
                    <TableCell>{row.decile}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.schools}</TableCell>
                    <TableCell>{row.lowest}</TableCell>
                    <TableCell>{row.highest}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
          </div>
        </TableContainer>
      </div>
    );
  };
  
  return (
    <Container>
      <ToolsBreadcrumbs 
        items={[{ label: 'Monitor your school attendance', to: '/tools' }]} 
        currentPage="Compare your attendance" 
      />
      
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
            <button 
              onClick={() => window.alert('This would link to guidance on calculations')}
              style={{ 
                color: '#1d70b8', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                font: 'inherit'
              }}
            >
              How we calculate your position.
            </button>
            
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
                        checked={senFilter === 'whole-school'}
                        onChange={() => handleSenFilterChange('whole-school')} 
                      />
                      Results for whole school
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="sen" 
                        checked={senFilter === 'sen-support'}
                        onChange={() => handleSenFilterChange('sen-support')} 
                      />
                      Pupils with SEN support
                    </RadioLabel>
                  </FilterOption>
                  <FilterOption>
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="sen" 
                        checked={senFilter === 'no-sen'}
                        onChange={() => handleSenFilterChange('no-sen')} 
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
                        checked={fsmFilter === 'whole-school'}
                        onChange={() => handleFsmFilterChange('whole-school')} 
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
                        checked={fsmFilter === 'no-fsm'}
                        onChange={() => handleFsmFilterChange('no-fsm')} 
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
            <button 
              onClick={() => window.alert('This would open in fullscreen')}
              style={{ 
                color: '#1d70b8', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                font: 'inherit',
                fontSize: '14px',
                marginBottom: '20px',
                display: 'inline-block'
              }}
            >
              Present in fullscreen
            </button>
          </>
        )}
        
        {activeTab === 'national' && (
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '250px', borderRight: '1px solid #b1b4b6', paddingRight: '15px', marginRight: '20px' }}>
                <nav>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ 
                      padding: '10px 0', 
                      borderLeft: nationalSubTab === 'overall-attendance' ? '4px solid #1d70b8' : 'none',
                      paddingLeft: nationalSubTab === 'overall-attendance' ? '10px' : '14px',
                      backgroundColor: nationalSubTab === 'overall-attendance' ? '#f3f2f1' : 'transparent'
                    }}>
                      <button 
                        onClick={() => setNationalSubTab('overall-attendance')}
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1d70b8',
                          fontWeight: nationalSubTab === 'overall-attendance' ? 'bold' : 'normal',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                          font: 'inherit'
                        }}
                      >
                        Overall attendance
                      </button>
                    </li>
                    <li style={{ 
                      padding: '10px 0', 
                      borderLeft: nationalSubTab === 'overall-absence' ? '4px solid #1d70b8' : 'none',
                      paddingLeft: nationalSubTab === 'overall-absence' ? '10px' : '14px',
                      backgroundColor: nationalSubTab === 'overall-absence' ? '#f3f2f1' : 'transparent'
                    }}>
                      <button 
                        onClick={() => setNationalSubTab('overall-absence')}
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1d70b8',
                          fontWeight: nationalSubTab === 'overall-absence' ? 'bold' : 'normal',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                          font: 'inherit'
                        }}
                      >
                        Overall absence
                      </button>
                    </li>
                    <li style={{ 
                      padding: '10px 0', 
                      borderLeft: nationalSubTab === 'authorised-absence' ? '4px solid #1d70b8' : 'none',
                      paddingLeft: nationalSubTab === 'authorised-absence' ? '10px' : '14px',
                      backgroundColor: nationalSubTab === 'authorised-absence' ? '#f3f2f1' : 'transparent'
                    }}>
                      <button 
                        onClick={() => setNationalSubTab('authorised-absence')}
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1d70b8',
                          fontWeight: nationalSubTab === 'authorised-absence' ? 'bold' : 'normal',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                          font: 'inherit'
                        }}
                      >
                        Authorised absence
                      </button>
                    </li>
                    <li style={{ 
                      padding: '10px 0', 
                      borderLeft: nationalSubTab === 'unauthorised-absence' ? '4px solid #1d70b8' : 'none',
                      paddingLeft: nationalSubTab === 'unauthorised-absence' ? '10px' : '14px',
                      backgroundColor: nationalSubTab === 'unauthorised-absence' ? '#f3f2f1' : 'transparent'
                    }}>
                      <button 
                        onClick={() => setNationalSubTab('unauthorised-absence')}
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1d70b8',
                          fontWeight: nationalSubTab === 'unauthorised-absence' ? 'bold' : 'normal',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                          font: 'inherit'
                        }}
                      >
                        Unauthorised absence
                      </button>
                    </li>
                    <li style={{ 
                      padding: '10px 0', 
                      borderLeft: nationalSubTab === 'persistently-absent' ? '4px solid #1d70b8' : 'none',
                      paddingLeft: nationalSubTab === 'persistently-absent' ? '10px' : '14px',
                      backgroundColor: nationalSubTab === 'persistently-absent' ? '#f3f2f1' : 'transparent'
                    }}>
                      <button 
                        onClick={() => setNationalSubTab('persistently-absent')}
                        style={{ 
                          textDecoration: 'none', 
                          color: '#1d70b8',
                          fontWeight: nationalSubTab === 'persistently-absent' ? 'bold' : 'normal',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                          font: 'inherit'
                        }}
                      >
                        Persistently absent
                      </button>
                    </li>
                  </ul>
                </nav>
                <p style={{ fontSize: '14px', marginTop: '20px' }}>
                  Last updated: 06/03/2025
                </p>
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '24px', marginTop: 0 }}>National comparison</h2>
                <p>
                  Compare your attendance and absence in the same phase of education (primary or secondary) in England. Data is from schools
                  sharing daily attendance data with DfE. It is updated every 2 weeks.
                </p>
                <p>
                  Results show data for compulsory school age pupils in the academic year-to-date.
                  <br />
                  <button 
                    onClick={() => window.alert('This would link to guidance on calculations')}
                    style={{ 
                      color: '#1d70b8', 
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: 'inherit'
                    }}
                  >
                    how we calculate your position and how to use your results.
                  </button>
                </p>
                
                <div style={{ backgroundColor: '#f3f2f1', padding: '15px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '19px' }}>Filters</h3>
                    <span style={{ marginLeft: '5px', color: '#505a5f', fontSize: '16px' }}>ⓘ</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '40px' }}>
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Special educational needs (SEN) support</p>
                      <div>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input 
                            type="radio" 
                            name="sen" 
                            value="whole-school" 
                            checked={senFilter === 'whole-school'} 
                            onChange={() => setSenFilter('whole-school')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Results for whole school
                        </label>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input 
                            type="radio" 
                            name="sen" 
                            value="sen-support" 
                            checked={senFilter === 'sen-support'} 
                            onChange={() => setSenFilter('sen-support')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Pupils with SEN support
                        </label>
                        <label style={{ display: 'block' }}>
                          <input 
                            type="radio" 
                            name="sen" 
                            value="no-sen" 
                            checked={senFilter === 'no-sen'} 
                            onChange={() => setSenFilter('no-sen')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Pupils with no or unknown SEN support
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Free school meals (FSM)</p>
                      <div>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input 
                            type="radio" 
                            name="fsm" 
                            value="whole-school" 
                            checked={fsmFilter === 'whole-school'} 
                            onChange={() => setFsmFilter('whole-school')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Results for whole school
                        </label>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <input 
                            type="radio" 
                            name="fsm" 
                            value="fsm" 
                            checked={fsmFilter === 'fsm'} 
                            onChange={() => setFsmFilter('fsm')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Pupils with FSM
                        </label>
                        <label style={{ display: 'block' }}>
                          <input 
                            type="radio" 
                            name="fsm" 
                            value="no-fsm" 
                            checked={fsmFilter === 'no-fsm'} 
                            onChange={() => setFsmFilter('no-fsm')} 
                            style={{ marginRight: '10px' }} 
                          />
                          Pupils with no or unknown FSM
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {renderNationalComparisonContent()}
                
                <div style={{ marginTop: '20px' }}>
                  <button 
                    onClick={() => window.alert('This would open in fullscreen')}
                    style={{ 
                      color: '#1d70b8', 
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: 'inherit',
                      fontSize: '14px'
                    }}
                  >
                    Present in fullscreen
                  </button>
                </div>
              </div>
            </div>
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
            
            <button 
              onClick={() => window.alert('This would open in fullscreen')}
              style={{ 
                color: '#1d70b8', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                font: 'inherit',
                fontSize: '14px',
                marginBottom: '20px',
                display: 'inline-block'
              }}
            >
              Present in fullscreen
            </button>
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
