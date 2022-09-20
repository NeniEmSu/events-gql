import db from "../models";
import { EventInput, EventOutput } from "../models/event";
import { GetAllEventsFilters } from "./types";

export const create = async (payload: EventInput): Promise<EventOutput> => {
  const user = await db.Event.create(payload);
  return user;
};

export const getAll = async (
  filters?: GetAllEventsFilters
): Promise<EventOutput[]> => {
  return db.Event.findAll({
    attributes: {
      exclude: filters?.isNotAdmin && ['capacity']
    }
  });
};
