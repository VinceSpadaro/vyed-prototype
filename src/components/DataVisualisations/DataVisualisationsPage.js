import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import DataVisualisations from './DataVisualisations';
import Filters from '../Filters/Filters';
import UpdatesSection from '../Common/UpdatesSection';

const DataVisualisationsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      updatesBox={<UpdatesSection />}
      contentSideNav={true}
      contentSidebar={<Filters />}
    >
      <DataVisualisations />
    </PageLayout>
  );
};

export default DataVisualisationsPage;
