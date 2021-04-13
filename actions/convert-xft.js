import parser from 'fast-xml-parser';
import PromisePool from 'es6-promise-pool';

export async function convertXft(prisma, xft, productCodes) {
  const xftData = parser.parse(xft, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  const airTypeSchemas = [],
    // airTypeBeginSchemas = [],
    airTypePriceRuleSchemas = [],
    airTypePriceQuantitySchema = [];

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

      const subSegs = Array.isArray(subSeg.Begins.Begin)
        ? subSeg.Begins.Begin
        : [subSeg.Begins.Begins];

      subSegs.forEach((begin, subIndex) => {
        const beginId = segId + subIndex;

        if (!begin) return;

        airTypeBeginSchemas.push({
          id: beginId,
          between_begin: new Date(begin.Betweens.Between['@_Begin']),
          between_end: new Date(begin.Betweens.Between['@_End']),
          end_moment: begin.End['@_Moment'],
          day: begin['@_Day'],
          segment_air_type_prices: {
            create: {
              id: beginId,
              price_ref: begin.Price['@_Ref'],
              quantity: begin.Price['@_Quantity'],
              segment_air_type_price_descriptions: {
                create: {
                  code_value: begin.Price.Prices.Price.Code['@_Value'],
                  code_name: begin.Price.Prices.Price.Code['@_Name'],
                  tax_value: begin.Price.Prices.Price.Tax['@_Value'],
                  value: begin.Price.Prices.Price['@_Value'],
                  ref: begin.Price.Prices.Price['@_Ref'],
                },
              },
            },
          },
        });

        // TO INSERT
        airTypePriceRuleSchemas.push({
          id: beginId,
          price_id: beginId,
          code_value: begin.Price.Rule.Code['@_Value'],
          code_name: begin.Price.Rule.Code['@_Name'],
          at_ref: begin.Price.Rule.At['@_Ref'],
        });

        begin.Price.Rule.Quantities.Quantity.forEach((quantity) => {
          airTypePriceQuantitySchema.push({
            air_type_rule_id: beginId,
            topic: quantity.MinMax['@_Topic'],
            unit: quantity['@_Unit'],
            max: quantity.MinMax['@_Max'],
            min: quantity.MinMax['@_Min'],
          });
        });
      });

      //PUSH SCHEMA
      airTypeSchemas.push({
        ...airTypeSchema,
        segment_air_type_begins: {
          create: airTypeBeginSchemas,
        },
      });
    });
  });

  // MANAGE PROMISES

  const promiseProducer = function* () {
    for (const index in airTypeSchemas) {
      yield prisma.segment_air_types.create({ data: airTypeSchemas[index] });
    }
  };

  const pool = new PromisePool(promiseProducer(), 10);

  await pool.start();

  return xftData;
}
