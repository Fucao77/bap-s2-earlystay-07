// import { useEffect } from 'react';
// import Nav from '../components/nav';
import { useEffect } from 'react';
import TrustBanner from '../components/global/trust-banner';
import FlashSalesSection from '../components/home/flash-sales-section';
import SearchHeader from '../components/home/search-header';
import Nav from '../components/nav';
import WorldSection from '../components/home/world-section';
import Footer from '../components/footer';

export default function Home() {
  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <Nav />
      <SearchHeader />
      <WorldSection />
      <FlashSalesSection />
      <TrustBanner />
      <Footer />
    </div>
  );
}
