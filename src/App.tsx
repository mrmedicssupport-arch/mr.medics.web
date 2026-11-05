import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  const [language, setLanguage] = useState('EN');

  return (
    <BrowserRouter>
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
          <Route path="/about" element={<Home language={language} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<Home language={language} />} />
          <Route path="/terms" element={<Home language={language} />} />
          <Route path="/privacy" element={<Home language={language} />} />
          <Route path="*" element={<Home language={language} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
