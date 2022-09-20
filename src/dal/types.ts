export interface GetAllUsersFilters {
  isDeleted?: boolean
  includeDeleted?: boolean
}

export interface GetAllEventsFilters {
  isNotAdmin?: boolean
}