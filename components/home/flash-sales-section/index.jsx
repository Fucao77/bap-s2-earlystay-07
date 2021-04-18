import SubTitle from '../../global/sub-title';
import Link from 'next/link';
import {
  section,
  container,
  slideWrapper,
  slideGroup,
  slide,
  slideBgWrapper,
  slideBg,
  slideTitle,
  slideSubTitle,
  mainContent,
  slideBtn,
  slideArrow,
  slideArrowLeft,
  slideArrowRight,
} from './flash-sales-section.module.scss';

import classNames from 'classnames';
import { useState } from 'react';

const data = [
  {
    country: 'Italy',
    city: 'Rome',
    price: 250,
    img:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80',
  },
  {
    country: 'Italy',
    city: 'Rome',
    price: 500,
    img:
      'https://images.unsplash.com/photo-1618711111459-3f6a12530a48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1402&q=80',
  },
];

export default function FlashSalesSection() {
  const maxIndex = data.length - 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const transformGroup = () => {
    return `translateX(${-currentIndex * 100}vw)`;
  };

  const onLeftArrow = () =>
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });

  const onRightArrow = () =>
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });

  return (
    <section className={section}>
      <header className={container}>
        <SubTitle title="Nos ventes flashs" />
      </header>
      <div className={slideWrapper}>
        <div
          className={slideGroup}
          style={{
            width: data.length * 100 + 'vw',
            transform: transformGroup(),
          }}
        >
          {data.map((item, index) => (
            <article className={slide} key={index}>
              <div className={mainContent}>
                <div className={slideBgWrapper}>
                  <img
                    className={slideBg}
                    src={item.img}
                    alt={item.city + ' image'}
                  />
                </div>
                <h3 className={slideTitle}>
                  {item.country} - {item.city}
                </h3>
                <p className={slideSubTitle}>{item.price}€ Jour/Personne</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/">
          <a className={slideBtn}>Découvrir l'offre</a>
        </Link>
        <button
          onClick={onLeftArrow}
          className={classNames(slideArrow, slideArrowLeft)}
        ></button>
        <button
          onClick={onRightArrow}
          className={classNames(slideArrow, slideArrowRight)}
        ></button>
      </div>
    </section>
  );
}
