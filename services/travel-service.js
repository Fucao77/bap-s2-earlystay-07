import { PrismaClient } from '.prisma/client';
import { ObjectSerializer } from '../utils/serializer';

// export function searchTravel({ searchValue, departureDate, duration,  }) {

// }

export async function getTravelById(id) {
  const prisma = new PrismaClient();

  try {
    const results = await prisma.products.findUnique({
      where: {
        interne_to: id,
      },
      include: {
        air_types: {
          include: {
            air_type_begins: {
              include: {
                price_data: {
                  include: {
                    meal_plan: true,
                    air_type_begins: false,
                  },
                },

                air_type_price_quantities: true,
              },
            },
          },
        },
        options: {
          include: {
            option_descriptions: {
              include: {
                option_description_paragraphs: {
                  include: {
                    option_description_paragraph_objects: true,
                  },
                },
              },
            },
          },
        },
        commercial_infos: true,
      },
    });

    if (!results) return null;

    const serializer = new ObjectSerializer();

    const formatedAirTypes = results.air_types.map((res) => {
      return {
        ...res,
        air_type_begins: res.air_type_begins.map((begin) => {
          return serializer.serialize(begin);
        }),
      };
    });

    prisma.$disconnect();

    return { ...results, air_types: formatedAirTypes };
  } catch (e) {
    console.log(e);
    return null;
  }
}
