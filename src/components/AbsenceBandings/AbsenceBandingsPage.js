import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import AbsenceBandings from './AbsenceBandings';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const AbsenceBandingsPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Absence bandings" />
      }
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
