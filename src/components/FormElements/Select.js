import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// ============================================================================
// Styled Components
// ============================================================================

/**
 * Container for the select component with proper spacing
 */
const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

/**
 * Label styling for accessibility and visual hierarchy
 */
const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 16px;
`;

/**
 * Custom styled select dropdown
 * - Has black borders on all sides
 * - Shows hand cursor on hover
 * - Yellow highlight on left/right borders when focused
 */
const StyledSelect = styled.select`
  /* Base styling */
  width: 100%;
  padding: 10px;
  padding-right: 20px; /* Extra padding for the chevron */
  font-size: 16px;
  line-height: 1.25;
  background-color: #ffffff;
  cursor: pointer;
  
  /* Border styling */
  border: solid 2px #0b0c0c;
  
  /* Interactive states */
  &:hover {
    cursor: pointer;
  }
  
  &:focus {
    outline: none;
    border-top: 2px solid #0b0c0c;
    border-bottom: 2px solid #0b0c0c;
    border-left: 3px solid #ffdd00;
    border-right: 3px solid #ffdd00;
    box-shadow: 0 0 0 3px #ffdd00;
  }
`;

// ============================================================================
// Component Definition
// ============================================================================

/**
 * Select - A form select component with label and dropdown
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - The ID for the select element
 * @param {string} props.label - The label text
 * @param {Array} props.options - Array of options with value and label properties
 * @param {string} props.value - The currently selected value
 * @param {function} props.onChange - Function to call when selection changes
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {string} props.placeholder - Placeholder text when no option is selected
 * @returns {React.Component} - Select component
 */
const Select = ({ 
  id, 
  label, 
  options, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  placeholder = ''
}) => {
  return (
    <SelectContainer>
      {/* Label with optional required indicator */}
      <Label htmlFor={id}>
        {label}{required && ' *'}
      </Label>
      
      {/* Select dropdown with options */}
      <StyledSelect 
        id={id} 
        value={value || ''} 
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

// ============================================================================
// PropTypes
// ============================================================================

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
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
};

export default Select;
