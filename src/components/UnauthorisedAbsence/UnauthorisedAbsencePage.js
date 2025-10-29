import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import UnauthorisedAbsence from './UnauthorisedAbsence';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const UnauthorisedAbsencePage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Unauthorised absence" />
      }
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <UnauthorisedAbsence />
    </PageLayout>
  );
};

export default UnauthorisedAbsencePage;
