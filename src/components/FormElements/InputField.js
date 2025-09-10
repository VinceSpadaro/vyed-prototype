import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.div`
  margin-bottom: ${props => props.noMargin ? '0' : '20px'};
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 8px 10px;
  font-size: 16px;
  border: 2px solid #0b0c0c;
  border-radius: 0;
  height: 40px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #ffdd00;
    border-color: #0b0c0c;
  }
`;

const ErrorText = styled.div`
  color: #d4351c;
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
`;

const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  noMargin = false,
  ...props
}) => {
  return (
    <InputContainer noMargin={noMargin}>
      {label && (
        <StyledLabel htmlFor={id}>
          {label}
          {required && <span style={{ color: '#d4351c' }}> *</span>}
        </StyledLabel>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...props}
      />
    </InputContainer>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool
};

export default InputField;
