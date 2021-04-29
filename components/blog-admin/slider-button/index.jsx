import React from 'react';
import { slider, circle, slide } from '../slider-button/slider.module.scss';

export default function Slider() {
  return (
    <div className={slider}>
      <div className={circle}>
        <button className={slide}></button>
        <button className={slide}></button>
        <button className={slide}></button>
        <button className={slide}></button>
      </div>
    </div>
  );
}
