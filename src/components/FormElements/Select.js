import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 2px solid #0b0c0c;
  font-size: 16px;
  line-height: 1.25;
  background-color: #ffffff;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

/**
 * Select - A form select component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - The ID for the select element
 * @param {string} props.label - The label text
 * @param {Array} props.options - Array of options with value and label properties
 * @param {string} props.value - The currently selected value
 * @param {function} props.onChange - Function to call when selection changes
 * @param {boolean} props.required - Whether the field is required
 * @returns {React.Component} - Select component
 */
const Select = ({ 
  id, 
  label, 
  options, 
  value, 
  onChange, 
  required = false 
}) => {
  return (
    <SelectContainer>
      <Label htmlFor={id}>{label}{required && ' *'}</Label>
      <StyledSelect 
        id={id} 
        value={value} 
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export default Select;
