const parser = require('fast-xml-parser');
const PromisePool = require('es6-promise-pool');

exports.convertXft = async function (prisma, xft, productCodes) {
  const xftData = parser.parse(xft, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  const airTypeSchemas = [];

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
