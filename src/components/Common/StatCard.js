import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Define color variables
const colors = {
  blue: '#1d70b8',
  green: '#00703c',
  red: '#d4351c',
  yellow: '#ffdd00',
  purple: '#4c2c92',
  turquoise: '#28a197'
};

const CardContainer = styled.div`
  background-color: ${props => props.color || colors.blue};
  color: ${props => props.color === colors.yellow ? '#0b0c0c' : '#ffffff'};
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Value = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 1rem;
`;

/**
 * StatCard - A reusable component for displaying statistics in colored cards
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - The statistic value to display
 * @param {string} props.label - The description of the statistic
 * @param {string} props.colorName - Color name (blue, green, red, yellow, purple, turquoise)
 * @param {string} props.customColor - Optional custom color (hex, rgb, etc.)
 * @returns {React.Component} - Stat card component
 */
const StatCard = ({ value, label, colorName = 'blue', customColor }) => {
  // Determine the color to use
  const cardColor = customColor || (colorName && colors[colorName]) || colors.blue;
  
  return (
    <CardContainer color={cardColor}>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </CardContainer>
  );
};

StatCard.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  label: PropTypes.string.isRequired,
  colorName: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple', 'turquoise']),
  customColor: PropTypes.string
};

export default StatCard;
