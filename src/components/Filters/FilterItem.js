import React, { useState } from 'react';
import styled from 'styled-components';

const FilterItemContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f3f2f1;
  
  &:hover {
    background-color: #f8f8f8;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  width: 100%;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const ExpandIcon = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 8px;
`;

const FilterDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
`;


const FilterContent = styled.div`
  padding: 10px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterItem = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <FilterItemContainer>
      <FilterHeader onClick={toggleAccordion}>
        <FilterTitle>
          {title}
        </FilterTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ExpandIcon>{isOpen ? '▲' : '▼'}</ExpandIcon>
        </div>
      </FilterHeader>
      <FilterContent isOpen={isOpen}>
        <FilterDescription>{description}</FilterDescription>
        {/* Filter options would go here */}
        <div style={{ marginTop: '10px' }}>
          <input type="checkbox" id={`${title}-option1`} />
          <label htmlFor={`${title}-option1`} style={{ marginLeft: '5px', fontSize: '0.9rem' }}>Option 1</label>
        </div>
        <div style={{ marginTop: '5px' }}>
          <input type="checkbox" id={`${title}-option2`} />
          <label htmlFor={`${title}-option2`} style={{ marginLeft: '5px', fontSize: '0.9rem' }}>Option 2</label>
        </div>
      </FilterContent>
    </FilterItemContainer>
  );
};

export default FilterItem;
