import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import YearToDateComparison from './YearToDateComparison';
import SupportSection from '../Support/SupportSection';

const YearToDateComparisonPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <YearToDateComparison />
    </PageLayout>
  );
};

export default YearToDateComparisonPage;
