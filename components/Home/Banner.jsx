// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "antd";

const Banner = () => {
  return (
    <div className="mt-[-65px]">
      <Swiper
        loop={true}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-screen  max-h-[1200px] home-banner"
      >
        <SwiperSlide>
          <div className="w-full h-full relative  ">
            <div className="w-full h-full bg-black/40 z-30 absolute left-0 top-0"></div>
            <Image
              fill
              className="object-cover"
              src="/assets/banner3.jpg"
              alt="..."
            ></Image>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-1/2 top-[40%]  container text-white z-40 swiper-box">
              <div className="flex flex-col max-w-[500px] gap-5">
                <div className="lg:text-5xl text-2xl">
                  Venom: Let There Be Carnage (2021)
                </div>
                <div className="text-sm lg:text-lg">
                  After finding a host body in investigative reporter Eddie
                  Brock, the alien symbiote must face a new enemy, Carnage, the
                  alter ego of serial killer Cletus Kasady.
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-mainDarkRed text-white animate-banner-btn"
                  >
                    See more
                  </Button>
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-transparent text-white  border-white"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div className="w-full h-full relative ">
            <div className="w-full h-full bg-black/40 z-30 absolute left-0 top-0"></div>
            <Image
              fill
              className="object-cover"
              src="/assets/banner2.jpeg"
              alt="..."
            ></Image>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-1/2 top-[40%]  container text-white z-40 swiper-box">
              <div className="flex flex-col max-w-[500px] gap-5">
                <div className="lg:text-5xl text-2xl">Oppenheimer (2023)</div>
                <div className="text-sm lg:text-lg">
                  The story of J. Robert Oppenheimer’s role in the development
                  of the atomic bomb during World War II.
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-mainDarkRed text-white animate-banner-btn"
                  >
                    See more
                  </Button>
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-transparent text-white  border-white"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div className="w-full h-full relative  ">
            <div className="w-full h-full bg-black/40 z-30 absolute left-0 top-0"></div>
            <Image
              fill
              className="object-cover"
              src="/assets/banner4.jpg"
              alt="..."
            ></Image>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-1/2 top-[40%]  container text-white z-40 swiper-box">
              <div className="flex flex-col max-w-[500px] gap-5">
                <div className="lg:text-5xl text-2xl">
                  Heart of Stone (2023)
                </div>
                <div className="text-sm lg:text-lg">
                  An intelligence operative for a shadowy global peacekeeping
                  agency races to stop a hacker from stealing its most valuable
                  — and dangerous — weapon.
                </div>
                <div className="flex items-center gap-5">
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-mainDarkRed text-white animate-banner-btn"
                  >
                    See more
                  </Button>
                  <Button
                    type="button"
                    shape="round"
                    size="large"
                    className="bg-transparent text-white  border-white"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
