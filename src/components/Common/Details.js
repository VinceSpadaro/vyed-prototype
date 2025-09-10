import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled components for the Details component
const DetailsContainer = styled.div`
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const DetailsSummary = styled.summary`
  display: flex;
  align-items: center;
  color: #1d70b8;
  cursor: pointer;
  position: relative;
  padding: 10px 0;
  
  &:hover {
    color: #003078;
  }
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
  
  &::marker {
    display: none;
  }
  
  &::-webkit-details-marker {
    display: none;
  }
`;

const DetailsIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 10px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #1d70b8;
  transform: ${props => props.expanded ? 'rotate(0)' : 'rotate(-90deg)'};
  transition: transform 0.2s;
`;

const DetailsContent = styled.div`
  padding: 15px 0 0 25px;
  border-left: 4px solid #b1b4b6;
  margin-left: 3px;
`;

// Main Details component
const Details = ({ summary, children }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <DetailsContainer>
      <details open={expanded} onClick={toggleExpanded}>
        <DetailsSummary>
          <DetailsIcon expanded={expanded} />
          {summary}
        </DetailsSummary>
        <DetailsContent>
          {children}
        </DetailsContent>
      </details>
    </DetailsContainer>
  );
};

Details.propTypes = {
  summary: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default Details;
