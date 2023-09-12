import { Avatar, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
const TvCard = ({ tv }) => {
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

  function getColorByGenre(genreId) {
    const foundGenre = filmGenres.find((genre) => genre.id === genreId);
    if (foundGenre) {
      return foundGenre.color;
    } else {
      // Eşleşen tür bulunamazsa varsayılan olarak "Action" rengini döndür
      return "#f50";
    }
  }

  const getGenre = (genreId) => {
    const foundGenre = filmGenres.find((genre) => genre.id === genreId);
    if (foundGenre) {
      return foundGenre;
    } else {
      return false;
    }
  };
  const formattedName = tv?.name?.toLowerCase().replace(/ /g, "-");
  return (
    <Link href={`/tv-details/${tv.id}-${formattedName}`}>
      <div className="relative overflow-hidden w-full rounded-2xl group ">
        <div className="absolute group-hover:top-0 top-full left-0 bg-gradient-to-b from-transparent to-black group-hover:backdrop-blur-sm custom-duration z-30 w-full h-full flex flex-col gap-1 p-3   ">
          <div className="flex flex-col gap-1  mt-auto ">
            <div className="line-clamp-1 text-white text-xl font-semibold">
              {tv.name}
            </div>

            <div className="-mt-1 flex items-center gap-2">
              <ReactStars
                value={tv.vote_average / 2}
                isHalf={true}
                count={5}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <div className="text-[#ffd700]">
                {tv.vote_average?.toString().slice(0, 3)}
              </div>
            </div>
            <div className="flex items-center gap-y-5 ">
              {tv.genre_ids?.slice(0, 2).map((item, i) =>
                getGenre(item) !== false ? (
                  <Tag key={i} color={getColorByGenre(item)}>
                    {getGenre(item)?.name}
                  </Tag>
                ) : null
              )}
            </div>
            <div className="text-white line-clamp-3 text-sm">{tv.overview}</div>
          </div>
        </div>
        <div className="w-full aspect-[9/14]  relative">
          <Image
            alt=""
            className="object-cover object-center w-full h-full"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tv?.backdrop_path}`}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tv?.backdrop_path}`}
            loading="lazy"
          ></Image>
        </div>
      </div>
    </Link>
  );
};

export default TvCard;
