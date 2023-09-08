import {
  Button,
  Collapse,
  DatePicker,
  Divider,
  Select,
  Slider,
  Space,
  Tooltip,
  message,
} from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWith";
import { Router, useRouter } from "next/router";
const Movies = ({ data }) => {
  const [movies, setMovies] = useState(data);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [lang, setLang] = useState("");

  const [avarageVote, setAvarageVote] = useState([0, 100]);

  const [genreList, setGenreList] = useState([]);
  const [hideLoadBtn, setHideLoadBtn] = useState(false);

  const router = useRouter();
  const movieGenres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];
  const handleAddGenreList = (id) => {
    if (genreList.find((i) => i.id === id)) {
      let list = genreList;
      const newList = list.filter((i) => i.id !== id);
      setGenreList(newList);
    } else {
      setGenreList([...genreList, { id: id }]);
    }
  };
  const marks = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
  };

  Router.events.on("routeChangeStart", () => {
    setMovies(data);
    setPage(1);
    setSort("popularity.desc");
    setLang("");
    setGenreList([]);
    setHideLoadBtn(false);
  });

  const handleFilterSearch = async () => {
    try {
      setPage(1);

      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_KEY
        }&page=${page}${sort ? `&sort_by=${sort}` : null}${
          genreList?.length !== 0
            ? `&with_genres=${genreList?.map((i) => `${i.id},`)}`
            : ""
        }${lang ? `&with_original_language=${lang}` : ""}`
      );

      // &vote_count.gte=${
      //   avarageVote[0]
      // }&vote_count.lte=${avarageVote[1]}
      setMovies(res?.data?.results);
      if (res?.data?.results?.length < 20) {
        setHideLoadBtn(true);
      } else {
        setHideLoadBtn(false);
      }
      window.scroll(0, 0);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleLoadMore = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_KEY
        }&page=${page + 1}${sort ? `&sort_by=${sort}` : null}${
          genreList?.length !== 0
            ? `&with_genres=${genreList?.map((i) => `${i.id},`)}`
            : ""
        }${lang ? `&with_original_language=${lang}` : ""}`
      );
      setPage(page + 1);

      setMovies([...movies, ...res?.data?.results]);
      if (res?.data?.results?.length < 20) {
        setHideLoadBtn(true);
      } else {
        setHideLoadBtn(false);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[url('/assets/auth-bg.jpg')] bg-fill pt-[65px] -mt-[65px]">
      <div className="container flex flex-col md:flex-row gap-5 min-h-screen pb-10">
        <div className="filters w-full md:w-[25%] flex flex-col gap-3">
          <Collapse
            className="select-none bg-mainBlack2 border-none shadow-none "
            items={[
              {
                key: "1",
                label: "Sort",
                children: (
                  <div className="flex flex-col gap-2">
                    Sort Results By
                    <Select
                      value={sort}
                      onChange={(e) => setSort(e)}
                      defaultValue="Popularity Descending"
                      options={[
                        {
                          value: "popularity.desc",
                          label: "Popularity Descending",
                        },
                        {
                          value: "popularity.asc",
                          label: "Popularity Ascending",
                        },
                        {
                          value: "vote_average.desc",
                          label: "Rating Descending",
                        },
                        {
                          value: "vote_average.asc",
                          label: "Rating Ascending",
                        },
                        {
                          value: "realse_date.desc",
                          label: "Release Date Descending",
                        },
                        {
                          value: "realse_date.asc",
                          label: "Release Date Ascending",
                        },
                        {
                          value: "original_title.asc",
                          label: "Title (A-Z)",
                        },
                      ]}
                    />
                  </div>
                ),
              },
            ]}
          />

          <Collapse
            className="select-none bg-mainBlack2 border-none shadow-none "
            items={[
              {
                key: "1",
                label: "Filters",
                children: (
                  <div className="flex flex-col gap-2 relative">
                    <div className="relative ">Genres</div>
                    <div className="flex flex-wrap gap-3">
                      {movieGenres?.map((genre, i) => (
                        <Button
                          key={i}
                          type="button"
                          onClick={() => handleAddGenreList(genre?.id)}
                          className={`bg-transparent border border-white border-solid  hover:bg-white hover:text-blue-500 duration-300 w-fit group-checked:bg-red-300 ${
                            genreList?.find((item) => item.id == genre?.id)
                              ? " bg-white text-blue-500 "
                              : " bg-transparent text-white"
                          }`}
                          shape="round"
                        >
                          {genre?.name}
                        </Button>
                      ))}
                    </div>
                    <div
                      className="-ml-[16px] my-3 h-[1px] bg-white"
                      style={{ width: "calc(100% + 32px)" }}
                    ></div>
                    <div className="flex items-center gap-2">
                      Language{" "}
                      <Tooltip
                        color="#1f1d26"
                        className="text-center  !bg-mainBlack2"
                        title="Filter items based on their original language."
                      >
                        <AiOutlineQuestionCircle className="text-lg" />
                      </Tooltip>
                    </div>
                    <Select
                      value={lang || "all"}
                      onChange={(e) => setLang(e)}
                      defaultValue="all"
                      options={[
                        { value: "all", label: "All" },
                        { value: "zh", label: "Chinese" },
                        { value: "es", label: "Spanish" },
                        { value: "en", label: "English" },
                        { value: "hi", label: "Hindi" },
                        { value: "ar", label: "Arabic" },
                        { value: "bn", label: "Bengali" },
                        { value: "pt", label: "Portuguese" },
                        { value: "ru", label: "Russian" },
                        { value: "ja", label: "Japanese" },
                        { value: "pa", label: "Punjabi" },
                        { value: "mr", label: "Marathi" },
                        { value: "de", label: "German" },
                        { value: "jv", label: "Javanese" },
                        { value: "te", label: "Telugu" },
                        { value: "fr", label: "French" },
                        { value: "vi", label: "Vietnamese" },
                        { value: "ko", label: "Korean" },
                        { value: "ta", label: "Tamil" },
                        { value: "ur", label: "Urdu" },
                        { value: "it", label: "Italian" },
                        { value: "tr", label: "Turkish" },
                        { value: "th", label: "Thai" },
                        { value: "gu", label: "Gujarati" },
                        { value: "fa", label: "Persian" },
                        { value: "pl", label: "Polish" },
                        { value: "uk", label: "Ukrainian" },
                        { value: "ro", label: "Romanian" },
                        { value: "ms", label: "Malay" },
                        { value: "uz", label: "Uzbek" },
                      ]}
                    />
                    <div
                      className="-ml-[16px] my-3 h-[1px] bg-white"
                      style={{ width: "calc(100% + 32px)" }}
                    ></div>
                    <div className="relative ">User Score</div>
                    <Slider
                      onChange={(e) => setAvarageVote([e[0] * 10, e[1] * 10])}
                      marks={marks}
                      min={1}
                      max={10}
                      range
                      className="rate-range"
                      defaultValue={[0, 10]}
                      railStyle={{
                        background: "#8184A4",
                      }}
                    />
                  </div>
                ),
              },
            ]}
          />
          <Button
            onClick={handleFilterSearch}
            className="bg-blue-400 sticky bottom-5 text-xl p-5 rounded-full flex items-center justify-center font-semibold text-white "
            type="button"
          >
            Search
          </Button>
        </div>
        <div className="w-full md:w-[75%] ">
          {movies?.length === 0 ? (
            <div className="flex h-full text-white items-center flex-col gap-3">
              <div className="w-[300px] relative h-[300px] ">
                <Image
                  className="object-contain"
                  fill
                  src={"/assets/sad1.png"}
                  alt=""
                ></Image>
              </div>
              <div>No items were found that match your query.</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 w-full sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-5">
              {movies?.map((movie, i) => (
                <Link
                  href={`/movie-details/${movie.id}-${movie?.title
                    ?.toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="w-full   rounded-xl overflow-hidden h-full bg-cover bg-mainBlack2"
                  key={i}
                >
                  <div className="relative w-full aspect-[9/13] ">
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
                      className="bg-[url(/assets/logo1.png)] bg-white bg-center bg-contain bg-no-repeat"
                    />
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor:
                          movie?.vote_average > 7
                            ? "#21d07a"
                            : movie?.vote_average > 4
                            ? "#d2d531"
                            : "#db2360 ",
                        pathColor:
                          movie?.vote_average > 7
                            ? "#21d07a"
                            : movie?.vote_average > 4
                            ? "#d2d531"
                            : "#db2360 ",
                        trailColor:
                          movie?.vote_average > 7
                            ? "#204529"
                            : movie?.vote_average > 4
                            ? "#423d0f"
                            : "#571435 ",
                      })}
                      className="w-14 h-14 flex items-center justify-center bg-mainBlack2 p-1 rounded-full font-semibold absolute -bottom-7 right-3 z-20"
                      value={movie?.vote_average * 10}
                      text={`${(movie?.vote_average * 10)
                        .toString()
                        ?.slice(0, 5)}%`}
                    />
                  </div>

                  <div className=" p-5 pt-8 flex flex-col gap-1 text-white">
                    <div className="font-semibold line-clamp-1">
                      {movie?.title}
                    </div>
                    <div className="text-mainWhite/60">
                      {movie?.release_date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {hideLoadBtn ? null : (
            <Button
              type="button"
              size="large"
              className="bg-blue-400 mt-10 text-2xl font-semibold w-full h-[50px] text-white flex items-center justify-center "
              onClick={() => handleLoadMore()}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;

export const getStaticProps = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=1`
    );

    return {
      props: {
        data: res?.data?.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
      },
    };
  }
};
