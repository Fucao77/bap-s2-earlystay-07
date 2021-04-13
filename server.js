const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cron = require('node-cron');
const { default: convertXmlData } = require('./actions/convert-xml-data');

app.prepare().then(() => {
  const task = cron.schedule('10 * * * * *', async function () {
    console.log('Conversion start');
    await convertXmlData();
    console.log('Conversion end');
  });

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
