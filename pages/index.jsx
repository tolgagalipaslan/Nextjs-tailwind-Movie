import ArtistList from "@/components/Home/ArtistList";
import Banner from "@/components/Home/Banner";
import PopularMovies from "@/components/Home/PopularMovies";
import PopularTv from "@/components/Home/PopularTv";
import axios from "axios";
import Head from "next/head";

const Home = ({ artist, movies, tv }) => {
  return (
    <div className=" ">
      <Head>
        <title>Ofenos Movies</title>
      </Head>
      <div className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-[-1] w-[80vh] aspect-square rounded-full blur-[150px] bg-mainWhite/50"></div>
      <Banner />

      <div className="flex flex-col pb-10">
        <ArtistList artist={artist} />
        <PopularMovies movies={movies} />
        <PopularTv tv={tv} />
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

    const tvRes = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    return {
      props: {
        artist: artistRes?.data?.results,
        movies: movieRes?.data?.results,
        tv: tvRes?.data?.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        artist: [],
        movies: [],
        tv: [],
      },
    };
  }
};

export default Home;
