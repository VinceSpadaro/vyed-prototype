import React from 'react';
import styled from 'styled-components';
import AbsenceBandingsTable from './AbsenceBandingsTable';

const Container = styled.div`
  padding: 0;
  margin-bottom: 30px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const GuidanceLink = styled.a`
  color: #1d70b8;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AbsenceBandings = () => {
  return (
    <Container>
      <Title>Absence bandings</Title>
      <Description>
        Identify pupils with and approaching persistent and severe absence. Select an absence band to get a list of pupils, their overall attendance rate and year group.
      </Description>
      
      <GuidanceLink href="#">How to use your absence data to target your resources and interventions.</GuidanceLink>
      
      <AbsenceBandingsTable />
    </Container>
  );
};

export default AbsenceBandings;
