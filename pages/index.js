// import { useEffect } from 'react';
// import Nav from '../components/nav';
import SearchHeader from '../components/search-header';
import SubTitle from '../components/sub-title';
import WorldMap from '../components/world-map';

import { worldSection } from '../styles/pages/index.module.scss';

export default function Home() {
  return (
    <div>
      {/* <Nav /> */}
      <SearchHeader />
      <section className={worldSection}>
        <SubTitle title="Envie de découvertes ?" />
        <WorldMap />
      </section>
    </div>
  );
}
