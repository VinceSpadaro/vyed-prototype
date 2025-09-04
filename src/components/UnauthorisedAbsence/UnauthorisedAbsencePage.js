import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import UnauthorisedAbsence from './UnauthorisedAbsence';
import UpdatesSection from '../Common/UpdatesSection';

const UnauthorisedAbsencePage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      updatesBox={<UpdatesSection />}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={
        <>
          <p>If you need help with anything, you can <a href="/submit-enquiry">submit an enquiry</a>.</p>
        </>
      }
    >
      <UnauthorisedAbsence />
    </PageLayout>
  );
};

export default UnauthorisedAbsencePage;
