import { User } from '@/interfaces/users.interface';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';

export const getAllowedCategoryIds = async (user: User): Promise<number[]> => {
  if (user.isExternal) {
    if (!user.externalUserId) {
      return [];
    }

    const externalUser = await prisma.externalUser.findFirst({
      where: { id: user.externalUserId },
      select: {
        categories: {
          select: {
            categoryId: true,
          },
        },
      },
    });

    return externalUser?.categories.map((category) => category.categoryId) ?? [];
  }

  const groups = (user.groups ?? []).map((group) => group.toLowerCase().trim()).filter(Boolean);

  const categories = await prisma.category.findMany({
    where: {
      OR: [
        {
          adGroups: {
            none: {},
          },
        },
        ...(groups.length > 0
          ? [
              {
                adGroups: {
                  some: {
                    value: {
                      in: groups,
                    },
                  },
                },
              },
            ]
          : []),
      ],
    },
    select: {
      id: true,
    },
  });

  return categories.map((category) => category.id);
};

export const getAllowedCategoryWhere = async (user: User): Promise<Prisma.CategoryWhereInput> => {
  const categoryIds = await getAllowedCategoryIds(user);

  return {
    id: {
      in: categoryIds,
    },
  };
};

export const getAllowedScenarioWhere = async (user: User): Promise<Prisma.ScenarioWhereInput> => {
  const categoryIds = await getAllowedCategoryIds(user);

  return {
    categoryId: {
      in: categoryIds,
    },
  };
};
