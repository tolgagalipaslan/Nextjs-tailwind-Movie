import ArtistList from "@/components/Home/ArtistList";
import Banner from "@/components/Home/Banner";
import PopularMovies from "@/components/Home/PopularMovies";
import PopularTv from "@/components/Home/PopularTv";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

const Home = ({ artist, movies, castAndCrew, castAndCrewTvRes, tv }) => {
  return (
    <div className=" ">
      <Head>
        <link rel="icon" href="/assets/logo1.png" />
        <title>Ofenos Movies</title>
      </Head>
      <div className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-[-1] w-[80vh] aspect-square rounded-full blur-[150px] bg-mainWhite/50"></div>
      <Banner />

      <div className="flex flex-col pb-10">
        <ArtistList artist={artist} />
        <PopularMovies movies={movies} castAndCrew={castAndCrew} />
        <PopularTv tv={tv} castAndCrewTvRes={castAndCrewTvRes} />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const artistRes = await axios.get(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    const populatedMovieRes = await Promise.all(
      movieRes?.data?.results.map(async (element) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${element?.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );

        return res?.data;
      })
    );

    const castAndCrewRes = await Promise.all(
      movieRes?.data?.results.map(async (element) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${element?.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );

        return res?.data;
      })
    );

    const tvRes = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    const populatedTvRes = await Promise.all(
      tvRes?.data?.results.map(async (element) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${element?.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );

        return res?.data;
      })
    );
    const castAndCrewTvRes = await Promise.all(
      tvRes?.data?.results.map(async (element) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${element?.id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );

        return res?.data;
      })
    );

    return {
      props: {
        artist: artistRes?.data?.results,
        movies: populatedMovieRes,
        castAndCrew: castAndCrewRes,
        tv: tvRes?.data?.results,
        populatedTvRes: populatedTvRes,
        castAndCrewTvRes: castAndCrewTvRes,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        artist: [],
        movies: [],
        castAndCrewRes: [],
        tv: [],
        populatedTvRes: [],
        castAndCrewTvRes: [],
      },
    };
  }
};

export default Home;
