import { DateUtils } from 'react-day-picker';

/**
 *
 * @param {Array<{air_types_begins : Array<{reservation_data: { duration_day: number }}>}>} airTypes
 * @returns {Array<number>}
 */
export function getDurations(airTypes) {
  const durations = [];

  airTypes.forEach((airType) => {
    airType.travel_items.forEach((begin) => {
      const duration = begin.reservation_data.duration_day;
      !durations.includes(duration) && durations.push(duration);
    });
  });

  return durations.sort((a, b) => a - b);
}

/**
 *
 * @param {Array<{air_types_begins : Array<{price_data: { duration_day: number }}>}>} airTypes
 * @returns {Array<{code : string, code_txt: string, id: string, text: string}>}
 */
export function getMealPlans(airTypes) {
  const mealPlans = [];

  airTypes.forEach((airType) => {
    airType.travel_items.forEach((begin) => {
      const mealPlan = begin.reservation_data.meal_plan;
      !mealPlans.find((meal) => meal.code === mealPlan.code) &&
        mealPlans.push(mealPlan);
    });
  });
  return mealPlans;
}

/**
 *
 * @param {Array<{air_types_begins : Array<{price_data: { duration_day: number }}>}>} airTypes
 * @returns {Array}>}
 */
export function getTravelItems(travels) {
  const offers = [];

  travels.forEach((airType) => {
    airType.travel_items.forEach((begin) => offers.push(begin));
  });

  return offers;
}

export function orderOffers(offers) {
  return offers.sort((item1, item2) => item1.price_value - item2.price_value);
}

export function extractDates(travels) {
  return getTravelItems(travels).map(
    (offer) => new Date(Date.parse(offer.between_begin))
  );
}

export function filterOffersAccordingDepartureDate(offers, date) {
  let results = offers.filter((item) =>
    item.travel_items.some((travel) =>
      DateUtils.isSameDay(new Date(Date.parse(travel.between_begin)), date)
    )
  );

  results = results.map((travel) => ({
    ...travel,
    travel_items: travel.travel_items.filter((item) =>
      DateUtils.isSameDay(new Date(Date.parse(item.between_begin)), date)
    ),
  }));

  return results;
}

export function filterOffersAccordingAirPort(offers, airport) {
  return offers.filter((offer) => offer.from_ref === airport);
}
