import React from 'react';
import PreviousAcademicYear from './PreviousAcademicYear';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';

const PreviousAcademicYearPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <PreviousAcademicYear />
    </PageLayout>
  );
};

export default PreviousAcademicYearPage;
