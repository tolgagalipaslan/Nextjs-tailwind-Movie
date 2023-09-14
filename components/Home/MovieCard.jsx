import { Button, Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

const Card = ({ movie }) => {
  const router = useRouter();
  const filmGenres = [
    { id: 28, name: "Action", color: "#f50" },
    { id: 12, name: "Adventure", color: "#00ccff" }, // Zıt renk: Mavi
    { id: 16, name: "Animation", color: "#ff33bb" },
    { id: 35, name: "Comedy", color: "#9900ff" }, // Zıt renk: Mor
    { id: 80, name: "Crime", color: "#33ff33" }, // Zıt renk: Yeşil
    { id: 99, name: "Documentary", color: "#ff9966" }, // Zıt renk: Turuncu
    { id: 18, name: "Drama", color: "#990000" }, // Zıt renk: Kırmızı
    { id: 10751, name: "Family", color: "#ff9966" }, // Zıt renk: Turuncu
    { id: 14, name: "Fantasy", color: "#3366cc" }, // Zıt renk: Lacivert
    { id: 36, name: "History", color: "#ffcc00" }, // Zıt renk: Sarı
    { id: 27, name: "Horror", color: "#009900" }, // Zıt renk: Açık Yeşil
    { id: 10402, name: "Music", color: "#cc33cc" }, // Zıt renk: Mor-Pembe
    { id: 9648, name: "Mystery", color: "#ffff00" }, // Zıt renk: Sarı
    { id: 10749, name: "Romance", color: "#ff0066" }, // Zıt renk: Pembe
    { id: 878, name: "Science Fiction", color: "#00cc99" }, // Zıt renk: Açık Mavi
    { id: 10770, name: "TV Movie", color: "#ff9933" }, // Zıt renk: Turuncu
    { id: 53, name: "Thriller", color: "#660066" }, // Zıt renk: Mor
    { id: 10752, name: "War", color: "#996600" }, // Zıt renk: Kahverengi
    { id: 37, name: "Western", color: "#cc6600" }, // Zıt renk: Koyu Turuncu
    // Diğer türler için benzersiz zıt renkler ekleyebilirsiniz
  ];
  const items = [
    {
      label: (
        <div className="flex items-center gap-1">
          <BsFillBookmarkPlusFill className="text-lg" />
          Add to watchlist
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <AiFillHeart className="text-lg" />
          Add to favorites
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <AiFillStar className="text-lg" />
          Your rating
        </div>
      ),
      key: "2",
    },
  ];

  const formattedTitle = movie?.title?.toLowerCase().replace(/ /g, "-");
  return (
    <div className="p-0 flex flex-col gap-2 group overflow-hidden relative  cursor-pointer ">
      <div className="absolute top-2 right-2 z-30">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          className="group-hover:opacity-100 opacity-0"
        >
          <div onClick={(e) => e.preventDefault()}>
            <Space className="bg-white/80 text-2xl rounded-full hover:bg-blue-600 duration-300  ">
              <BiDotsHorizontalRounded />
            </Space>
          </div>
        </Dropdown>
      </div>
      <div
        onClick={() =>
          router.push(`/movie-details/${movie.id}-${formattedTitle}`)
        }
        className="w-full aspect-[9/14]  relative"
      >
        <Image
          alt={movie?.title}
          className="object-cover object-center w-full h-full rounded-md"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.backdrop_path}`}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.backdrop_path}`}
          loading="lazy"
        ></Image>
      </div>
      <div
        onClick={() =>
          router.push(`/movie-details/${movie.id}-${formattedTitle}`)
        }
        className="w-full h-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 flex rounded-md bg-black/20 items-center justify-center"
      >
        <Button type="button" className="bg-mainDarkRed text-white">
          See more
        </Button>
      </div>
    </div>
  );
};

export default Card;
