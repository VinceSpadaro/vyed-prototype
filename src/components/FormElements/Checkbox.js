import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckboxContainer = styled.div`
  margin-bottom: 15px;
  padding: 5px 0;
  padding-left: 5px;
`;

const StyledCheckboxInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 2px solid #0b0c0c;
  position: relative;
  background-color: white;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #ffdd00;
    z-index: 1;
  }
  
  &:checked {
    background-color: white;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230b0c0c' stroke='none' d='M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z'/%3E%3C/svg%3E");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }
  }
`;

const StyledLabel = styled.label`
  font-size: 19px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  position: relative;
  
  &:focus-within {
    outline: none;
  }
`;


const Checkbox = ({ 
  id, 
  name, 
  checked, 
  onChange, 
  label,
  ...props 
}) => {
  return (
    <CheckboxContainer>
      <StyledLabel htmlFor={id}>
        <StyledCheckboxInput
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        {label}
      </StyledLabel>
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired
};

export default Checkbox;
