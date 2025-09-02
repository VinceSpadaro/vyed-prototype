import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import PupilsInBandTable from './PupilsInBandTable';

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

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #1d70b8;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Map of band IDs to their names
const bandNames = {
  1: 'Absence from 0% to less than 5%',
  2: 'Absence from 5% to less than 10%',
  3: 'Absence from 10% to less than 15%',
  4: 'Absence from 15% to less than 20%',
  5: 'Absence from 20% to less than 25%',
  6: 'Absence from 25% to less than 30%',
  7: 'Absence from 30% to less than 35%',
  8: 'Absence from 35% to less than 40%',
  9: 'Absence from 40% to less than 45%',
  10: 'Absence from 45% to less than 50%',
  11: 'Absence greater than or equal to 50%',
};

const AbsenceBandingDetail = () => {
  const { bandId } = useParams();
  const bandName = bandNames[bandId] || 'Unknown band';
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Container>
      <BackLink to="/absence-bandings">&lt; Back to absence bandings</BackLink>
      <Title>{bandName}</Title>
      <PupilsInBandTable bandId={bandId} bandName={bandName} />
    </Container>
  );
};

export default AbsenceBandingDetail;
