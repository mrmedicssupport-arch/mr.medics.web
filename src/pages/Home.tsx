import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import ServicesSection from '../components/ServicesSection';
import HowItWorks from '../components/HowItWorks';
import StatsBand from '../components/StatsBand';
import HealthPackages from '../components/HealthPackages';
import SpecialtiesGrid from '../components/SpecialtiesGrid';
import FounderSection from '../components/FounderSection';
import SymptomCheckerTeaser from '../components/SymptomCheckerTeaser';
import AppDownloadSection from '../components/AppDownloadSection';
import FaqSection from '../components/FaqSection';
import CtaBand from '../components/CtaBand';

export default function Home({ language }: { language: string }) {
  return (
    <div>
      <Hero language={language} />
      <TrustStrip />
      <ServicesSection />
      <HowItWorks />
      <StatsBand />
      <HealthPackages />
      <SpecialtiesGrid />
      <FounderSection />
      <SymptomCheckerTeaser />
      <AppDownloadSection />
      <FaqSection />
      <CtaBand />
    </div>
  );
}
