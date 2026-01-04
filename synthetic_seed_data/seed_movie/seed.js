const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../../apps/movie-service/generated/prisma');
const prisma = new PrismaClient();

/**
 * Movie Service Seed Script
 *
 * This script seeds the movie-service database with:
 * - Genres (film categories)
 * - Movies (with all required fields)
 * - MovieReleases (release dates for each movie)
 * - MovieGenres (many-to-many relation between movies and genres)
 *
 * Dependencies:
 * - None - this seed should run FIRST before cinema and booking seeds
 *
 * Schema Alignment:
 * - All Movie fields are populated per schema requirements
 * - Enum values: ageRating (P, K, T13, T16, T18, C), languageType (ORIGINAL, SUBTITLE, DUBBED)
 * - MovieRelease requires startDate, endDate is optional
 *
 * Note: This creates MovieReleases which are REQUIRED by cinema-service Showtimes
 */

/**
 * Maps TMDB genre IDs to Vietnamese genre names
 */
function getGenreNameById(id) {
  const map = {
    28: 'Phim Hành Động',
    12: 'Phim Phiêu Lưu',
    16: 'Phim Hoạt Hình',
    35: 'Phim Hài',
    80: 'Phim Hình Sự',
    99: 'Phim Tài Liệu',
    18: 'Phim Chính Kịch',
    10751: 'Phim Gia Đình',
    14: 'Phim Giả Tượng',
    36: 'Phim Lịch Sử',
    27: 'Phim Kinh Dị',
    10402: 'Phim Nhạc',
    9648: 'Phim Bí Ẩn',
    10749: 'Phim Lãng Mạn',
    878: 'Phim Khoa Học Viễn Tưởng',
    10770: 'Chương Trình Truyền Hình',
    53: 'Phim Gây Cấn',
    10752: 'Phim Chiến Tranh',
    37: 'Phim Miền Tây',
  };
  return map[id] || 'Unknown';
}

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('🎬 Starting Movie Service seed...');
  console.log('📋 Schema-aligned version with proper relations\n');

  // Clean existing data in correct order (respecting foreign keys)
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.movieGenre.deleteMany(),
    prisma.movieRelease.deleteMany(),
    prisma.genre.deleteMany(),
    prisma.movie.deleteMany(),
  ]);

  console.log('✅ Cleaned existing data');

  // ===========================
  // PHASE 1: Create Genres
  // ===========================
  console.log('\n🎭 Phase 1: Seeding genres...');

  const genreMap = {};
  for (const g of data.genres) {
    try {
      // Create genre (or skip if exists)
      const genre = await prisma.genre.create({
        data: { name: g.name },
      });
      genreMap[g.name] = genre;
    } catch {
      // If unique constraint violation, find existing
      const existingGenre = await prisma.genre.findFirst({
        where: { name: g.name },
      });
      if (existingGenre) {
        genreMap[g.name] = existingGenre;
      }
    }
  }

  console.log(`✅ Created ${Object.keys(genreMap).length} genres`);

  // ===========================
  // PHASE 2: Create Movies with Relations
  // ===========================
  console.log('\n🎬 Phase 2: Seeding movies with releases and genres...');

  for (const m of data.movies) {
    try {
      // Build genre connections
      const genreConnects = [];
      for (const g of m.genres || []) {
        const genreName = getGenreNameById(g.id);
        const genre = genreMap[genreName];
        if (genre) {
          genreConnects.push({ genre: { connect: { id: genre.id } } });
        }
      }

      // Build release dates (CRITICAL: these are needed for Showtimes)
      const releaseDates = (m.release_dates || []).map((r) => ({
        startDate: new Date(r),
      }));

      // Ensure at least one release if none provided
      if (releaseDates.length === 0 && m.release_date) {
        releaseDates.push({ startDate: new Date(m.release_date) });
      }

      // Handle backdrop URL - data already contains full URLs, don't add prefix again
      let backdropUrl = '';
      if (m.backdrop_path) {
        // Check if it's already a full URL
        if (m.backdrop_path.startsWith('http')) {
          backdropUrl = m.backdrop_path;
        } else {
          backdropUrl = `https://image.tmdb.org/t/p/original${m.backdrop_path}`;
        }
      }

      const movie = await prisma.movie.create({
        data: {
          title: m.title,
          originalTitle: m.original_title ?? m.title,
          overview: m.overview ?? '',
          posterUrl: m.poster_path ?? '',
          trailerUrl: m.trailerUrl ?? '',
          backdropUrl: backdropUrl,
          runtime: m.runtime ?? 120,
          releaseDate: new Date(m.release_date),
          ageRating: 'P', // Default to P (General Audiences)
          originalLanguage: m.original_language ?? 'en',
          spokenLanguages: Array.isArray(m.spoken_languages)
            ? m.spoken_languages
            : [m.spoken_languages || m.original_language || 'en'],
          productionCountry: m.production_countries ?? 'Unknown',
          languageType: 'SUBTITLE', // Default to subtitled
          director: m.director ?? 'Unknown',
          cast: m.cast ?? [],
          movieReleases: {
            create: releaseDates,
          },
          movieGenres: {
            create: genreConnects,
          },
        },
      });

      console.log(
        `   ✅ Seeded: ${movie.title} (${releaseDates.length} releases, ${genreConnects.length} genres)`
      );
    } catch (error) {
      console.error(
        `   ❌ Failed to seed movie "${m.title}": ${error.message}`
      );
    }
  }

  // ===========================
  // Summary
  // ===========================
  console.log('\n📊 =============== SEED SUMMARY ===============');
  const genreCount = await prisma.genre.count();
  const totalMovies = await prisma.movie.count();
  const totalReleases = await prisma.movieRelease.count();
  const totalGenreLinks = await prisma.movieGenre.count();

  console.log(`🎭 Genres: ${genreCount}`);
  console.log(`🎬 Movies: ${totalMovies}`);
  console.log(`📅 Movie Releases: ${totalReleases}`);
  console.log(`🔗 Genre Links: ${totalGenreLinks}`);
  console.log('==============================================\n');

  console.log('🎉 Movie Service seed completed successfully!');
  console.log(
    'ℹ️  Next: Run seed_cinema to create showtimes using these movies'
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Movie Service seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
