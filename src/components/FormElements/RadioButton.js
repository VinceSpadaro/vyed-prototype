import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioContainer = styled.div`
  margin-bottom: 15px;
  padding: 5px 0;
`;

const StyledRadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  appearance: none;
  border: 2px solid #0b0c0c;
  position: relative;
  background-color: white;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #ffdd00;
    z-index: 1;
  }
  
  &:checked {
    background-color: white;
    border: 2px solid #0b0c0c;
    
    &:after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background: #0b0c0c;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const StyledLabel = styled.label`
  font-size: 19px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  color: #0b0c0c;
  position: relative;
  
  &:focus-within {
    outline: none;
  }
`;

const RadioButton = ({ 
  id, 
  name, 
  value, 
  checked, 
  onChange, 
  label,
  ...props 
}) => {
  return (
    <RadioContainer>
      <StyledLabel htmlFor={id}>
        <StyledRadioInput
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        {label}
      </StyledLabel>
    </RadioContainer>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired
};

export default RadioButton;
