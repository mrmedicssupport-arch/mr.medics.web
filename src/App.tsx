import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';

import ServicesOverview from './pages/services/ServicesOverview';
import DoctorConsultation from './pages/services/DoctorConsultation';
import LabTestsService from './pages/services/LabTestsService';
import MedicinesService from './pages/services/MedicinesService';
import AiSymptomCheckerPage from './pages/services/AiSymptomCheckerPage';
import HealthRecordsPage from './pages/services/HealthRecordsPage';

import DoctorsPage from './pages/DoctorsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';

import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [language, setLanguage] = useState('EN');

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout language={language} setLanguage={setLanguage}>
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/services/doctor-consultation" element={<DoctorConsultation />} />
            <Route path="/services/lab-tests" element={<LabTestsService />} />
            <Route path="/services/medicines" element={<MedicinesService />} />
            <Route path="/services/ai-symptom-checker" element={<AiSymptomCheckerPage />} />
            <Route path="/services/health-records" element={<HealthRecordsPage />} />
            
            <Route path="/lab-tests" element={<LabTestsService />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/patient" element={<AccountPage />} />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
