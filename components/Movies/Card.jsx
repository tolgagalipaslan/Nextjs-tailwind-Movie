import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Card = ({ movie }) => {
  return (
    <Link
      href={`/movie-details/${movie.id}-${movie?.title
        ?.toLowerCase()
        .replace(/ /g, "-")}`}
      className="w-full flex items-center sm:items-start flex-row sm:flex-col  rounded sm:rounded-xl overflow-hidden h-full bg-cover bg-mainBlack2"
    >
      <div className="relative h-[150px] sm:w-full aspect-[9/12] sm:aspect-[9/13] ">
        <Image
          src={`${
            movie?.backdrop_path
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.backdrop_path}`
              : movie?.poster_path
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`
              : "/assets/default-img.png"
          }`}
          alt=""
          fill
          className="bg-[url(/assets/logo1.png)] bg-white bg-center object-center object-cover bg-cover bg-no-repeat"
        />
        <CircularProgressbar
          styles={buildStyles({
            textColor:
              movie?.vote_average > 7
                ? "#21d07a"
                : movie?.vote_average > 4
                ? "#d2d531"
                : movie?.vote_average === 0
                ? "#838383"
                : "#db2360 ",
            pathColor:
              movie?.vote_average > 7
                ? "#21d07a"
                : movie?.vote_average > 4
                ? "#d2d531"
                : movie?.vote_average === 0
                ? "#838383"
                : "#db2360 ",
            trailColor:
              movie?.vote_average > 7
                ? "#204529"
                : movie?.vote_average > 4
                ? "#423d0f"
                : movie?.vote_average === 0
                ? "#838383"
                : "#571435 ",
          })}
          className="w-14 h-14  items-center justify-center bg-mainBlack2 p-1 rounded-full font-semibold hidden sm:flex absolute -bottom-7 right-3 z-20"
          value={movie?.vote_average * 10}
          text={`${(movie?.vote_average * 10).toString()?.slice(0, 5)}%`}
        />
      </div>

      <div className=" p-5 pt-8 flex flex-col gap-1 text-white">
        <div className="font-semibold line-clamp-1">{movie?.title}</div>
        <div className="text-mainWhite/60">{movie?.release_date}</div>

        <div className="text-mainWhite sm:hidden line-clamp-2">
          {movie?.overview}
        </div>
      </div>
    </Link>
  );
};

export default Card;
