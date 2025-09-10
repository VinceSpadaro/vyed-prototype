import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import DataVisualisations from './DataVisualisations';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';

const DataVisualisationsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <DataVisualisations />
    </PageLayout>
  );
};

export default DataVisualisationsPage;
