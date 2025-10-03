import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { UserTypeProvider, useUserType } from './context/UserTypeContext';
import { TrackingProvider } from './context/TrackingContext';
import ClarityPageTracker from './components/Analytics/ClarityPageTracker';

// Components
import PasswordGate from './components/Auth/PasswordGate';
import Header from './components/Header/Header';
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
import UserTypeSelectionPage from './components/UserTypeSelection/UserTypeSelectionPage';
import SignOutPage from './components/SignOut/SignOutPage';
import LocalAuthorityPage from './components/LocalAuthority/LocalAuthorityPage';
import TrustPage from './components/Trust/TrustPage';
import ToolsPage from './components/Tools/ToolsPage';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 0;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

// Protected route component that redirects to user type selection if no user type is selected
const ProtectedRoute = ({ children }) => {
  const { hasUserTypeSelected } = useUserType();
  
  if (!hasUserTypeSelected) {
    return <Navigate to="/select-user-type" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Router>
      <ClarityPageTracker />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<UserTypeSelectionPage />} />
            <Route path="/select-user-type" element={<UserTypeSelectionPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <IndexPage />
              </ProtectedRoute>
            } />
            <Route path="/insights" element={
              <ProtectedRoute>
                <AttendanceData />
              </ProtectedRoute>
            } />
            <Route path="/school" element={
              <ProtectedRoute>
                <SchoolPage />
              </ProtectedRoute>
            } />
            <Route path="/pupil/*" element={
              <ProtectedRoute>
                <PupilPage />
              </ProtectedRoute>
            } />
            <Route path="/data-visualisations" element={
              <ProtectedRoute>
                <DataVisualisationsPage />
              </ProtectedRoute>
            } />
            <Route path="/previous-academic-year" element={
              <ProtectedRoute>
                <PreviousAcademicYearPage />
              </ProtectedRoute>
            } />
            <Route path="/year-to-date-comparison" element={
              <ProtectedRoute>
                <YearToDateComparisonPage />
              </ProtectedRoute>
            } />
            <Route path="/absence-bandings" element={
              <ProtectedRoute>
                <AbsenceBandingsPage />
              </ProtectedRoute>
            } />
            <Route path="/absence-bandings/:bandId" element={
              <ProtectedRoute>
                <AbsenceBandingDetail />
              </ProtectedRoute>
            } />
            <Route path="/unauthorised-absence" element={
              <ProtectedRoute>
                <UnauthorisedAbsencePage />
              </ProtectedRoute>
            } />
            <Route path="/check-leaver-data" element={
              <ProtectedRoute>
                <CheckLeaverDataPage />
              </ProtectedRoute>
            } />
            <Route path="/guidance" element={
              <ProtectedRoute>
                <GuidancePage />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/compare" element={
              <ProtectedRoute>
                <ComparePage />
              </ProtectedRoute>
            } />
            <Route path="/local-authority" element={
              <ProtectedRoute>
                <LocalAuthorityPage />
              </ProtectedRoute>
            } />
            <Route path="/trust" element={
              <ProtectedRoute>
                <TrustPage />
              </ProtectedRoute>
            } />
            <Route path="/sign-out" element={
              <ProtectedRoute>
                <SignOutPage />
              </ProtectedRoute>
            } />
            <Route path="/tools" element={
              <ProtectedRoute>
                <ToolsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authenticated = sessionStorage.getItem('vyed_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />;
  }

  return (
    <UserTypeProvider>
      <TrackingProvider>
        <AppRoutes />
      </TrackingProvider>
    </UserTypeProvider>
  );
}

export default App;
