const parser = require('fast-xml-parser');
const PromisePool = require('es6-promise-pool');

/**
 *
 * @param {PrismaClient} prisma
 * @param {String} xft
 * @param {String[]} productCodes
 * @returns
 */
exports.convertXft = async function (prisma, xft, productCodes) {
  const xftData = parser.parse(xft, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  const airTypeSchemas = [];
  const priceDataSchemas = [];
  const mealPlansSchemas = [];

  //Fetch mealPlansSchema
  await xftData.Segments.Segments[1].Segment[0].MealPlans.MealPlan.forEach(
    async (meal) => {
      mealPlansSchemas.push({
        id: meal['@_ID'],
        code_txt: meal['@_Code'],
        code: String(meal.Code['@_Value']),
        text: meal['#text'],
      });
    }
  );

  //Fetch priceDataSchemas
  await xftData.Segments.Segments[1].Prices.Price.forEach(async (price) => {
    if (price['@_ID'] === 'PA') return;
    priceDataSchemas.push({
      id: price['@_ID'],
      currency: price['@_Currency'],
      decimals: price['@_Decimals'],
      quantity: price['@_Quantity'],
      role: price['@_Role'],
      duration_night: price.Rule.Durations.Duration[0]['@_Value'],
      duration_day: price.Rule.Durations.Duration[1]['@_Value'],
      quantity_for: price.Rule.Quantity['@_For'],
      quantity_unit: price.Rule.Quantity['@_Unit'],
      meal_plan_ref: price.Rule.Segment.MealPlan['@_Ref'],
      room_ref: price.Rule.Segment.Room['@_Ref'],
      traveller_type: price.Rule.Traveller['@_Type'],
      traveller_quantity: price.Rule.Traveller['@_Quantity'],
    });
  });

  //Fetch airTypeSchemas
  await xftData.Segments.Segments[0].Segment.forEach(async (seg, segIndex) => {
    const segments = Array.isArray(seg.Segments.Segment)
      ? seg.Segments.Segment
      : [seg.Segments.Segment];
    const productId = seg.Code['@_Value'];

    if (!productCodes.includes(productId)) return;

    await segments.forEach(async (subSeg, index) => {
      const segId = productId + segIndex + index;

      const airTypeSchema = {
        id: segId,
        product_code: productId,
        from_ref: subSeg.From['@_Ref'],
        from_default: subSeg.From['@_Default'],
        to_ref: subSeg.To['@_Ref'],
      };

      const airTypeBeginSchemas = [];

      //Sub segments can be parsed as array or not
      const subSegs = Array.isArray(subSeg.Begins.Begin)
        ? subSeg.Begins.Begin
        : [subSeg.Begins.Begins];

      subSegs.forEach((begin, subIndex) => {
        const beginId = segId + subIndex;

        if (!begin) return;

        const airTypePriceQuantitySchema = begin.Price.Rule.Quantities.Quantity.map(
          (quantity) => ({
            topic: quantity.MinMax['@_Topic'],
            unit: quantity['@_Unit'],
            max: quantity.MinMax['@_Max'],
            min: quantity.MinMax['@_Min'],
          })
        );

        airTypeBeginSchemas.push({
          id: beginId,
          between_begin: new Date(begin.Betweens.Between['@_Begin']),
          between_end: new Date(begin.Betweens.Between['@_End']),
          end_moment: begin.End['@_Moment'],
          day: begin['@_Day'],

          price_main_ref: begin.Price['@_Ref'],
          price_quantity: begin.Price['@_Quantity'],
          price_code_value: begin.Price.Prices.Price.Code['@_Value'],
          price_code_name: begin.Price.Prices.Price.Code['@_Name'],
          price_tax_value: begin.Price.Prices.Price.Tax['@_Value'],
          price_original_value: begin.Price.Prices.Price['@_OriginalValue'],
          price_value: begin.Price.Prices.Price['@_Value'],
          price_ref: begin.Price.Prices.Price['@_Ref'],

          rule_code_value: begin.Price.Rule.Code['@_Value'],
          rule_code_name: begin.Price.Rule.Code['@_Name'],
          rule_at_ref: begin.Price.Rule.At['@_Ref'],
          air_type_price_quantities: {
            create: airTypePriceQuantitySchema,
          },
        });
      });

      //PUSH SCHEMA
      airTypeSchemas.push({
        ...airTypeSchema,
        air_type_begins: {
          create: airTypeBeginSchemas,
        },
      });
    });
  });

  // MANAGE PROMISES

  const promiseProducer = function* () {
    for (const index in mealPlansSchemas) {
      yield prisma.stay_type_meal_plans.create({
        data: mealPlansSchemas[index],
      });
    }
    for (const index in priceDataSchemas) {
      yield prisma.price_data.create({ data: priceDataSchemas[index] });
    }
    for (const index in airTypeSchemas) {
      yield prisma.air_types.create({ data: airTypeSchemas[index] });
    }
  };

  const pool = new PromisePool(
    promiseProducer(),
    Number(process.env.PROMISE_MAX_CONCURRENCE) || 10
  );

  await pool.start();

  return xftData;
};
