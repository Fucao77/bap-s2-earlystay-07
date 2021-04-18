import ActionButton from '../../global/action-button';
import {
  container,
  sliderContainer,
  slidePoint,
  slidePointSelected,
  imgWrapper,
  img,
  title,
  secondTitle,
  slidePointWrapper,
  priceWrapper,
  ctaButtonWrapper,
} from './offer-section.module.scss';

import classNames from 'classnames';
import { useState } from 'react';

export default function OfferSection({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = data[currentIndex];

  return (
    <section className={container}>
      <div className={sliderContainer}>
        <article>
          <h3 className={title}>{currentData.continent}</h3>
          <div className={imgWrapper}>
            <img className={img} src={currentData.img} alt="" />
          </div>
          <div className={priceWrapper}>
            <h4 className={secondTitle}>{currentData.country}</h4>
            <p>A partir de {currentData.price}€ / pers.</p>
          </div>
        </article>
      </div>
      <div className={slidePointWrapper}>
        {data.map((item, index) => (
          <button
            key={index}
            className={classNames(
              slidePoint,
              currentIndex === index ? slidePointSelected : null
            )}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
      <footer className={ctaButtonWrapper}>
        <ActionButton>Je réserve</ActionButton>
      </footer>
    </section>
  );
}
