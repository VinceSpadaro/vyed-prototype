import React from 'react';
import styled from 'styled-components';
import FilterItem from './FilterItem';
import { media } from '../Dashboard/ResponsiveStyles';

const FiltersContainer = styled.div`
  border: 1px solid #b1b4b6;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
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
        description="is (All)" 
      />
      
      <FilterItem 
        title="Sex" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Ethnicity" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Year group" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Persistently absent" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Severely absent" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Special educational needs (SEN) support" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Free school meals (FSM)" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Education, health and care plan (EHCP)" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Looked after child (LAC)" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Previously looked after child (PLAC)" 
        description="is (All)" 
      />
      
      <FilterItem 
        title="Child in need (CIN)" 
        description="is (All)" 
      />
    </FiltersContainer>
  );
};

export default Filters;
