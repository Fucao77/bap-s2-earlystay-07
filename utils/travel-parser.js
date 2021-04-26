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
