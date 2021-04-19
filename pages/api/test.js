import parser from 'fast-xml-parser';

export default function (req, res) {
  fetch('http://localhost:3000/data/xftcpdstandard.xml')
    .then((res) => res.text())
    .then((data) => {
      const parsedData = parser.parse(data, {
        parseAttributeValue: true,
        ignoreAttributes: false,
      });

      res.json(parsedData);
    });
}
