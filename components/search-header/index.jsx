import { useState } from 'react';
import BorderSelector from '../border-selector';
import DatePicker from '../date-picker';
import SeeMoreButton from '../see-more-button';
import TravelInput from '../travel-input';
import {
  container,
  bgImg,
  buttonContainer,
  button,
  seeButton,
  main,
} from './search-header.module.scss';

export default function SearchHeader() {
  const [goingDate, setGoingDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [theme, setTheme] = useState(null);
  const [travelTitle, setTravelTitle] = useState('');

  const durations = Array.from(Array(60).keys()).map((item, index) => ({
    label: `${index + 1} jour${index + 1 > 1 ? 's' : ''}`,
    value: index + 1,
  }));

  const themes = [
    {
      label: 'Theme 1',
      value: 'T',
    },
    {
      label: 'Theme 1',
      value: 'T',
    },
    {
      label: 'Theme 1',
      value: 'T',
    },
    {
      label: 'Theme 1',
      value: 'T',
    },
    {
      label: 'Theme 1',
      value: 'T',
    },
  ];

  return (
    <header className={container}>
      <img className={bgImg} src="/img/search-header-img.jpg" alt="Paris" />
      <div className={main}>
        <TravelInput
          placeholder="Recherchez votre destination de rêve"
          value={travelTitle}
          setValue={setTravelTitle}
        />
        <div className={buttonContainer}>
          <DatePicker
            className={button}
            label="Aller"
            selectedDate={goingDate}
            setDate={setGoingDate}
          />
          <BorderSelector
            className={button}
            label="Durée"
            data={durations}
            selected={duration}
            setSelected={setDuration}
          />
          <BorderSelector
            className={button}
            label="Thèmes"
            data={themes}
            selected={theme}
            setSelected={setTheme}
          />
        </div>
      </div>

      <SeeMoreButton className={seeButton} />
    </header>
  );
}
