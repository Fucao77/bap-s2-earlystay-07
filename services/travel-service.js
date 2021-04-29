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
        travels: {
          include: {
            travel_items: {
              include: {
                reservation_data: {
                  include: {
                    meal_plan: true,
                  },
                },
              },
            },
          },
        },
        options: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!results) return null;

    const serializer = new ObjectSerializer();

    results.travels.map((res) => {
      return {
        ...res,
        air_type_begins: res.travel_items.map((begin) => {
          return serializer.serialize(begin);
        }),
      };
    });

    prisma.$disconnect();

    return results;
  } catch (e) {
    console.log(e);
    return null;
  }
}
