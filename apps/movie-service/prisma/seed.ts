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
  // Create Movies
  const movies = [
    {
      title: 'Avengers: Endgame',
      originalTitle: 'Avengers: Endgame',
      overview:
        "After the devastating events of Avengers: Infinity War, the remaining Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
      posterUrl:
        'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
      runtime: 181,
      releaseDate: new Date('2019-04-24'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Anthony Russo, Joe Russo',
      cast: [
        { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man' },
        { name: 'Chris Evans', character: 'Steve Rogers / Captain America' },
        {
          name: 'Scarlett Johansson',
          character: 'Natasha Romanoff / Black Widow',
        },
      ],
      genreIds: [genres[0].id, genres[1].id, genres[5].id], // Action, Adventure, Sci-Fi
    },
    {
      title: 'The Batman',
      originalTitle: 'The Batman',
      overview:
        'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while hunting a sadistic serial killer known as the Riddler.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/gG9fTyDL03fiKnOpf2tr01sncnt.jpg',
      runtime: 176,
      releaseDate: new Date('2022-03-01'),
      ageRating: AgeRating.T16,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
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
      overview:
        "After Peter Parker's identity is revealed, he asks Doctor Strange for help, but the spell goes wrong and opens the multiverse, bringing villains from other realities.",
      posterUrl:
        'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
      runtime: 148,
      releaseDate: new Date('2021-12-15'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
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
      overview:
        'A Vietnamese romantic drama about a massage therapist whose life changes after she becomes entangled in the dangerous world of a mysterious customer.',
      // TODO: thay bằng poster chính thức khi bạn có URL ảnh thật
      posterUrl: 'https://example.com/mai-poster.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=example',
      backdropUrl: 'https://example.com/mai-backdrop.jpg',
      runtime: 131,
      releaseDate: new Date('2024-02-10'),
      ageRating: AgeRating.T18,
      originalLanguage: 'vi',
      spokenLanguages: ['vi'],
      productionCountry: 'Vietnam',
      languageType: LanguageOption.ORIGINAL,
      director: 'Trấn Thành',
      cast: [
        { name: 'Phương Anh Đào', character: 'Mai' },
        { name: 'Tuấn Trần', character: 'Dương' },
      ],
      genreIds: [genres[3].id, genres[7].id], // Drama, Romance
    },

    // ====== MOVIES MỚI – DÙNG ẢNH THẬT TỪ TMDB ======

    {
      title: 'Inception',
      originalTitle: 'Inception',
      overview:
        'A skilled thief who steals secrets through dream-sharing technology is given a chance at redemption if he can successfully plant an idea into a target’s subconscious.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
      runtime: 148,
      releaseDate: new Date('2010-07-16'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Christopher Nolan',
      cast: [
        { name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
        { name: 'Joseph Gordon-Levitt', character: 'Arthur' },
        { name: 'Elliot Page', character: 'Ariadne' },
      ],
      genreIds: [genres[0].id, genres[5].id, genres[6].id], // Action, Sci-Fi, Thriller
    },
    {
      title: 'Interstellar',
      originalTitle: 'Interstellar',
      overview:
        'A team of explorers travels through a wormhole in space in an attempt to ensure humanity’s survival as Earth becomes uninhabitable.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
      // dùng lại poster làm backdrop tạm để tránh 404
      backdropUrl:
        'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      runtime: 169,
      releaseDate: new Date('2014-11-07'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Christopher Nolan',
      cast: [
        { name: 'Matthew McConaughey', character: 'Cooper' },
        { name: 'Anne Hathaway', character: 'Brand' },
        { name: 'Jessica Chastain', character: 'Murph' },
      ],
      genreIds: [genres[5].id, genres[3].id, genres[1].id], // Sci-Fi, Drama, Adventure
    },
    {
      title: 'Joker',
      originalTitle: 'Joker',
      overview:
        'A mentally troubled stand-up comedian slowly descends into madness and becomes the infamous criminal known as the Joker in a gritty reimagining of the character.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      runtime: 122,
      releaseDate: new Date('2019-10-04'),
      ageRating: AgeRating.T18,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Todd Phillips',
      cast: [
        { name: 'Joaquin Phoenix', character: 'Arthur Fleck / Joker' },
        { name: 'Robert De Niro', character: 'Murray Franklin' },
        { name: 'Zazie Beetz', character: 'Sophie Dumond' },
      ],
      genreIds: [genres[3].id, genres[6].id], // Drama, Thriller
    },
    {
      title: 'Zootopia',
      originalTitle: 'Zootopia',
      overview:
        'In a city of anthropomorphic animals, a rookie bunny cop and a cynical fox con artist must work together to uncover a conspiracy.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=jWM0ct-OLsM',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg',
      runtime: 108,
      releaseDate: new Date('2016-03-04'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Byron Howard, Rich Moore',
      cast: [
        { name: 'Ginnifer Goodwin', character: 'Judy Hopps (voice)' },
        { name: 'Jason Bateman', character: 'Nick Wilde (voice)' },
        { name: 'Idris Elba', character: 'Chief Bogo (voice)' },
      ],
      genreIds: [genres[8].id, genres[2].id, genres[1].id], // Animation, Comedy, Adventure
    },
    {
      title: 'Inside Out',
      originalTitle: 'Inside Out',
      overview:
        'Growing up can be a bumpy road, and it is no exception for Riley, who is guided by her five core emotions as her family moves to a new city.',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/aAmfIX3TT40zUHGcCKrlOZRKC7u.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=yRUAzGQ3nSY',
      backdropUrl:
        'https://image.tmdb.org/t/p/original/aAmfIX3TT40zUHGcCKrlOZRKC7u.jpg',
      runtime: 95,
      releaseDate: new Date('2015-06-19'),
      ageRating: AgeRating.T13,
      originalLanguage: 'en',
      spokenLanguages: ['en'],
      productionCountry: 'United States',
      languageType: LanguageOption.SUBTITLE,
      director: 'Pete Docter, Ronnie Del Carmen',
      cast: [
        { name: 'Amy Poehler', character: 'Joy (voice)' },
        { name: 'Phyllis Smith', character: 'Sadness (voice)' },
        { name: 'Bill Hader', character: 'Fear (voice)' },
      ],
      genreIds: [genres[8].id, genres[2].id, genres[3].id], // Animation, Comedy, Drama
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
        endDate: new Date(
          new Date(movieInfo.releaseDate).getTime() + 90 * 24 * 60 * 60 * 1000
        ), // 90 days
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
