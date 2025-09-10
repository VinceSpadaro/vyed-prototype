import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

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
  display: inline-flex;
  margin-right: 10px;
  color: #1d70b8;
  font-size: 18px;
  align-items: center;
  justify-content: center;
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
  
  // Prevent default behavior of details element
  const handleClick = (e) => {
    e.preventDefault();
    toggleExpanded();
  };
  
  return (
    <DetailsContainer>
      <details open={expanded}>
        <DetailsSummary onClick={handleClick}>
          <DetailsIcon>
            {expanded ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
          </DetailsIcon>
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
