import { Op } from "sequelize";
import db from "../models";
import { UserInput, UserOutput } from "../models/user";
import { GetAllUsersFilters } from "./types";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await db.User.create(payload);
  return user;
};

export const getById = async (id: string): Promise<UserOutput> => {
  const user = await db.User.findByPk(id)
  if (!user) {
      // @todo throw custom error
      throw new Error('not found')
  }
  return user
}

export const getByUsername = async (username: string): Promise<UserOutput> => {
  const user = await db.User.findOne({
    where: {
      username: username,
    },
    raw: true,
    attributes: {},
  });
  if (!user) {
    // @todo throw custom error
    throw new Error("not found");
  }
  return user;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedUserCount = await db.User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getAll = async (
  filters?: GetAllUsersFilters
): Promise<UserOutput[]> => {
  console.log(db.User);
  return db.User.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};
