import fs from 'fs';
import parser from 'fast-xml-parser';

export default function test(req, res) {
  const file = fs.readFileSync('data/ceto.xml').toString();
  const data = parser.parse(file, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  res.json(data);
}
