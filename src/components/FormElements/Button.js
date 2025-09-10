import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  background: transparent;
  border: none;
  border-bottom: 2px solid #1d70b8;
  color: #1d70b8;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  padding: 8px 16px;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  
  ${props => props.variant === 'primary' && `
    background-color: #00703c;
    color: white;
    border-bottom: 2px solid #005a30;
    
    &:hover {
      background-color: #005a30;
      border-bottom-color: #003d20;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: #f3f2f1;
    color: #0b0c0c;
    border-bottom: 2px solid #b1b4b6;
    
    &:hover {
      background-color: #dbdad9;
      border-bottom-color: #8f9295;
    }
  `}
  
  ${props => props.variant === 'link' && `
    background-color: transparent;
    color: #1d70b8;
    border-bottom: 2px solid transparent;
    
    &:hover {
      color: #003078;
      border-bottom-color: #003078;
    }
  `}
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = ({
  children,
  variant = 'link',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'link']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
