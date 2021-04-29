import { PrismaClient } from '.prisma/client';
import { RANGES_DAY } from '../constants/travels';
import { ObjectSerializer } from '../utils/serializer';

export async function searchTravels({
  searchValue,
  departureDate,
  // duration,
  theme,
  page = 0,
  take = 20,
}) {
  const prisma = new PrismaClient();
  const queryArgs = {
    where: {
      travels: {
        some: {},
      },
    },
  };

  if (searchValue) {
    queryArgs.where.name = {
      contains: searchValue,
    };
  }

  if (departureDate) {
    const baseDate = new Date(Number(departureDate));
    baseDate.setUTCHours(0);

    const extremDate = new Date(Number(departureDate));
    extremDate.setUTCDate(extremDate.getUTCDate() + RANGES_DAY.travelDate);

    queryArgs.where.travels.some.travel_items = {
      some: {
        AND: [
          {
            between_begin: {
              gte: baseDate,
              lte: extremDate,
            },
          },
        ],
      },
    };
  }

  if (theme) {
    queryArgs.where.theme_ceto = theme;
  }

  // if (duration) {
  //     queryArgs.where.travels.some.travel_items = {
  //       some : {
  //         reservation_data : {
  //           is : {
  //             duration_day : {
  //                gte: duration,
  //                lte: duration + RANGES_DAY.travelDuration
  //              }
  //           }
  //         }
  //       }
  //     }
  // }

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
