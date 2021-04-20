import { useEffect, useState } from 'react';
import BorderSelector from '../../global/border-selector';
import DatePicker from '../../global/date-picker';
import SeeMoreButton from '../../global/see-more-button';
import TravelInput from '../travel-input';
import classNames from 'classnames';
import { THEMES } from '../../../constants/travels';

import {
  container,
  bgImg,
  buttonContainer,
  button,
  seeButton,
  main,
  containerFillScreen,
  containerOverScreen,
} from './search-header.module.scss';
import { useRouter } from 'next/router';

export default function SearchHeader({ defaultData, displaySeeMore = true }) {
  const [goingDate, setGoingDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [theme, setTheme] = useState(null);
  const [travelTitle, setTravelTitle] = useState('');

  const router = useRouter();

  const onSearch = () => {
    router.push(
      `/search?search=${travelTitle}&duration=${duration.value}&theme=${
        theme.value
      }&date=${goingDate.getTime()}`
    );
  };

  useEffect(() => {
    if (!defaultData) return;

    setTravelTitle(defaultData.search);
    setTheme({
      value: defaultData.theme,
      label: THEMES.find((t) => t.value === defaultData.theme)?.label,
    });
    setDuration({
      value: defaultData.duration,
      label:
        defaultData.duration + ' jour' + (defaultData.duration > 1 ? 's' : ''),
    });
    setGoingDate(new Date(Number(defaultData.date)));
  }, [defaultData]);

  const durations = Array.from(Array(60).keys()).map((item, index) => ({
    label: `${index + 1} jour${index + 1 > 1 ? 's' : ''}`,
    value: index + 1,
  }));

  return (
    <header
      className={classNames(
        container,
        displaySeeMore ? containerOverScreen : containerFillScreen
      )}
      id="search-header"
    >
      <img className={bgImg} src="/img/search-header-img.jpg" alt="Paris" />
      <div className={main}>
        <TravelInput
          placeholder="Recherchez votre destination de rêve"
          value={travelTitle}
          setValue={setTravelTitle}
          onSubmit={onSearch}
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
            data={THEMES}
            selected={theme}
            setSelected={setTheme}
          />
        </div>
      </div>
      {displaySeeMore && <SeeMoreButton className={seeButton} to="#world" />}
    </header>
  );
}
