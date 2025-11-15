export const UserMessage = {
  GET_PERMISSIONS: 'user.getPermissions',
  GET_USERS: 'user.getAll',
};

export const MovieServiceMessage = {
  MOVIE: {
    GET_LIST: 'movie.list',
    CREATED: 'movie.created',
    UPDATED: 'movie.updated',
    GET_DETAIL: 'movie.detail',
    DELETED: 'movie.deleted',
  },
  GENRE: {
    GET_LIST: 'genre.list',
    GET_DETAIL: 'genre.detail',
    CREATED: 'genre.created',
    UPDATED: 'genre.updated',
    DELETED: 'genre.deleted',
  },
};

export const CinemaMessage = {
  GET_CINEMAS: 'cinema.getAll',
  CINEMA: {
    CREATE: 'cinema.create',
    UPDATE: 'cinema.update',
    DELETE: 'cinema.delete',
    GET_SHOWTIME: 'cinema.showtime',
  },
  HALL: {
    GET_DETAIL: 'hall.get_detail',
    GET_BY_CINEMA: 'hall.get_by_cinema',
    CREATE: 'hall.create',
    UPDATE: 'hall.update',
    DELETE: 'hall.delete',
    UPDATE_SEAT_STATUS: 'cinema.update_seat_status',
  },
  SHOWTIME: {
    GET_SHOWTIME_SEATS: 'showtime.get_showtime_seats',
    GET_SEATS_HELD_BY_USER: 'showtime.get_seats_held_by_user',
    GET_SESSION_TTL: 'showtime.get_session_ttl',
  },
  TICKET_PRICING: {
    GET_PRICING_FOR_HALL: 'ticket_pricing.get_pricing_for_hall',
    UPDATE_PRICING_OF_TICKET: 'ticket_pricing.update_ticket_pricing',
  },
  GET_CINEMAS_NEARBY: 'CINEMA.GET_CINEMAS_NEARBY',
  GET_CINEMAS_WITH_FILTERS: 'CINEMA.GET_CINEMAS_WITH_FILTERS',
  GET_CINEMA_DETAIL: 'CINEMA.GET_CINEMA_DETAIL',
  SEARCH_CINEMAS: 'CINEMA.SEARCH_CINEMAS',
  GET_AVAILABLE_CITIES: 'CINEMA.GET_AVAILABLE_CITIES',
  GET_AVAILABLE_DISTRICTS: 'CINEMA.GET_AVAILABLE_DISTRICTS',
};

export const BookingMessage = {
  CREATE: 'booking.create',
  FIND_ALL: 'booking.findAll',
  FIND_ONE: 'booking.findOne',
  CANCEL: 'booking.cancel',
  GET_SUMMARY: 'booking.getSummary',
};

export const ConcessionMessage = {
  FIND_ALL: 'concession.findAll',
  FIND_ONE: 'concession.findOne',
  CREATE: 'concession.create',
  UPDATE: 'concession.update',
  DELETE: 'concession.delete',
  UPDATE_INVENTORY: 'concession.updateInventory',
};

export const PromotionMessage = {
  FIND_ALL: 'promotion.findAll',
  FIND_ONE: 'promotion.findOne',
  FIND_BY_CODE: 'promotion.findByCode',
  VALIDATE: 'promotion.validate',
  CREATE: 'promotion.create',
  UPDATE: 'promotion.update',
  DELETE: 'promotion.delete',
  TOGGLE_ACTIVE: 'promotion.toggleActive',
};
