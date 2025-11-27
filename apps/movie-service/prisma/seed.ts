import { PrismaClient, AgeRating, LanguageOption, Format } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Movie Service database...');

  // Clear existing data
  await prisma.movieGenre.deleteMany();
  await prisma.movieRelease.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.genre.deleteMany();

  // Create Genres
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Action' } }),
    prisma.genre.create({ data: { name: 'Adventure' } }),
    prisma.genre.create({ data: { name: 'Comedy' } }),
    prisma.genre.create({ data: { name: 'Drama' } }),
    prisma.genre.create({ data: { name: 'Horror' } }),
    prisma.genre.create({ data: { name: 'Sci-Fi' } }),
    prisma.genre.create({ data: { name: 'Thriller' } }),
    prisma.genre.create({ data: { name: 'Romance' } }),
    prisma.genre.create({ data: { name: 'Animation' } }),
    prisma.genre.create({ data: { name: 'Fantasy' } }),
  ]);

  console.log(`✅ Created ${genres.length} genres`);

  // Create Movies
  const movies = [
    {
      title: 'Avengers: Endgame',
      originalTitle: 'Avengers: Endgame',
      overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      backdropUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
      runtime: 181,
      releaseDate: new Date('2019-04-24'),
      ageRating: AgeRating.T13,
      originalLanguage: 'English',
      spokenLanguages: ['English'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Anthony Russo, Joe Russo',
      cast: [
        { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man' },
        { name: 'Chris Evans', character: 'Steve Rogers / Captain America' },
        { name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow' },
      ],
      genreIds: [genres[0].id, genres[1].id, genres[5].id], // Action, Adventure, Sci-Fi
    },
    {
      title: 'The Batman',
      originalTitle: 'The Batman',
      overview: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
      backdropUrl: 'https://image.tmdb.org/t/p/original/gG9fTyDL03fiKnOpf2tr01sncnt.jpg',
      runtime: 176,
      releaseDate: new Date('2022-03-01'),
      ageRating: AgeRating.T16,
      originalLanguage: 'English',
      spokenLanguages: ['English'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Matt Reeves',
      cast: [
        { name: 'Robert Pattinson', character: 'Bruce Wayne / Batman' },
        { name: 'Zoë Kravitz', character: 'Selina Kyle / Catwoman' },
        { name: 'Paul Dano', character: 'Edward Nashton / Riddler' },
      ],
      genreIds: [genres[0].id, genres[3].id, genres[6].id], // Action, Drama, Thriller
    },
    {
      title: 'Spider-Man: No Way Home',
      originalTitle: 'Spider-Man: No Way Home',
      overview: 'Peter Parker seeks Doctor Strange\'s help to make everyone forget his identity as Spider-Man, but the spell goes wrong and opens the multiverse.',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      backdropUrl: 'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
      runtime: 148,
      releaseDate: new Date('2021-12-15'),
      ageRating: AgeRating.T13,
      originalLanguage: 'English',
      spokenLanguages: ['English'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Jon Watts',
      cast: [
        { name: 'Tom Holland', character: 'Peter Parker / Spider-Man' },
        { name: 'Zendaya', character: 'MJ' },
        { name: 'Benedict Cumberbatch', character: 'Doctor Strange' },
      ],
      genreIds: [genres[0].id, genres[1].id, genres[5].id], // Action, Adventure, Sci-Fi
    },
    {
      title: 'Mai',
      originalTitle: 'Mai',
      overview: 'A Vietnamese romantic drama about a massage therapist who becomes entangled in the dangerous world of her mysterious customer.',
      posterUrl: 'https://example.com/mai-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=example',
      backdropUrl: 'https://example.com/mai-backdrop.jpg',
      runtime: 131,
      releaseDate: new Date('2024-02-10'),
      ageRating: AgeRating.T18,
      originalLanguage: 'Vietnamese',
      spokenLanguages: ['Vietnamese'],
      productionCountry: 'Vietnam',
      languageType: LanguageOption.ORIGINAL,
      director: 'Trấn Thành',
      cast: [
        { name: 'Phương Anh Đào', character: 'Mai' },
        { name: 'Tuấn Trần', character: 'Dương' },
      ],
      genreIds: [genres[3].id, genres[7].id], // Drama, Romance
    },
  ];

  for (const movieData of movies) {
    const { genreIds, ...movieInfo } = movieData;
    
    const movie = await prisma.movie.create({
      data: {
        ...movieInfo,
        cast: movieInfo.cast as any,
      },
    });

    // Create MovieGenre relations
    await Promise.all(
      genreIds.map((genreId) =>
        prisma.movieGenre.create({
          data: {
            movieId: movie.id,
            genreId: genreId,
          },
        })
      )
    );

    // Create MovieRelease
    await prisma.movieRelease.create({
      data: {
        movieId: movie.id,
        startDate: movieInfo.releaseDate,
        endDate: new Date(new Date(movieInfo.releaseDate).getTime() + 90 * 24 * 60 * 60 * 1000), // 90 days
        note: 'Theatrical release',
      },
    });
  }

  console.log(`✅ Created ${movies.length} movies with genres and releases`);
  console.log('🎉 Movie Service database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
