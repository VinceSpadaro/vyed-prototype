import React from 'react';
import DataVisualisationsPageLayout from './DataVisualisationsPageLayout';
import DataVisualisations from './DataVisualisations';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const DataVisualisationsPage = () => {
  return (
    <DataVisualisationsPageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Data visualisations" />
      }
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
