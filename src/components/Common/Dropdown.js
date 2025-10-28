import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 200px;
  margin-bottom: 20px;
`;

const SelectBox = styled.div`
  border: 1px solid #b1b4b6;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  color: #1d70b8;
  
  &:hover {
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const SelectArrow = styled.span`
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  margin-left: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #b1b4b6;
  border-top: none;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f3f2f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #b1b4b6;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #6f777b;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f3f2f1;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
  
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  margin-left: 8px;
  cursor: pointer;
`;

const LabelContainer = styled.div`
  margin-bottom: 10px;
  font-weight: normal;
`;

/**
 * A reusable dropdown component
 * @param {Object} props
 * @param {string} props.label - Label for the dropdown
 * @param {Array} props.options - Array of options [{value: string, label: string}]
 * @param {string|Array} props.value - Currently selected value (string) or values (array for multi-select)
 * @param {Function} props.onChange - Function to call when selection changes
 * @param {boolean} props.showLabel - Whether to show the label next to the dropdown
 * @param {boolean} props.multiSelect - Enable multi-select mode
 */
const Dropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  showLabel = true,
  multiSelect = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (optionValue) => {
    if (multiSelect) {
      // Multi-select logic
      const currentValues = Array.isArray(value) ? value : [value];
      
      if (optionValue === 'all') {
        // Toggle all: if all are selected, deselect all; otherwise select all
        const allValues = options.filter(opt => opt.value !== 'all').map(opt => opt.value);
        const allSelected = allValues.every(val => currentValues.includes(val));
        onChange(allSelected ? [] : allValues);
      } else {
        // Toggle individual option
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter(v => v !== optionValue)
          : [...currentValues, optionValue];
        onChange(newValues);
      }
    } else {
      // Single select logic
      onChange(optionValue);
      setIsOpen(false);
    }
  };
  
  // Get display text for multi-select
  const getDisplayText = () => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [value];
      const allValues = options.filter(opt => opt.value !== 'all').map(opt => opt.value);
      
      if (currentValues.length === 0) {
        return 'None selected';
      } else if (currentValues.length === allValues.length) {
        return 'All';
      } else {
        return 'Multiple selections';
      }
    } else {
      const selectedOption = options.find(option => option.value === value) || options[0];
      return selectedOption.label;
    }
  };
  
  // Check if option is selected
  const isOptionSelected = (optionValue) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [value];
      if (optionValue === 'all') {
        const allValues = options.filter(opt => opt.value !== 'all').map(opt => opt.value);
        return allValues.every(val => currentValues.includes(val));
      }
      return currentValues.includes(optionValue);
    }
    return value === optionValue;
  };
  
  return (
    <div style={{ marginBottom: '20px' }}>
      {showLabel && <LabelContainer>{label}</LabelContainer>}
      
      <DropdownContainer>
        <SelectBox 
          onClick={handleToggle} 
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {getDisplayText()}
          <SelectArrow />
        </SelectBox>
        
        {isOpen && (
          <DropdownMenu>
            {options.map((option) => (
              <DropdownItem 
                key={option.value} 
                onClick={() => handleSelect(option.value)}
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option.value);
                  }
                }}
              >
                <Checkbox 
                  type="checkbox" 
                  id={`option-${option.value}`} 
                  checked={isOptionSelected(option.value)} 
                  readOnly 
                />
                <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
  multiSelect: PropTypes.bool
};

export default Dropdown;
