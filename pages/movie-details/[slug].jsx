import Banner from "@/components/MovieDetails/Banner";
import CastList from "@/components/MovieDetails/CastList";
import Comments from "@/components/MovieDetails/Comments";
import Trailer from "@/components/MovieDetails/Trailer";
import axios from "axios";
import React from "react";

const MovieDetails = ({ movie, cast, video }) => {
  return (
    <div className=" ">
      <div className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-[-1] w-[80vh] aspect-square rounded-full blur-[150px] bg-mainWhite/50"></div>
      <Banner video={video} movie={movie} cast={cast} />

      <CastList cast={cast} />
      <Trailer video={video} cast={cast} />
      <Comments />
    </div>
  );
};

export default MovieDetails;

export const getServerSideProps = async (context) => {
  try {
    const populatedMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${context.query.slug}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    const castAndCrewRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${context.query.slug}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const videoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${context.query.slug}/videos?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    return {
      props: {
        movie: populatedMovieRes?.data,
        cast: castAndCrewRes?.data,
        video: videoRes?.data?.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        movie: [],
        cast: [],
        video: [],
      },
    };
  }
};
