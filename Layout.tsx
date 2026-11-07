import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsappButton from './WhatsappButton';
import MobileBottomBar from './MobileBottomBar';

export default function Layout({ children, language, setLanguage }: any) {
  return (
    <div className="flex flex-col min-h-[100svh] bg-white text-[#475569] relative">
      <Navbar language={language} setLanguage={setLanguage} />
      <motion.main 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -10 }} 
        transition={{ duration: 0.3 }}
        className="flex-grow pb-[60px] md:pb-0"
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsappButton />
      <MobileBottomBar />
    </div>
  );
}
