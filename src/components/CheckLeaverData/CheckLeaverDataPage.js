import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import CheckLeaverData from './CheckLeaverData';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const CheckLeaverDataPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Check leaver data" />
      }
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <CheckLeaverData />
    </PageLayout>
  );
};

export default CheckLeaverDataPage;
