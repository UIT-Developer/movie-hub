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
    GET_SHOWTIME: 'cinema.showtime',
  },
  SHOWTIME: {
    GET_SHOWTIME_SEATS: 'showtime.get_showtime_seats',
    GET_SEATS_HELD_BY_USER: 'showtime.get_seats_held_by_user',
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
