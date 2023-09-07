// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Title from "../ui/Title";

const CastList = ({ cast }) => {
  return (
    <div className="overflow-hidden py-10">
      {cast?.cast?.length !== 0 ? (
        <div className="container">
          <Title>Top Billed Cast</Title>
          <Swiper
            initialSlide={20}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              400: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              550: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className=" list-swiper overflow-visible"
          >
            {cast?.cast?.map(
              (cast, i) =>
                cast?.profile_path && (
                  <SwiperSlide key={i}>
                    <div
                      style={{
                        backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${cast?.profile_path})`,
                      }}
                      className="w-full aspect-[9/12] bg-cover bg-center rounded-2xl"
                    ></div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      ) : null}
    </div>
  );
};

export default CastList;
