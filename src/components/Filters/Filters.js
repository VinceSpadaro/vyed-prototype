import React, { useState } from 'react';
import styled from 'styled-components';
import FilterItem from './FilterItem';
import { media } from '../Dashboard/ResponsiveStyles';

const FilterItemContainer = styled.div`
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: ${props => props.isActive ? '#f5f5f5' : '#fff'};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
  color: #333;
`;

const FiltersContainer = styled.div`
  border: 1px solid #b1b4b6;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  
  ${media.small`
    padding: 10px;
  `}
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f3f2f1;
  padding-bottom: 10px;
`;

const FiltersTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ExpandIcon = styled.span`
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #b1b4b6;
  margin-bottom: 15px;
  font-size: 0.9rem;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const FiltersOnPage = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const Filters = () => {
  const [activeFilters, setActiveFilters] = useState({
    compulsorySchoolAge: [],
    sex: [],
    ethnicity: [],
    yearGroup: [],
    persistentlyAbsent: [],
    severelyAbsent: [],
    sen: [],
    senType: [],
    fsm: [],
    ehcp: [],
    lac: [],
    plac: [],
    cin: [],
    cpp: [],
    leavers: [],
    leavingDate: [],
    eal: []
  });
  
  // Filter options for each category
  const filterOptions = {
    compulsorySchoolAge: ['Select all', 'No', 'Yes'],
    sex: ['Select all', 'Female', 'Male'],
    ethnicity: [
      'Select all', '(Blank)', 'Any other asian background', 'Any other black background',
      'Any other ethnic group', 'Any other mixed background', 'Bangladeshi', 'Black-Somali',
      'Black Caribbean', 'Chinese', 'Gypsy/Roma', 'Indian', 'Information not yet obtained',
      'Other black African', 'Pakistani', 'Refused', 'Traveller of Irish heritage',
      'White-British', 'White-Irish', 'White-Irish traveller', 'White and Asian',
      'White and black African', 'White and black Caribbean', 'White Eastern European',
      'White other', 'White Western European'
    ],
    yearGroup: ['Select all', '(13)', '7', '8', '9', '10', '11', '12', '13'],
    persistentlyAbsent: ['Select all', 'No', 'Yes'],
    severelyAbsent: ['Select all', 'No', 'Yes'],
    sen: ['Select all', 'No', 'Unknown', 'Yes'],
    fsm: ['Select all', 'No', 'Yes'],
    ehcp: ['Select all', 'No', 'Unknown', 'Yes'],
    lac: ['Select all', 'No', 'Yes'],
    plac: ['Select all', 'No', 'Yes'],
    cin: ['Select all', 'Unknown'],
    cpp: ['Select all', 'Unknown'],
    leavers: ['Select all', 'All current pupils', 'Leavers current academic year', 'Leavers previous academic year'],
    leavingDate: ['Select all', 'Has leaving date', 'No leaving date'],
    eal: ['Select all', 'No', 'Unknown', 'Yes']
  };
  
  // Function to clear a filter
  const handleClearFilter = (filterKey) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: []
    }));
  };
  
  const handleFilterChange = (filterName, value, isAdvanced = false, isCheck = false) => {
    // If this is just a check to see if an option is selected, return the result without changing state
    if (isCheck) {
      if (value === 'Select all') {
        // For Select all, check if all other options are selected
        const allOptionsExceptSelectAll = filterOptions[filterName].filter(opt => opt !== 'Select all');
        return allOptionsExceptSelectAll.length > 0 && 
               allOptionsExceptSelectAll.every(opt => activeFilters[filterName].includes(opt));
      }
      return activeFilters[filterName].includes(value);
    }
    
    // Handle advanced filtering separately
    if (isAdvanced) {
      setActiveFilters(prev => ({
        ...prev,
        [filterName]: [value] // Store as array for consistency
      }));
      return;
    }
    
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      
      // If value is an array (from FilterItem component), use it directly
      if (Array.isArray(value)) {
        updatedFilters[filterName] = [...value];
        return updatedFilters;
      }
      
      // Handle "Select all" option
      if (value === 'Select all') {
        // Toggle between all selected and none selected
        if (updatedFilters[filterName].length === filterOptions[filterName].length - 1) {
          updatedFilters[filterName] = [];
        } else {
          updatedFilters[filterName] = [...filterOptions[filterName].filter(opt => opt !== 'Select all')];
        }
      } else {
        // Handle individual option toggle with Set to ensure uniqueness
        const uniqueOptions = new Set(updatedFilters[filterName]);
        
        if (uniqueOptions.has(value)) {
          // Remove if already selected
          uniqueOptions.delete(value);
        } else {
          // Add if not selected
          uniqueOptions.add(value);
        }
        
        updatedFilters[filterName] = Array.from(uniqueOptions);
      }
      
      return updatedFilters;
    });
  };

  // Helper function to format the filter description
  const getFilterDescription = (filterName) => {
    const values = activeFilters[filterName];
    
    // Empty array means no selections (default state)
    if (values.length === 0) {
      return 'is (All)';
    } 
    // Single selection
    else if (values.length === 1) {
      return `is ${values[0]}`;
    } 
    // All options selected
    else if (values.length === filterOptions[filterName].length - 1) { // -1 for 'Select all'
      return 'is (All)';
    } 
    // Multiple selections
    else {
      // Show all selected options separated by commas
      return `is ${values.join(', ')}`;
    }
  };

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersTitle>Filters</FiltersTitle>
        <ExpandIcon>›</ExpandIcon>
      </FiltersHeader>
      
      <SearchInput type="text" placeholder="Search" />
      
      <FiltersOnPage>Filters on this page</FiltersOnPage>
      
      <FilterItem
        title="Compulsory school age"
        description={getFilterDescription('compulsorySchoolAge')}
        options={filterOptions.compulsorySchoolAge}
        onClear={() => handleClearFilter('compulsorySchoolAge')}
        onSelect={(option, isAdvanced) => handleFilterChange('compulsorySchoolAge', option, isAdvanced)}
      />
      <FilterItem
        title="Sex"
        description={getFilterDescription('sex')}
        options={filterOptions.sex}
        onClear={() => handleClearFilter('sex')}
        onSelect={(option, isAdvanced) => handleFilterChange('sex', option, isAdvanced)}
      />
      <FilterItem
        title="Ethnicity"
        description={getFilterDescription('ethnicity')}
        options={filterOptions.ethnicity}
        onClear={() => handleClearFilter('ethnicity')}
        onSelect={(option, isAdvanced) => handleFilterChange('ethnicity', option, isAdvanced)}
      />
      <FilterItem
        title="English as an additional language"
        description={getFilterDescription('eal')}
        options={filterOptions.eal}
        onClear={() => handleClearFilter('eal')}
        onSelect={(option, isAdvanced) => handleFilterChange('eal', option, isAdvanced)}
      />
      <FilterItem
        title="Year group"
        description={getFilterDescription('yearGroup')}
        options={filterOptions.yearGroup}
        onClear={() => handleClearFilter('yearGroup')}
        onSelect={(option, isAdvanced) => handleFilterChange('yearGroup', option, isAdvanced)}
      />
      <FilterItem
        title="Persistently absent"
        description={getFilterDescription('persistentlyAbsent')}
        options={filterOptions.persistentlyAbsent}
        onClear={() => handleClearFilter('persistentlyAbsent')}
        onSelect={(option, isAdvanced) => handleFilterChange('persistentlyAbsent', option, isAdvanced)}
      />
      <FilterItem
        title="Severely absent"
        description={getFilterDescription('severelyAbsent')}
        options={filterOptions.severelyAbsent}
        onClear={() => handleClearFilter('severelyAbsent')}
        onSelect={(option, isAdvanced) => handleFilterChange('severelyAbsent', option, isAdvanced)}
      />
      <FilterItem
        title="Special educational needs (SEN)"
        description={getFilterDescription('sen')}
        options={filterOptions.sen}
        onClear={() => handleClearFilter('sen')}
        onSelect={(option, isAdvanced) => handleFilterChange('sen', option, isAdvanced)}
      />
      <FilterItemContainer isActive={false}>
        <FilterHeader>
          <div style={{ flex: 1 }}>
            <FilterTitle>
              <div style={{ fontWeight: 'normal', fontSize: '0.8rem'}}>
               SEN type (Rank 1 or 2)
              </div>
            </FilterTitle>
            <div style={{ fontWeight: 'normal', fontSize: '0.9rem', marginTop: '4px', color: '#666' }}>
              Options not available
            </div>
          </div>
        </FilterHeader>
      </FilterItemContainer>
      <FilterItem
        title="Free school meals (FSM)"
        description={getFilterDescription('fsm')}
        options={filterOptions.fsm}
        onClear={() => handleClearFilter('fsm')}
        onSelect={(option, isAdvanced) => handleFilterChange('fsm', option, isAdvanced)}
      />
      <FilterItem
        title="Education, health and care plan (EHCP)"
        description={getFilterDescription('ehcp')}
        options={filterOptions.ehcp}
        onClear={() => handleClearFilter('ehcp')}
        onSelect={(option, isAdvanced) => handleFilterChange('ehcp', option, isAdvanced)}
      />
      <FilterItem
        title="Looked after child (LAC)"
        description={getFilterDescription('lac')}
        options={filterOptions.lac}
        onClear={() => handleClearFilter('lac')}
        onSelect={(option, isAdvanced) => handleFilterChange('lac', option, isAdvanced)}
      />
      <FilterItem
        title="Previously looked after child (PLAC)"
        description={getFilterDescription('plac')}
        options={filterOptions.plac}
        onClear={() => handleClearFilter('plac')}
        onSelect={(option, isAdvanced) => handleFilterChange('plac', option, isAdvanced)}
      />
      <FilterItem
        title="Child in need (CIN)"
        description={getFilterDescription('cin')}
        options={filterOptions.cin}
        onClear={() => handleClearFilter('cin')}
        onSelect={(option, isAdvanced) => handleFilterChange('cin', option, isAdvanced)}
      />
      <FilterItem
        title="Child protection plan (CPP)"
        description={getFilterDescription('cpp')}
        options={filterOptions.cpp}
        onClear={() => handleClearFilter('cpp')}
        onSelect={(option, isAdvanced) => handleFilterChange('cpp', option, isAdvanced)}
      />
      <FilterItem
        title="Leavers"
        description={getFilterDescription('leavers')}
        options={filterOptions.leavers}
        onClear={() => handleClearFilter('leavers')}
        onSelect={(option, isAdvanced) => handleFilterChange('leavers', option, isAdvanced)}
      />
      <FilterItem
        title="Leaving date"
        description={getFilterDescription('leavingDate')}
        options={filterOptions.leavingDate}
        onClear={() => handleClearFilter('leavingDate')}
        onSelect={(option, isAdvanced) => handleFilterChange('leavingDate', option, isAdvanced)}
      />
    </FiltersContainer>
  );
};

export default Filters;
