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

  //Fetch meals
  for (const index in xftData.Segments.Segments[1].Segment[0].MealPlans
    .MealPlan) {
    const meal =
      xftData.Segments.Segments[1].Segment[0].MealPlans.MealPlan[index];

    await prisma.meal_plans.create({
      data: {
        id: meal['@_ID'],
        code_txt: meal['@_Code'],
        code: String(meal.Code['@_Value']),
        text: meal['#text'],
      },
    });
  }

  const promiseProducer = function* () {
    // Fetch reservation data
    for (const index in xftData.Segments.Segments[1].Prices.Price) {
      const price = xftData.Segments.Segments[1].Prices.Price[index];

      if (price['@_ID'] !== 'PA') {
        yield prisma.reservation_data.create({
          data: {
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
          },
        });
      }
    }

    //Fetch travels
    for (const index in xftData.Segments.Segments[0].Segment) {
      const seg = xftData.Segments.Segments[0].Segment[index];

      const productId = seg.Code['@_Value'];

      if (productCodes.includes(productId)) {
        const segments = Array.isArray(seg.Segments.Segment)
          ? seg.Segments.Segment
          : [seg.Segments.Segment];

        for (const index2 in segments) {
          const subSeg = segments[index2];
          const begins = Array.isArray(subSeg.Begins.Begin)
            ? subSeg.Begins.Begin
            : [subSeg.Begins.Begin];

          yield prisma.travels.create({
            data: {
              product_code: productId,
              from_ref: subSeg.From['@_Ref'],
              from_default: subSeg.From['@_Default'],
              to_ref: subSeg.To['@_Ref'],
              travel_items: {
                create: begins.map((begin) => ({
                  between_begin: new Date(begin.Betweens.Between['@_Begin']),
                  between_end: new Date(begin.Betweens.Between['@_End']),
                  end_moment: begin.End['@_Moment'],
                  day: begin['@_Day'],

                  price_main_ref: begin.Price['@_Ref'],
                  price_quantity: begin.Price['@_Quantity'],
                  price_code_value: begin.Price.Prices.Price.Code['@_Value'],
                  price_code_name: begin.Price.Prices.Price.Code['@_Name'],
                  price_tax_value: begin.Price.Prices.Price.Tax['@_Value'],
                  price_original_value:
                    begin.Price.Prices.Price['@_OriginalValue'],
                  price_value: begin.Price.Prices.Price['@_Value'],
                  price_ref: begin.Price.Prices.Price['@_Ref'],

                  rule_code_value: begin.Price.Rule.Code['@_Value'],
                  rule_code_name: begin.Price.Rule.Code['@_Name'],
                  rule_at_ref: begin.Price.Rule.At['@_Ref'],
                  person_quantity_min:
                    begin.Price.Rule.Quantities.Quantity[0].MinMax['@_Min'],
                  person_quantity_max:
                    begin.Price.Rule.Quantities.Quantity[0].MinMax['@_Max'],
                  adult_quantity_min:
                    begin.Price.Rule.Quantities.Quantity[1].MinMax['@_Min'],
                  adult_quantity_max:
                    begin.Price.Rule.Quantities.Quantity[1].MinMax['@_Max'],
                  child_quantity_min:
                    begin.Price.Rule.Quantities.Quantity.length > 2
                      ? begin.Price.Rule.Quantities.Quantity[2].MinMax['@_Min']
                      : 0,
                  child_quantity_max:
                    begin.Price.Rule.Quantities.Quantity.length > 2
                      ? begin.Price.Rule.Quantities.Quantity[2].MinMax['@_Max']
                      : 0,
                  infant_quantity_min:
                    begin.Price.Rule.Quantities.Quantity.length > 3
                      ? begin.Price.Rule.Quantities.Quantity[3].MinMax['@_Min']
                      : 0,
                  infant_quantity_max:
                    begin.Price.Rule.Quantities.Quantity.length > 3
                      ? begin.Price.Rule.Quantities.Quantity[3].MinMax['@_Max']
                      : 0,
                })),
              },
            },
          });
        }
      }
    }
  };

  const pool = new PromisePool(
    promiseProducer(),
    Number(process.env.PROMISE_MAX_CONCURRENCE) || 10
  );

  await pool.start();

  return xftData;
};
