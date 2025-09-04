import React from 'react';
import PreviousAcademicYear from './PreviousAcademicYear';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import UpdatesSection from '../Common/UpdatesSection';

const PreviousAcademicYearPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      updatesBox={<UpdatesSection />}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={
        <>
          <p>If you need help with anything, you can submit an enquiry</p>
        </>
      }
    >
      <PreviousAcademicYear />
    </PageLayout>
  );
};

export default PreviousAcademicYearPage;
