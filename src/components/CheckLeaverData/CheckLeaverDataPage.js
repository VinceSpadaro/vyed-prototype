import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import CheckLeaverData from './CheckLeaverData';
import UpdatesSection from '../Common/UpdatesSection';

const CheckLeaverDataPage = () => {
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
      <CheckLeaverData />
    </PageLayout>
  );
};

export default CheckLeaverDataPage;
