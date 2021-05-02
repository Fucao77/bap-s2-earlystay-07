import { PrismaClient } from '.prisma/client';

import { RANGES_DAY } from '../constants/travels';
import { serializeDateInObject } from '../utils/serializer';

/**
 * Get travels according some filters
 *
 * @param {{searchValue: string, departureDate: string, duration: number, theme: string, page: number, take: number}} param0
 * @returns
 */
export async function searchTravels({
  searchValue,
  departureDate,
  // duration,
  theme,
  page = 0,
  take = 10,
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
      select: {
        name: true,
        with_delivery: true,
        interne_to: true,
        small_picto: true,
        catch_phrase: true,
        travels: {
          select: {
            travel_items: {
              select: {
                price_value: true,
                reservation_data: {
                  select: {
                    duration_day: true,
                  },
                },
              },
            },
          },
        },
      },
      take,
      skip: page * take,
    }),
  ]);

  if (!results[1]) return null;
  console.log(results);
  results[1].map((res) => ({
    ...res,
    travels: res.travels.map((res) => {
      return {
        ...res,
        air_type_begins: res.travel_items.map((begin) => {
          return serializeDateInObject(begin);
        }),
      };
    }),
  }));

  prisma.$disconnect();

  return { pageNumber: Math.ceil(results[0] / take), results: results[1] };
}

/**
 * Get one travel accoding its id
 *
 * @param {string | number} id
 * @returns
 */
export async function getTravelById(id) {
  const prisma = new PrismaClient();

  try {
    const results = await prisma.products.findUnique({
      where: {
        interne_to: id,
      },
      select: {
        name: true,
        with_delivery: true,
        interne_to: true,
        big_picto: true,
        catch_phrase: true,
        travels: {
          select: {
            from_ref: true,
            to_ref: true,
            travel_items: {
              select: {
                between_begin: true,
                price_value: true,
                person_quantity_max: true,
                person_quantity_min: true,
                child_quantity_max: true,
                child_quantity_min: true,
                infant_quantity_max: true,
                infant_quantity_min: true,
                adult_quantity_max: true,
                adult_quantity_min: true,
                reservation_data: {
                  select: {
                    duration_day: true,
                    meal_plan: true,
                  },
                },
              },
            },
          },
        },
        options: {
          select: {
            images: true,
            title: true,
            text: true,
          },
        },
      },
    });

    if (!results) return null;

    results.travels.map((res) => {
      return {
        ...res,
        air_type_begins: res.travel_items.map((begin) => {
          return serializeDateInObject(begin);
        }),
      };
    });

    prisma.$disconnect();

    return results;
  } catch (e) {
    console.log(e);
    prisma.$disconnect();
    return null;
  }
}
