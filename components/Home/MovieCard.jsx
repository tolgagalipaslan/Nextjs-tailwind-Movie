import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ movie }) => {
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

  function getColorByGenre(genreName) {
    const foundGenre = filmGenres.find((genre) => genre.name === genreName);
    if (foundGenre) {
      return foundGenre.color;
    } else {
      // Eşleşen tür bulunamazsa varsayılan olarak "Action" rengini döndür
      return "#f50";
    }
  }
  const formattedTitle = movie?.title?.toLowerCase().replace(/ /g, "-");
  return (
    <Link
      className="p-0 flex flex-col gap-2 group overflow-hidden "
      href={`/movie-details/${movie.id}-${formattedTitle}`}
    >
      <div className="w-full aspect-[9/14]  relative">
        <Image
          alt=""
          className="object-cover object-center w-full h-full rounded-2xl"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.backdrop_path}`}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.backdrop_path}`}
          loading="lazy"
        ></Image>
      </div>
      <div className="w-full h-full absolute left-0 top-0 hidden group-hover:flex rounded-2xl bg-black/20 items-center justify-center">
        <Button type="button" className="bg-mainDarkRed text-white">
          See more
        </Button>
      </div>
    </Link>
  );
};

export default Card;
