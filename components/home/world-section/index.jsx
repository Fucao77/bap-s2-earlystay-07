import { useState } from 'react';
import SubTitle from '../../global/sub-title';
import OfferSection from '../offer-section';
import WorldMap from '../world-map';

import {
  worldSection,
  worldWrapper,
  world,
  adviceText,
  offerSection,
} from './world-section.module.scss';

const fakeOffers = [
  {
    id: 1,
    continent: 'Amerique du Nord',
    country: 'Canada',
    price: 450,
    img:
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
  },
  {
    id: 2,
    continent: 'Amerique du Nord',
    country: 'Etats-Unix',
    price: 750,
    img:
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
  },
  {
    id: 3,
    continent: 'Amerique du Nord',
    country: 'Mexique',
    price: 450,
    img:
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
  },
  {
    id: 4,
    continent: 'Amerique du Nord',
    country: 'Canada',
    price: 450,
    img:
      'https://images.unsplash.com/photo-1618605585170-df650edeeb46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
  },
];

const continentTitles = {
  oceania: 'Océanie',
  europa: 'Europe',
  'south-america': 'Amérique du Sud',
  'north-america': 'Amérique du Nord',
  asia: 'Asie',
  africa: 'Afrique',
};

export default function WorldSection() {
  const [selectedContinent, setSelectedContinent] = useState('europa');

  const onChangeContinent = (e) => {
    setSelectedContinent(e);
  };

  return (
    <section className={worldSection} id="world">
      <SubTitle title="Envie de découvertes ?" color="white" />
      <p className={adviceText}>
        Sélectionner un continent pour découvrir nos nouvelles destinations
        disponibles en ce moment !
      </p>
      <div className={worldWrapper}>
        <OfferSection
          className={offerSection}
          data={fakeOffers}
          label={continentTitles[selectedContinent]}
        />
        <WorldMap
          className={world}
          onChangeContinent={onChangeContinent}
          defaultContinent={selectedContinent}
        />
      </div>
    </section>
  );
}
