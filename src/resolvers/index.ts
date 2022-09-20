import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { EventOutput } from "../models/event";
import { UserOutput } from "../models/user";
import * as eventServices from "../services/event";
import * as userServices from "../services/user";
dotenv.config();

export const resolvers = {
  Query: {
    users: async (): Promise<UserOutput[]> =>
      await userServices.getAll({ isDeleted: false }),
    events: async (
      _: any,
      __: any,
      { req }: any
    ): Promise<EventOutput[] | null> => {
      const userID = req.userId;
      let user;

      if (userID) {
        user = await userServices.getById(userID);
      }

      return await eventServices.getAll({
        isNotAdmin: user?.scope !== "admin",
      });
    },
  },
  Mutation: {
    login: async (_: any, { username, password }: any, { res }: any) => {
      const user = await userServices.getByUsername(username);

      if (!user) {
        throw new Error('No such user exists')
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Invalid credentials')
      }

      const refreshToken = sign(
        {
          userId: user.id,
          count: user.count,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: "7d",
        }
      );

      const accessToken = sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "15min",
        }
      );

      res.cookie("refresh-token", refreshToken);
      res.cookie("access-token", accessToken);

      return accessToken;
    },
  },
};
