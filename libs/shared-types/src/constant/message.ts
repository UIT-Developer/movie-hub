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
    GET_LIST_RELEASE: 'movie.release.list',
    GET_LIST_BY_ID: 'movie.list.by-id',
  },
  MOVIE_RELEASE: {
    CREATED: 'movie.release.created',
    UPDATED: 'movie.release.updated',
    DELETED: 'movie.release.deleted',
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
  MOVIE: {
    GET_MOVIES_BY_CINEMA: 'cinema.movies_by_cinema',
    GET_ALL_MOVIES_AT_CINEMAS: 'cinema.all_movies_at_cinemas',
  },
  CINEMA: {
    CREATE: 'cinema.create',
    UPDATE: 'cinema.update',
    DELETE: 'cinema.delete',
    GET_SHOWTIME: 'cinema.showtime',
    ADMIN_GET_SHOWTIME: 'cinema.admin_showtime',
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
    CREATE_SHOWTIME: 'showtime.create_showtime',
    BATCH_CREATE_SHOWTIMES: 'showtime.batch_create_showtimes',
    UPDATE_SHOWTIME: 'showtime.update_showtime',
    DELETE_SHOWTIME: 'showtime.delete_showtime',
    GET_SHOWTIME_SEATS: 'showtime.get_showtime_seats',
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
