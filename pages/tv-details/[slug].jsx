import Banner from "@/components/TvDetails/Banner";
import CastList from "@/components/TvDetails/CastList";
import Comments from "@/components/TvDetails/Comments";
import Trailer from "@/components/TvDetails/Trailer";
import axios from "axios";
import React from "react";

const TvDetails = ({ tv, cast, video }) => {
  return (
    <div className=" ">
      <div className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-[-1] w-[80vh] aspect-square rounded-full blur-[150px] bg-mainWhite/50"></div>
      <Banner video={video} tv={tv} cast={cast} />
      <CastList cast={cast} />
      <Trailer video={video} cast={cast} />
      <Comments />
    </div>
  );
};

export default TvDetails;

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;
  const id = slug.split("-")[0];
  try {
    const populatedMovieRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    const castAndCrewRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const videoRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    return {
      props: {
        tv: populatedMovieRes?.data,
        cast: castAndCrewRes?.data,
        video: videoRes?.data?.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        tv: [],
        cast: [],
        video: [],
      },
    };
  }
};
