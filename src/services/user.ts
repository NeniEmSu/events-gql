import { GetAllUsersFilters } from "../dal/types";
import * as userDal from "../dal/user";
import { UserInput, UserOutput } from "../models/user";

export const create = (payload: UserInput): Promise<UserOutput> => {
  return userDal.create(payload);
};

export const getByUsername = (username: string): Promise<UserOutput> => {
  return userDal.getByUsername(username);
};

export const getById = (id: string): Promise<UserOutput> => {
  return userDal.getById(id)
}

export const deleteById = (id: string): Promise<boolean> => {
  return userDal.deleteById(id);
};

export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
  return userDal.getAll(filters);
};
