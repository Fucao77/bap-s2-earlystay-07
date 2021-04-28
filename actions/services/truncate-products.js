const chalk = require('chalk');

/**
 *
 * @param {PrismaClient} prisma
 */
module.exports = async function truncateProducts(prisma) {
  console.log(chalk.red('Truncate begins'));

  const airTypeTransaction = async () => {
    await prisma.travel_item.deleteMany({});
    await prisma.reservation_data.deleteMany({});
    await prisma.meal_plans.deleteMany({});
    await prisma.travels.deleteMany({});
  };

  const genericTransaction = async () => {
    await prisma.delivery_services.deleteMany({});
  };

  const optionTransaction = async () => {
    await prisma.option_images.deleteMany({});
    await prisma.option_description.deleteMany({});
  };

  await Promise.all([
    airTypeTransaction(),
    genericTransaction(),
    optionTransaction(),
  ]);

  await prisma.products.deleteMany({});

  console.log(chalk.red('Truncate ends'));
};
