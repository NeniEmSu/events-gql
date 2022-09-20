import * as eventDal from "../dal/event";
import { GetAllEventsFilters } from "../dal/types";
import { EventInput, EventOutput } from "../models/event";

export const create = (payload: EventInput): Promise<EventOutput> => {
  return eventDal.create(payload);
};

export const getAll = (filters: GetAllEventsFilters): Promise<EventOutput[]> => {
  return eventDal.getAll(filters);
};
