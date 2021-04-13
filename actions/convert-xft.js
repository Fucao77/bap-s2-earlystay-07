import parser from 'fast-xml-parser';

export async function convertXft(prisma, xft, productCodes) {
  const xftData = parser.parse(xft, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  const airTypeSchemas = [],
    airTypeBeginSchemas = [],
    airTypePriceSchemas = [],
    airTypePriceDescSchemas = [],
    airTypePriceRuleSchemas = [],
    airTypePriceQuantitySchema = [];

  xftData.Segments.Segments[0].Segment.forEach((seg, segIndex) => {
    const segments = Array.isArray(seg.Segments.Segment)
      ? seg.Segments.Segment
      : [seg.Segments.Segment];
    const productId = seg.Code['@_Value'];

    if (!productCodes.includes(productId)) return;

    segments.forEach((subSeg, index) => {
      const segId = productId + segIndex + index;

      airTypeSchemas.push({
        id: segId,
        product_code: productId,
        from_ref: subSeg.From['@_Ref'],
        from_default: subSeg.From['@_Default'],
        to_ref: subSeg.To['@_Ref'],
      });

      const subSegs = Array.isArray(subSeg.Begins.Begin)
        ? subSeg.Begins.Begin
        : [subSeg.Begins.Begins];

      subSegs.forEach((begin, subIndex) => {
        const beginId = segId + subIndex;

        if (!begin) return;

        airTypeBeginSchemas.push({
          id: beginId,
          air_type_id: segId,
          between_begins: begin.Betweens.Between['@_Begin'],
          between_end: begin.Betweens.Between['@_End'],
          end_moment: begin.End['@_Moment'],
          day: begin['@_Day'],
        });

        airTypePriceSchemas.push({
          id: beginId,
          air_type_begin_id: beginId,
          price_ref: begin.Price['@_Ref'],
          quantity: begin.Price['@_Quantity'],
        });

        airTypePriceDescSchemas.push({
          price_id: beginId,
          code_value: begin.Price.Prices.Price.Code['@_Value'],
          code_name: begin.Price.Prices.Price.Code['@_Name'],
          tax_value: begin.Price.Prices.Price.Tax['@_Value'],
          value: begin.Price.Prices.Price['@_Value'],
          ref: begin.Price.Prices.Price['@_Ref'],
        });

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
    });
  });

  console.log(airTypeBeginSchemas);

  await prisma.segment_air_types.createMany({ data: airTypeSchemas });
  // await prisma.segment_air_type_begins.createMany({data: airTypeBeginSchemas})
  // await prisma.segment_air_type_prices.createMany({data: airTypePriceSchemas})
  // await prisma.segment_air_type_price_descriptions.createMany({data : airTypePriceDescSchemas})
  // await prisma.segment_air_type_price_rules.createMany({data: airTypePriceRuleSchemas})
  // await prisma.segment_air_type_price_quantities.createMany({ data: airTypePriceQuantitySchema})

  return xftData;
}
