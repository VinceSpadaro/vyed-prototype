import React from 'react';
import styled from 'styled-components';
import CrossBorderData from './CrossBorderData';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const CrossBorderDataPage = () => {
  return (
    <PageContainer>
      <CrossBorderData />
    </PageContainer>
  );
};

export default CrossBorderDataPage;
