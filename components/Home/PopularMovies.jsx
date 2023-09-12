// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Title from "../ui/Title";
import MovieCard from "./MovieCard";

const PopularMovies = ({ movies }) => {
  return (
    <div className="overflow-hidden">
      <div className="container">
        <Title>Popular Movies</Title>
        <Swiper
          initialSlide={20}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            550: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className=" list-swiper overflow-visible"
        >
          {movies?.map(
            (movie, i) =>
              movie?.backdrop_path && (
                <SwiperSlide key={i}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              )
          )}
          {movies?.map(
            (movie, i) =>
              movie?.backdrop_path && (
                <SwiperSlide key={i}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              )
          )}
          {movies?.map(
            (movie, i) =>
              movie?.backdrop_path && (
                <SwiperSlide key={i}>
                  <MovieCard movie={movie} />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularMovies;
