import React from 'react';
import PreviousAcademicYear from './PreviousAcademicYear';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const PreviousAcademicYearPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Previous academic year" />
      }
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
