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
  mainCenter,
} from './search-header.module.scss';
import { useRouter } from 'next/router';
import { generateQueryUrl } from '../../../utils/url';

export default function SearchHeader({ defaultData, displaySeeMore = true }) {
  const [departureDate, setDepartureDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [theme, setTheme] = useState(null);
  const [travelTitle, setTravelTitle] = useState('');

  const router = useRouter();

  const onSearch = () => {
    if (![travelTitle, duration, theme, departureDate].some((val) => val)) {
      alert(
        'Il faut définir un titre de recherche et/ou une date de départ et/ou une durée et/ou un thème pour valider la recherche'
      );
      return;
    }

    router.push(
      `/search?${generateQueryUrl({
        search: travelTitle,
        theme: theme?.value,
        duration: duration.value,
        date: departureDate.getTime(),
      })}#results`
    );
  };

  useEffect(() => {
    if (!defaultData) return;

    defaultData.search && setTravelTitle(defaultData.search);

    defaultData.theme &&
      setTheme({
        value: defaultData.theme,
        label: THEMES.find((t) => t.value === defaultData.theme)?.label,
      });

    defaultData.duration &&
      setDuration({
        value: defaultData.duration,
        label:
          defaultData.duration +
          ' jour' +
          (defaultData.duration > 1 ? 's' : ''),
      });

    defaultData.date && setDepartureDate(new Date(Number(defaultData.date)));
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
      <div className={classNames(main, !displaySeeMore ? mainCenter : null)}>
        <TravelInput
          placeholder="Recherchez votre destination de rêve"
          value={travelTitle}
          setValue={setTravelTitle}
          onSubmit={onSearch}
        />
        <div className={buttonContainer}>
          <DatePicker
            className={button}
            label="Départ"
            selectedDate={departureDate}
            setDate={setDepartureDate}
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
