import React from 'react';
import styled from 'styled-components';
import PageLayout from '../Dashboard/PageLayout';
import DataVisualisations from './DataVisualisations';
import Filters from '../Filters/Filters';

const DataVisualisationsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      updatesBox={
        <>
          <ul>
            <li><a href="#">how to use the tool</a></li>
            <li><a href="#">current technical issues</a></li>
          </ul>
        </>
      }
      contentSideNav={true}
      contentSidebar={<Filters />}
    >
      <DataVisualisations />
    </PageLayout>
  );
};

export default DataVisualisationsPage;
