export interface MovieReleaseResponse {
  id: string;
  movieId: string;
  startDate: Date;
  endDate?: Date | null;
  note?: string | null;
}
