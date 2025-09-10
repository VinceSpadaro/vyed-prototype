import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import CheckLeaverData from './CheckLeaverData';
import SupportSection from '../Support/SupportSection';

const CheckLeaverDataPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
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
