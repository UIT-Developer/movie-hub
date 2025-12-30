import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { PrismaClient, AgeRating, LanguageOption } from '../generated/prisma';

const prisma = new PrismaClient();

type RawMovie = {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  runtime?: number;
  release_date?: string;
  release_dates?: string[];
  original_language?: string;
  spoken_languages?: string;
  production_countries?: string;
  trailerUrl?: string;
  director?: string;
  cast?: { name: string; profileUrl?: string }[];
  genres?: { id: number; name: string }[];
};

const toUuid = (seed: string) => {
  const h = createHash('md5').update(seed).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};

const parseDate = (value?: string): Date | null => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const normalizeLanguages = (value?: string): string[] => {
  if (!value) return [];
  return value
    .split(/[\\/,|]/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const inferAgeRating = (genreNames: string[]): AgeRating => {
  const lower = genreNames.map((g) => g.toLowerCase());
  if (lower.some((g) => g.includes('kinh dị') || g.includes('horror'))) return AgeRating.T18;
  if (lower.some((g) => g.includes('hoạt hình') || g.includes('gia đình'))) return AgeRating.P;
  return AgeRating.T13;
};

const inferLanguageType = (originalLanguage?: string): LanguageOption => {
  return originalLanguage?.toLowerCase() === 'vi' ? LanguageOption.ORIGINAL : LanguageOption.SUBTITLE;
};

const loadMovies = (): RawMovie[] => {
  const dataPath = path.join(__dirname, 'data.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(raw);
  return parsed.movies ?? [];
};

async function main() {
  console.log('🌱 Seeding Movie Service database from TMDB snapshot (data.json)...');

  await prisma.review.deleteMany();
  await prisma.movieGenre.deleteMany();
  await prisma.movieRelease.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.genre.deleteMany();

  const moviesRaw = loadMovies();

  const allGenreNames = Array.from(
    new Set(
      moviesRaw.flatMap((m) => (m.genres ?? []).map((g) => g.name).filter(Boolean))
    )
  );

  const genres = await Promise.all(allGenreNames.map((name) => prisma.genre.create({ data: { name } })));
  const genreByName = Object.fromEntries(genres.map((g) => [g.name, g.id]));

  for (const m of moviesRaw) {
    const genreNames = (m.genres ?? []).map((g) => g.name).filter(Boolean);

    const movieId = toUuid(`movie-${m.id}`);
    const releaseId = toUuid(`release-${m.id}`);

    const parsedReleaseDate = parseDate(m.release_date);
    const releaseDate = parsedReleaseDate ?? parseDate(m.release_dates?.[0]) ?? new Date();
    const releaseStart = parseDate(m.release_dates?.[0]) ?? releaseDate;
    const releaseEnd = parseDate(m.release_dates?.slice(-1)[0]);

    const spokenLanguages = normalizeLanguages(m.spoken_languages);
    if (!spokenLanguages.length && m.original_language) spokenLanguages.push(m.original_language);
    const cast = (m.cast ?? []).map((c) => ({
      name: c.name ?? 'N/A',
      profileUrl: c.profileUrl ?? '',
    }));

    const movie = await prisma.movie.create({
      data: {
        id: movieId,
        title: m.title,
        originalTitle: m.original_title ?? m.title,
        overview: m.overview || 'Đang cập nhật.',
        posterUrl: m.poster_path ?? '',
        trailerUrl: m.trailerUrl ?? '',
        backdropUrl: m.backdrop_path ?? '',
        runtime: m.runtime ?? 0,
        releaseDate,
        ageRating: inferAgeRating(genreNames),
        originalLanguage: m.original_language ?? '',
        spokenLanguages,
        productionCountry: m.production_countries ?? '',
        languageType: inferLanguageType(m.original_language),
        director: m.director ?? 'Đang cập nhật',
        cast,
      },
    });

    const genreIds = genreNames
      .map((name) => genreByName[name])
      .filter(Boolean);

    if (genreIds.length > 0) {
      await prisma.movieGenre.createMany({
        data: genreIds.map((genreId) => ({
          movieId: movie.id,
          genreId,
        })),
      });
    }

    await prisma.movieRelease.create({
      data: {
        id: releaseId,
        movieId: movie.id,
        startDate: releaseStart,
        endDate: releaseEnd ?? null,
        note: m.release_dates?.length ? `Lịch phát hành: ${m.release_dates.join(', ')}` : null,
      },
    });
  }

  console.log(`✅ Seeded ${moviesRaw.length} phim từ dữ liệu TMDB vào movies/movie_releases/movie_genres`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
