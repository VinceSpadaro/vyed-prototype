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
  background-color: white;
  border: 1px solid #b1b4b6;
  border-top: none;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Function to call when selection changes
 * @param {boolean} props.showLabel - Whether to show the label next to the dropdown
 */
const Dropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  showLabel = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  
  const selectedOption = options.find(option => option.value === value) || options[0];
  
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
          {selectedOption.label}
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
                  checked={value === option.value} 
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool
};

export default Dropdown;
