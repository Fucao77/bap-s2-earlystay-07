import { useEffect, useState } from 'react';
import { formatToEuros } from '../../../utils/price-formatter';
import { extractDates, orderOffers } from '../../../utils/travel-parser';
import DatePicker from '../../global/date-picker';
import SubTitle from '../../global/sub-title';
import { DateUtils } from 'react-day-picker';
import BorderSelector from '../../global/border-selector';
import { extractArrayOfTravelerQuantityPossibilities } from '../../../utils/travel-parser';

import {
  container,
  blockWrapper,
  blockContent,
  title,
  input,
  blockRow,
} from './offer-form.module.scss';

export default function OfferForm({ offers }) {
  const parsedOffers = orderOffers(offers);

  const [selectedDate, setSelectedDate] = useState();
  const [currentOptions, setCurrentOptions] = useState(null);
  // const [travellerQuantity, setTravellerQuantity] = useState(0)

  const [childQuantities, setChildQuantities] = useState(null);
  const [adultQuantities, setAdultQuantities] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;

    const options = offers.filter((option) =>
      DateUtils.isSameDay(
        new Date(Date.parse(option.between_begin)),
        selectedDate
      )
    );
    setCurrentOptions(options);
    setAdultQuantities(
      extractArrayOfTravelerQuantityPossibilities(
        options[0].air_type_price_quantities[1]
      ).map((item) => ({
        label: `${item} adulte${item > 1 ? 's' : ''}`,
        value: item,
      }))
    );
    setChildQuantities(null);
  }, [selectedDate]);

  console.log(currentOptions);

  return (
    <section className={container}>
      <SubTitle title="Choisir votre offre" color="white" />
      <article className={blockWrapper}>
        <h3 className={title}>Séjour</h3>
        <p>
          A partir de
          <strong> {formatToEuros(parsedOffers[0].price_value)}€</strong>
        </p>
      </article>
      <div className={blockRow}>
        <article className={blockWrapper}>
          <h3 className={title}>Configuration</h3>
          <div>
            <div className={blockContent}>
              <DatePicker
                label="Aller"
                theme="black"
                selectedDate={selectedDate}
                setDate={setSelectedDate}
                disabledDates={extractDates(offers)}
                className={input}
              />
              <BorderSelector
                label="Nombre d'adultes"
                theme="black"
                data={adultQuantities}
                className={input}
              />
              <BorderSelector
                label="Nombre d'enfants"
                theme="black"
                data={childQuantities}
                className={input}
              />
            </div>
          </div>
        </article>
        <article className={blockWrapper}>
          <h3 className={title}>Total</h3>
        </article>
      </div>
    </section>
  );
}
