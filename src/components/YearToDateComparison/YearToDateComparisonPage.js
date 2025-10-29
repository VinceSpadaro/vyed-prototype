import React from 'react';
import PageLayout from '../Dashboard/PageLayout';
import Filters from '../Filters/Filters';
import YearToDateComparison from './YearToDateComparison';
import SupportSection from '../Support/SupportSection';
import ToolsBreadcrumbs from '../Navigation/ToolsBreadcrumbs';

const YearToDateComparisonPage = () => {
  return (
    <PageLayout
      title="View school attendance data"
      breadcrumbs={
        <ToolsBreadcrumbs items={[{ label: 'Monitor your school attendance', to: '/tools' }, { label: 'View school attendance data', to: '/insights' }]} currentPage="Year to date comparison" />
      }
      showUpdates={true}
      contentSideNav={true}
      contentSidebar={<Filters />}
      supportSection={<SupportSection />}
    >
      <YearToDateComparison />
    </PageLayout>
  );
};

export default YearToDateComparisonPage;
