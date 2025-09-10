import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import AbsenceBandings from './AbsenceBandings';
import SupportSection from '../Support/SupportSection';

const AbsenceBandingsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <AbsenceBandings />
    </PageLayout>
  );
};

export default AbsenceBandingsPage;
