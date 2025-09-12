import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CgChevronDownO } from "react-icons/cg";
import { CgChevronUpO } from "react-icons/cg";

// Styled components for the Accordion
const AccordionContainer = styled.div`
  margin-bottom: 20px;
`;

const AccordionSection = styled.div`
  border-top: 1px solid #b1b4b6;
  border-bottom: ${props => props.isLast ? '1px solid #b1b4b6' : 'none'};
`;

const AccordionHeader = styled.div`
  position: relative;
  padding: 15px 0;
`;

const AccordionButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  font-size: 19px;
  font-weight: bold;
  padding: 0;
  text-align: left;
  width: 100%;
  color: #0b0c0c;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const IconWrapper = styled.span`
  display: block;
  margin-bottom: 8px;
  margin-top:10px;
  color: #1d70b8;
  font-size: 24px;
`;

const AccordionContent = styled.div`
  padding: 15px;
  display: ${props => props.expanded ? 'block' : 'none'};
`;

const ShowAllButton = styled.button`
  background: transparent;
  border: none;
  color: #1d70b8;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  text-align: left;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const ShowAllIconWrapper = styled.span`
  display: inline-flex;
  margin-right: 10px;
  color: #1d70b8;
  font-size: 24px;
  align-items: center;
  justify-content: center;
`;

// Main Accordion component
const Accordion = ({ sections, defaultExpanded = false }) => {
  // Initialize with all sections expanded if defaultExpanded is true
  const [expandedSections, setExpandedSections] = useState(() => {
    if (defaultExpanded) {
      const initialState = {};
      sections.forEach(section => {
        initialState[section.id] = true;
      });
      return initialState;
    }
    return {};
  });

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAll = () => {
    // Check if all sections are currently expanded
    const allExpanded = Object.keys(expandedSections).length === sections.length && 
      Object.values(expandedSections).every(value => value === true);
    
    // Create new state with all sections either expanded or collapsed
    const newState = {};
    sections.forEach(section => {
      newState[section.id] = !allExpanded;
    });
    
    setExpandedSections(newState);
  };

  // Check if all sections are expanded
  const allExpanded = Object.keys(expandedSections).length === sections.length && 
    Object.values(expandedSections).every(value => value === true);

  return (
    <AccordionContainer>
      <ShowAllButton onClick={toggleAll}>
        <ShowAllIconWrapper>
          {allExpanded ? <CgChevronUpO /> : <CgChevronDownO />}
        </ShowAllIconWrapper>
        <span>{allExpanded ? 'Hide all sections' : 'Show all sections'}</span>
      </ShowAllButton>
      
      {sections.map((section, index) => (
        <AccordionSection key={section.id} isLast={index === sections.length - 1}>
          <AccordionHeader>
            <AccordionButton onClick={() => toggleSection(section.id)}>
              <div>{section.title}</div>
              <IconWrapper>
                {expandedSections[section.id] ? <CgChevronUpO /> : <CgChevronDownO />}
              </IconWrapper>
            </AccordionButton>
          </AccordionHeader>
          <AccordionContent expanded={expandedSections[section.id]}>
            {section.content}
          </AccordionContent>
        </AccordionSection>
      ))}
    </AccordionContainer>
  );
};

Accordion.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired
    })
  ).isRequired
};

export default Accordion;
