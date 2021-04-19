const chalk = require('chalk');

/**
 *
 * @param {PrismaClient} prisma
 */
module.exports = async function truncateProducts(prisma) {
  console.log(chalk.red('Truncate begins'));

  const airTypeTransaction = async () => {
    await prisma.air_type_rule_quantities.deleteMany({});
    await prisma.air_type_begins.deleteMany({});
    await prisma.air_types.deleteMany({});
  };

  const commercialTransaction = async () => {
    await prisma.commercial_info_plus_paragraphs.deleteMany({});
    await prisma.commercial_info_plus.deleteMany({});
    await prisma.commercial_reservations.deleteMany({});
    await prisma.commercial_infos.deleteMany({});
  };

  const genericTransaction = async () => {
    await prisma.delivery_services.deleteMany({});
    await prisma.destinations.deleteMany({});
  };

  const optionTransaction = async () => {
    await prisma.option_description_paragraph_objects.deleteMany({});
    await prisma.option_description_paragraphs.deleteMany({});
    await prisma.option_descriptions.deleteMany({});
    await prisma.options.deleteMany({});
  };

  await Promise.all([
    airTypeTransaction(),
    commercialTransaction(),
    genericTransaction(),
    optionTransaction(),
  ]);

  await prisma.products.deleteMany({});

  console.log(chalk.red('Truncate ends'));
};
