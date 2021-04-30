import { useEffect, useState } from 'react';
import { formatToEuros } from '../../../utils/price-formatter';
import {
  extractDates,
  filterOffersAccordingAirPort,
  filterOffersAccordingDepartureDate,
  getTravelItems,
  orderOffers,
} from '../../../utils/travel-parser';
import DatePicker from '../../global/date-picker';
import SubTitle from '../../global/sub-title';
import BorderSelector from '../../global/border-selector';
import { generateInputSelectorFeed } from '../../../utils/object-generators';

import {
  container,
  blockWrapper,
  blockContent,
  title,
  input,
  blockRow,
  delimiter,
  totalBlock,
  totalBlockFooter,
  priceTable,
  priceTableRow,
  totalPrice,
} from './offer-form.module.scss';
import { generateArrayOfValue } from '../../../utils/array';

const defaultBaseData = {
  airports: [],
  adultQuantities: null,
  childQuantities: null,
  travel: null,
};

export default function OfferForm({ offers }) {
  const vitrineTravel = orderOffers(getTravelItems(offers))[0];

  // Base data
  const [baseData, setBaseData] = useState(defaultBaseData);

  // Form data
  const [departureDate, setDepartureDate] = useState(null);
  const [airport, setAirport] = useState(null);
  const [childQuantity, setChildQuantity] = useState(null);
  const [adultQuantity, setAdultQuantity] = useState(null);

  // When the departure date is selected
  useEffect(() => {
    if (!departureDate) return;

    const filteredOffers = filterOffersAccordingDepartureDate(
      offers,
      departureDate
    );

    setBaseData({
      ...defaultBaseData,
      airports: filteredOffers.map((offer) => ({
        label: offer.from_ref,
        value: offer.from_ref,
      })),
      adultQuantities: null,
      childQuantities: null,
    });

    setAirport(null);
    setChildQuantity(null);
    setAdultQuantity(null);
  }, [departureDate]);

  // When airport is selected
  useEffect(() => {
    if (!airport) return;

    const currentTravel = filterOffersAccordingAirPort(
      filterOffersAccordingDepartureDate(offers, departureDate),
      airport.value
    )[0];

    const quantities = generateArrayOfValue({
      min: currentTravel.travel_items[0].adult_quantity_min,
      max: currentTravel.travel_items[0].adult_quantity_max,
    });

    setBaseData((prev) => ({
      ...defaultBaseData,
      airports: prev.airports,
      adultQuantities: generateInputSelectorFeed(quantities, 'adulte'),
      travel: currentTravel,
    }));

    setChildQuantity(null);
    setAdultQuantity(
      quantities.length === 1
        ? generateInputSelectorFeed(quantities, 'adulte')[0]
        : null
    );
  }, [airport]);

  // When adult quantity is selected
  useEffect(() => {
    if (!adultQuantity) return;

    const travelItem = baseData.travel.travel_items[0];
    const maxChildQuantity =
      travelItem.person_quantity_max - adultQuantity.value;

    const quantities = generateArrayOfValue({
      min: travelItem.child_quantity_min,
      max:
        maxChildQuantity < 0 || maxChildQuantity > travelItem.child_quantity_max
          ? 0
          : maxChildQuantity,
    });

    setBaseData((prev) => ({
      ...prev,
      childQuantities: generateInputSelectorFeed(quantities, 'enfant'),
    }));

    setChildQuantity(
      quantities.length === 1
        ? generateInputSelectorFeed(quantities, 'enfant')[0]
        : null
    );
  }, [adultQuantity]);

  return (
    <section className={container}>
      <SubTitle title="Choisir votre offre" color="white" />
      <article className={blockWrapper}>
        <h3 className={title}>Séjour</h3>
        <p>
          A partir de
          <strong> {formatToEuros(vitrineTravel.price_value)}€</strong>
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
                selectedDate={departureDate}
                setDate={setDepartureDate}
                disabledDates={extractDates(offers)}
              />
              <BorderSelector
                label="Aéroport de départ"
                theme="black"
                data={baseData.airports}
                selected={airport}
                setSelected={setAirport}
                className={input}
                isDisable={!departureDate}
              />
              <BorderSelector
                label="Nombre d'adultes"
                theme="black"
                data={baseData.adultQuantities}
                selected={adultQuantity}
                setSelected={setAdultQuantity}
                className={input}
                isDisable={!airport}
              />
              <BorderSelector
                label="Nombre d'enfants"
                theme="black"
                data={baseData.childQuantities}
                setSelected={setChildQuantity}
                selected={childQuantity}
                className={input}
                isDisable={!adultQuantity}
              />
            </div>
          </div>
        </article>
        <article className={totalBlock}>
          <h3 className={title}>Total</h3>
          <div className={priceTable}>
            <div className={priceTableRow}>
              <p>Aéroport départ : </p>
              <p>{airport ? airport.label : 'non spécifié'}</p>
            </div>

            <div className={priceTableRow}>
              <p>Aéroport arrivé : </p>
              <p>{baseData.travel ? baseData.travel.to_ref : 'non spécifié'}</p>
            </div>

            <div className={priceTableRow}>
              <p>Adulte(s) : </p>
              <p>{adultQuantity ? adultQuantity.value : 'non spécifié'}</p>
            </div>

            <div className={priceTableRow}>
              <p>Enfant(s) :</p>
              <p>{childQuantity ? childQuantity.value : 'non spécifié'}</p>
            </div>
          </div>
          <footer className={totalBlockFooter}>
            <span className={delimiter}></span>
            <strong className={totalPrice}>
              {adultQuantity && childQuantity
                ? formatToEuros(
                    (adultQuantity.value + childQuantity.value) *
                      baseData.travel.travel_items[0].price_value
                  )
                : 0}
              €
            </strong>
          </footer>
        </article>
      </div>
    </section>
  );
}
