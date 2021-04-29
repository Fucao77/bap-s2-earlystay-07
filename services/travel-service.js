import { PrismaClient } from '.prisma/client';
import { ObjectSerializer } from '../utils/serializer';

export async function searchTravels({ searchValue, page = 0, take = 20 }) {
  const prisma = new PrismaClient();
  const queryArgs = {
    // skip :page * take,
    // take,
    where: {
      name: {
        contains: searchValue,
      },
      travels: {
        some: {},
      },
    },
  };

  const results = await prisma.$transaction([
    prisma.products.count(queryArgs),
    prisma.products.findMany({
      ...queryArgs,
      take,
      skip: page * take,
    }),
  ]);

  prisma.$disconnect();

  return { pageNumber: results[0], results: results[1] };
}

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
