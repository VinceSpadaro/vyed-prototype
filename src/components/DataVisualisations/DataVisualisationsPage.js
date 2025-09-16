import React from 'react';
import DataVisualisationsPageLayout from './DataVisualisationsPageLayout';
import DataVisualisations from './DataVisualisations';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';

const DataVisualisationsPage = () => {
  return (
    <DataVisualisationsPageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <DataVisualisations />
    </DataVisualisationsPageLayout>
  );
};

export default DataVisualisationsPage;
