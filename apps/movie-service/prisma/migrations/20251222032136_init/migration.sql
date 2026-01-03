-- CreateEnum
CREATE TYPE "public"."LanguageOption" AS ENUM ('ORIGINAL', 'SUBTITLE', 'DUBBED');

-- CreateEnum
CREATE TYPE "public"."Format" AS ENUM ('TWO_D', 'THREE_D', 'IMAX', 'FOUR_DX');

-- CreateEnum
CREATE TYPE "public"."AgeRating" AS ENUM ('P', 'K', 'T13', 'T16', 'T18', 'C');

-- CreateTable
CREATE TABLE "public"."movies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_url" TEXT NOT NULL,
    "trailer_url" TEXT NOT NULL,
    "backdrop_url" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "release_date" DATE NOT NULL,
    "age_rating" "public"."AgeRating" NOT NULL,
    "original_language" TEXT NOT NULL,
    "spoken_languages" TEXT[],
    "production_country" TEXT NOT NULL,
    "language_type" "public"."LanguageOption" NOT NULL,
    "director" TEXT NOT NULL,
    "cast" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."movie_releases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "movie_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "note" TEXT,

    CONSTRAINT "movie_releases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."genres" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."movie_genres" (
    "movie_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_genres_pkey" PRIMARY KEY ("movie_id","genre_id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "movie_id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genres_id_key" ON "public"."genres"("id");

-- CreateIndex
CREATE INDEX "movie_genres_movie_id_idx" ON "public"."movie_genres"("movie_id");

-- CreateIndex
CREATE INDEX "movie_genres_genre_id_idx" ON "public"."movie_genres"("genre_id");

-- CreateIndex
CREATE INDEX "reviews_movie_id_idx" ON "public"."reviews"("movie_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "public"."reviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_movie_id_user_id_key" ON "public"."reviews"("movie_id", "user_id");

-- AddForeignKey
ALTER TABLE "public"."movie_releases" ADD CONSTRAINT "movie_releases_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movie_genres" ADD CONSTRAINT "movie_genres_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movie_genres" ADD CONSTRAINT "movie_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
