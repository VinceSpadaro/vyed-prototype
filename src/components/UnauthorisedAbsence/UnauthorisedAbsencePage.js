import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import UnauthorisedAbsence from './UnauthorisedAbsence';
import SupportSection from '../Support/SupportSection';

const UnauthorisedAbsencePage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <UnauthorisedAbsence />
    </PageLayout>
  );
};

export default UnauthorisedAbsencePage;
