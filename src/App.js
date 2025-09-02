import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

// Components
import Header from './components/Header/Header';
import Breadcrumb from './components/Navigation/Breadcrumb';
import AttendanceData from './components/Dashboard/AttendanceData';
import SchoolPage from './components/School/SchoolPage';
import PupilPage from './components/Pupil/PupilPage';
import Footer from './components/Footer/Footer';
import DataVisualisationsPage from './components/DataVisualisations/DataVisualisationsPage';
import PreviousAcademicYearPage from './components/PreviousAcademicYear/PreviousAcademicYearPage';
import YearToDateComparisonPage from './components/YearToDateComparison/YearToDateComparisonPage';
import AbsenceBandingsPage from './components/AbsenceBandings/AbsenceBandingsPage';
import AbsenceBandingDetail from './components/AbsenceBandings/AbsenceBandingDetail';
import UnauthorisedAbsencePage from './components/UnauthorisedAbsence/UnauthorisedAbsencePage';
import CheckLeaverDataPage from './components/CheckLeaverData/CheckLeaverDataPage';
import GuidancePage from './components/Guidance/GuidancePage';
import FeedbackPage from './components/Feedback/FeedbackPage';
import IndexPage from './components/Home/IndexPage';
import ReportsPage from './components/Reports/ReportsPage';
import ComparePage from './components/Compare/ComparePage';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/insights" element={<AttendanceData />} />
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/pupil/*" element={<PupilPage />} />
            <Route path="/data-visualisations" element={<DataVisualisationsPage />} />
            <Route path="/previous-academic-year" element={<PreviousAcademicYearPage />} />
            <Route path="/year-to-date-comparison" element={<YearToDateComparisonPage />} />
            <Route path="/absence-bandings" element={<AbsenceBandingsPage />} />
            <Route path="/absence-bandings/:bandId" element={<AbsenceBandingDetail />} />
            <Route path="/unauthorised-absence" element={<UnauthorisedAbsencePage />} />
            <Route path="/check-leaver-data" element={<CheckLeaverDataPage />} />
            <Route path="/guidance" element={<GuidancePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
