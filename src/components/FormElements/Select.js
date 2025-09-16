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
  font-weight: normal;
  margin-bottom: 10px;
  font-size: 16px;
`;

/**
 * Custom styled select dropdown
 * - Shows hand cursor on hover
 * - Yellow outline when focused (matching Dropdown component)
 */
const StyledSelect = styled.select`
  /* Base styling */
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  line-height: 1.25;
  background-color: #ffffff;
  cursor: pointer;
  color: #1d70b8;
  
  /* Border styling */
  border: 1px solid #b1b4b6;
  
  /* Interactive states */
  &:hover {
    cursor: pointer;
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
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
