import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEraser, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  cursor: pointer;
  width: 100%;
`;

const FilterTitle = styled.h3`
  font-size: 0.8rem;
  margin: 0;
  font-weight: 400;
  color: #333;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ExpandIcon = styled.span`
  margin-left: 15px;
  color: #666;
`;

const EraserIcon = styled.span`
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
`;

// Removed unused FilterDescription component


const FilterContent = styled.div`
  padding-top: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterTypeLabel = styled.div`
  font-size: 1.2 rem;
  margin: 15px 0 10px 0;
  color: #333;
`;

const FilterTypeSelect = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0 0 4px 4px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownOption = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AdvancedFilterLabel = styled.div`
  font-size: 1rem;
  margin: 20px 0 10px 0;
  color: #333;
`;

const ConditionSelect = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
`;

const ValueInput = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 15px;
  width: 100%;
  font-size: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.checked ? '#333' : 'transparent'};
  }
`;

const RadioLabel = styled.label`
  font-size: 1.1rem;
  cursor: pointer;
`;

const ApplyFilterButton = styled.button`
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 1rem;
  padding: 10px 15px;
  cursor: pointer;
  margin-left: auto;
  display: block;
  
  &:hover {
    color: #333;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  color: #666;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 8px 8px 35px;
  border: none;
  font-size: 0.9rem;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const OptionsList = styled.div`
  margin-top: 10px;
`;

const OptionItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const OptionCheckbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  &:checked + label {
    font-weight: 600;
  }
`;

const OptionLabel = styled.label`
  font-size: 1rem;
  cursor: pointer;
`;

const conditionOptions = [
  'contains',
  'does not contain',
  'starts with',
  'does not start with',
  'is',
  'is not',
  'is blank',
  'is not blank',
  'is empty',
  'is not empty',
  'is (All)'
];

const FilterItem = ({ title, description, onClear, options = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterTypeOpen, setIsFilterTypeOpen] = useState(false);
  const [filterType, setFilterType] = useState(title === 'Leaving date' ? 'Advanced filtering' : 'Basic filtering');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isSecondConditionOpen, setIsSecondConditionOpen] = useState(false);
  const [condition, setCondition] = useState('contains');
  const [secondCondition, setSecondCondition] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [logicalOperator, setLogicalOperator] = useState('And');
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleFilterTypeDropdown = (e) => {
    e.stopPropagation();
    setIsFilterTypeOpen(!isFilterTypeOpen);
  };
  
  const selectFilterType = (type) => {
    setFilterType(type);
    setIsFilterTypeOpen(false);
  };
  
  const toggleConditionDropdown = (e) => {
    e.stopPropagation();
    setIsConditionOpen(!isConditionOpen);
  };
  
  const selectCondition = (selected) => {
    setCondition(selected);
    setIsConditionOpen(false);
  };
  
  const toggleSecondConditionDropdown = (e) => {
    e.stopPropagation();
    setIsSecondConditionOpen(!isSecondConditionOpen);
  };
  
  const selectSecondCondition = (selected) => {
    setSecondCondition(selected);
    setIsSecondConditionOpen(false);
  };
  
  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };
  
  const handleLogicalOperatorChange = (operator) => {
    setLogicalOperator(operator);
  };
  
  const applyAdvancedFilter = () => {
    // Only apply if we have a condition and value (unless condition is 'is blank' or 'is not blank')
    const isBlankCondition = condition === 'is blank' || condition === 'is not blank' || 
                           condition === 'is empty' || condition === 'is not empty';
    
    if ((isBlankCondition || filterValue) && onSelect) {
      // Format the advanced filter description
      const filterDesc = formatAdvancedFilterDescription();
      onSelect(filterDesc, true);
    }
  };
  
  const formatAdvancedFilterDescription = () => {
    // For blank/empty conditions, we don't need a value
    const isBlankCondition = condition === 'is blank' || condition === 'is not blank' || 
                           condition === 'is empty' || condition === 'is not empty';
    
    let description = condition;
    
    // Add the filter value if needed
    if (!isBlankCondition && filterValue) {
      description += ` "${filterValue}"`;
    }
    
    // Add logical operator and second condition if provided
    if (secondCondition) {
      description += ` ${logicalOperator.toLowerCase()} ${secondCondition}`;
    }
    
    return description;
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize selectedOptions based on description
  useEffect(() => {
    // Parse description to determine selected options
    if (description.includes('is (All)')) {
      setSelectedOptions([]);
    } else if (description.startsWith('is ')) {
      // Handle comma-separated options
      const optionText = description.substring(3);
      if (optionText.includes(',')) {
        const optionList = optionText.split(',').map(opt => opt.trim());
        setSelectedOptions(optionList.filter(opt => options.includes(opt)));
      } else if (options.includes(optionText)) {
        setSelectedOptions([optionText]);
      }
    } else if (description.includes('selected')) {
      // For multiple selections, try to parse from description
      // This is just for the prototype and doesn't need to be perfect
      const allOptionsExceptSelectAll = options.filter(opt => opt !== 'Select all');
      setSelectedOptions(allOptionsExceptSelectAll);
    }
  }, [description, options]);
  
  // Check if filter is active (not set to 'All')
  const isFilterActive = !description.includes('(All)');
  
  return (
    <FilterItemContainer isActive={isFilterActive}>
      <FilterHeader onClick={toggleAccordion}>
        <div style={{ flex: 1 }}>
          <FilterTitle>
            {title}
          </FilterTitle>
          <div style={{ fontWeight: 'normal', fontSize: '0.9rem', marginTop: '4px', color: '#666' }}>
            {description}
          </div>
        </div>
        <IconsContainer>
          <ExpandIcon>
            {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </ExpandIcon>
        </IconsContainer>
        <IconsContainer style={{ marginLeft: '10px' }}>
          <EraserIcon onClick={(e) => { e.stopPropagation(); onClear && onClear(); }}>
            <FaEraser size={18} />
          </EraserIcon>
        </IconsContainer>
      </FilterHeader>
      
      <FilterContent isOpen={isOpen}>
        <FilterTypeLabel>Filter type</FilterTypeLabel>
        <FilterTypeSelect onClick={toggleFilterTypeDropdown}>
          {filterType}
          <FaChevronDown size={14} />
          <FilterDropdown isOpen={isFilterTypeOpen}>
            <DropdownOption onClick={() => selectFilterType('Advanced filtering')}>Advanced filtering</DropdownOption>
            <DropdownOption onClick={() => selectFilterType('Basic filtering')}>Basic filtering</DropdownOption>
          </FilterDropdown>
        </FilterTypeSelect>
        
        {title === 'Leaving date' && filterType === 'Advanced filtering' ? (
          <>
            <div style={{ marginTop: '15px' }}>
              <div>Show items when the value</div>
              <div style={{ marginTop: '10px' }}>
                <select 
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                >
                  <option>is</option>
                  <option>is not</option>
                  <option>is after</option>
                  <option>is before</option>
                  <option>is empty</option>
                  <option>is not empty</option>
                </select>
                
                <input 
                  type="text" 
                  placeholder="dd/MM/yyyy" 
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />
                
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="12" 
                    style={{ 
                      width: '60px', 
                      padding: '8px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '4px',
                      marginRight: '10px'
                    }}
                  />
                  <input 
                    type="text" 
                    placeholder="00" 
                    style={{ 
                      width: '60px', 
                      padding: '8px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '4px',
                      marginRight: '10px'
                    }}
                  />
                  <select
                    style={{ 
                      flex: 1, 
                      padding: '8px', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '4px'
                    }}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ marginRight: '10px' }}>
                    <input type="radio" name="logicalOperator" checked /> And
                  </label>
                  <label>
                    <input type="radio" name="logicalOperator" /> Or
                  </label>
                </div>
                
                <select
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    marginBottom: '15px'
                  }}
                >
                  <option></option>
                </select>
                
                <div style={{ textAlign: 'right' }}>
                  <button 
                    style={{ 
                      padding: '6px 12px', 
                      backgroundColor: '#f5f5f5', 
                      border: '1px solid #d9d9d9', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Apply filter
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : filterType === 'Basic filtering' ? (
          <>
            <SearchContainer>
              <SearchIcon>
                <FaSearch size={14} />
              </SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
            </SearchContainer>
            
            <OptionsList>
              {filteredOptions.map((option, index) => (
                <OptionItem key={index}>
                  <OptionCheckbox 
                    type="checkbox" 
                    id={`${title.replace(/\s+/g, '-').toLowerCase()}-${option.replace(/\s+/g, '-').toLowerCase()}`} 
                    checked={selectedOptions.includes(option) || (option === 'Select all' && selectedOptions.length === options.length - 1)}
                    onChange={() => {
                      if (option === 'Select all') {
                        // If all options are already selected, clear the selection
                        if (selectedOptions.length === options.length - 1) {
                          setSelectedOptions([]);
                          onSelect && onSelect([], false);
                        } else {
                          // Otherwise select all options except 'Select all'
                          const allOptionsExceptSelectAll = options.filter(opt => opt !== 'Select all');
                          setSelectedOptions(allOptionsExceptSelectAll);
                          onSelect && onSelect(allOptionsExceptSelectAll, false);
                        }
                      } else {
                        // Toggle individual option
                        // Create a Set to ensure uniqueness
                        const uniqueOptions = new Set(selectedOptions);
                        
                        if (uniqueOptions.has(option)) {
                          // Remove if already selected
                          uniqueOptions.delete(option);
                        } else {
                          // Add if not selected
                          uniqueOptions.add(option);
                        }
                        
                        const newSelectedOptions = Array.from(uniqueOptions);
                        setSelectedOptions(newSelectedOptions);
                        onSelect && onSelect(newSelectedOptions, false);
                      }
                    }}
                  />
                  <OptionLabel 
                    htmlFor={`${title.replace(/\s+/g, '-').toLowerCase()}-${option.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {option}
                  </OptionLabel>
                </OptionItem>
              ))}
            </OptionsList>
          </>
        ) : (
          <>
            <AdvancedFilterLabel>Show items when the value</AdvancedFilterLabel>
            
            <ConditionSelect onClick={toggleConditionDropdown}>
              {condition}
              <FaChevronDown size={14} />
              <FilterDropdown isOpen={isConditionOpen}>
                {conditionOptions.map((option, index) => (
                  <DropdownOption key={index} onClick={() => selectCondition(option)}>
                    {option}
                  </DropdownOption>
                ))}
              </FilterDropdown>
            </ConditionSelect>
            
            <ValueInput 
              type="text" 
              value={filterValue}
              onChange={handleFilterValueChange}
              onClick={(e) => e.stopPropagation()}
            />
            
            <RadioGroup>
              <RadioOption onClick={() => handleLogicalOperatorChange('And')}>
                <RadioButton checked={logicalOperator === 'And'} />
                <RadioLabel>And</RadioLabel>
              </RadioOption>
              <RadioOption onClick={() => handleLogicalOperatorChange('Or')}>
                <RadioButton checked={logicalOperator === 'Or'} />
                <RadioLabel>Or</RadioLabel>
              </RadioOption>
            </RadioGroup>
            
            <ConditionSelect onClick={toggleSecondConditionDropdown}>
              {secondCondition || 'Select condition'}
              <FaChevronDown size={14} />
              <FilterDropdown isOpen={isSecondConditionOpen}>
                {conditionOptions.map((option, index) => (
                  <DropdownOption key={index} onClick={() => selectSecondCondition(option)}>
                    {option}
                  </DropdownOption>
                ))}
              </FilterDropdown>
            </ConditionSelect>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ApplyFilterButton onClick={applyAdvancedFilter}>Apply filter</ApplyFilterButton>
            </div>
          </>
        )}
      </FilterContent>
    </FilterItemContainer>
  );
};

export default FilterItem;
