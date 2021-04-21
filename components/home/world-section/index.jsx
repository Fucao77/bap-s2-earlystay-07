import { useRouter } from 'next/router';
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

const continentTitles = {
  oceania: 'Océanie',
  europa: 'Europe',
  'south-america': 'Amérique du Sud',
  'north-america': 'Amérique du Nord',
  asia: 'Asie',
  africa: 'Afrique',
};

export default function WorldSection({ offers }) {
  const [selectedContinent, setSelectedContinent] = useState('europa');

  const router = useRouter();

  const onChangeContinent = (e) => {
    setSelectedContinent(e);
  };

  const onClickOffer = () => {
    router.push('/travel/something');
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
          data={offers[selectedContinent]}
          label={continentTitles[selectedContinent]}
          onClick={onClickOffer}
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
