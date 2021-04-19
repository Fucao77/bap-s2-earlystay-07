const { convertCeto } = require('./services/convert-ceto.js');
const { convertXft } = require('./services/convert-xft.js');
const truncateProducts = require('./services/truncate-products');
const { PrismaClient } = require('@prisma/client');
const log = console.log;
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const { Timer } = require('timer-node');
const { fetchCeto } = require('./services/fetch-ceto.js');
const { fetchXft } = require('./services/fetch-xft.js');

async function convertXmlData() {
  const prisma = new PrismaClient();
  const loadingAnimation = chalkAnimation.karaoke('Loading...');
  const timer = new Timer({
    label: 'Process timer',
  });

  try {
    timer.start();

    log(chalk.green('Ceto and Xft file in fetching'));

    loadingAnimation.start();

    const [cetoFile, xftFile] = await Promise.all([
      fetchCeto(),
      fetchXft(),
      truncateProducts(prisma),
    ]);

    loadingAnimation.stop();

    log(chalk.green('Data are fetched'));

    log(chalk.yellow('Ceto conversion begins'));

    loadingAnimation.start();

    const { productCodes } = await convertCeto(prisma, cetoFile);

    loadingAnimation.stop();

    log('Ceto conversion ends');

    log('Xft conversion begins');

    loadingAnimation.start();

    await convertXft(prisma, xftFile, productCodes);

    loadingAnimation.stop();

    log('Xft conversion ends');

    timer.stop();

    log(chalk.green(timer.format('%label [%m] minutes [%s] seconds [%ms] ms')));
  } catch (e) {
    console.error(e);
  }

  await prisma.$disconnect();
}

module.exports = convertXmlData;
