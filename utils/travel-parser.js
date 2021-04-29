/**
 *
 * @param {Array<{air_types_begins : Array<{price_data: { duration_day: number }}>}>} airTypes
 * @returns {Array<number>}
 */
export function getDurations(airTypes) {
  const durations = [];

  airTypes.forEach((airType) => {
    airType.air_type_begins.forEach((begin) => {
      const duration = begin.price_data.duration_day;
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
    airType.air_type_begins.forEach((begin) => {
      const mealPlan = begin.price_data.meal_plan;
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
export function getOffers(airTypes) {
  const offers = [];

  airTypes.forEach((airType) => {
    airType.air_type_begins.forEach((begin) => offers.push(begin));
  });

  return offers;
}

export function orderOffers(offers) {
  return offers.sort((item1, item2) => item1.price_value - item2.price_value);
}

export function extractDates(offers) {
  return offers.map((offer) => new Date(Date.parse(offer.between_begin)));
}

export function extractArrayOfTravelerQuantityPossibilities(rule) {
  const quantities = [];

  for (let i = rule.min; i <= rule.max; i++) {
    quantities.push(i);
  }

  return quantities;
}
