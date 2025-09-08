import React from 'react';
import SchoolInfo from './SchoolInfo';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';
import PageLayout from './PageLayout';


const AttendanceData = () => {
  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      showTabs={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <SchoolInfo />
    </PageLayout>
  );
};

export default AttendanceData;
