const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cron = require('node-cron');
const convertXmlData = require('./actions/convert-xml-data.js');

app.prepare().then(async () => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');

    let inProcess = true;

    cron.schedule('* 2 * * *', async function () {
      if (inProcess) return;
      inProcess = true;
      await convertXmlData();
      inProcess = false;
    });

    if (process.env.ALLOW_START_CRON === 'true') {
      convertXmlData().finally(() => {
        inProcess = false;
      });
    }
  });
});
