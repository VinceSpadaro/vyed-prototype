import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import AbsenceBandings from './AbsenceBandings';

const AbsenceBandingsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      updatesBox={
        <>
          <ul>
            <li><a href="/help/how-to-use">how to use the tool</a></li>
            <li><a href="/help/technical-issues">current technical issues</a></li>
          </ul>
        </>
      }
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
