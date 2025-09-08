import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import AbsenceBandings from './AbsenceBandings';

const AbsenceBandingsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={
        <>
          <p>If you need help with anything, you can <a href="/submit-enquiry">submit an enquiry</a>.</p>
        </>
      }
    >
      <AbsenceBandings />
    </PageLayout>
  );
};

export default AbsenceBandingsPage;
