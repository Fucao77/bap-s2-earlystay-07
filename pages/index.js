// import { useEffect } from 'react';
// import Nav from '../components/nav';
import TrustBanner from '../components/global/trust-banner';
import FlashSalesSection from '../components/home/flash-sales-section';
import SearchHeader from '../components/home/search-header';

import WorldSection from '../components/home/world-section';

export default function Home() {
  return (
    <div>
      {/* <Nav /> */}
      <SearchHeader />
      <WorldSection />
      <FlashSalesSection />
      <TrustBanner />
    </div>
  );
}
