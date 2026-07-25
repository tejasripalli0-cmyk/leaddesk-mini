import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import LeadForm from '../components/LeadForm.jsx';
import Footer from '../components/Footer.jsx';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <LeadForm />
      <Footer />
    </div>
  );
}
