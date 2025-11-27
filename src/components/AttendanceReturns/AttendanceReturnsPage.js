import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import AttendanceReturns from './AttendanceReturns';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const AttendanceReturnsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Attendance returns" />
      }
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <AttendanceReturns />
    </PageLayout>
  );
};

export default AttendanceReturnsPage;
