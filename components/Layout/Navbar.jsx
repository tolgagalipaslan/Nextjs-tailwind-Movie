import useScrollPast65px from "@/hooks/scrollPast65px";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [mobilNavOpen, setMobilNavOpen] = useState(false);
  const scrolled = useScrollPast65px();
  const { pathname } = useRouter();
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-40 h-[65px] bg-mainBlack2 ${
          scrolled ? "lg:bg-mainBlack2/70 backdrop-blur-lg" : "lg:bg-black/0"
        }`}
      >
        <div className="container flex items-center justify-between w-full h-full text-white">
          <div className="flex items-center gap-5">
            {" "}
            <Link href={"/"} className="flex items-center gap-2">
              <div className="relative w-[50px] aspect-square flex items-center gap-0">
                <Image
                  className="object-contain"
                  fill
                  src={"/assets/logo1.png"}
                  alt="..."
                />
              </div>
              <div className=" text-transparent bg-clip-text bg-gradient-to-b text-3xl font-extrabold from-mainWhite to-mainDarkRed ml-[-5px]">
                Ofenos
              </div>
            </Link>
            <div
              className={`${
                mobilNavOpen ? "h-[176px] pb-5" : "h-0"
              } lg:h-fit overflow-hidden flex flex-col justify-center w-full items-center gap-5 absolute top-[65px] left-0 lg:relative lg:top-auto lg:left-auto lg:w-fit lg:justify-start lg:flex-row bg-mainBlack2 lg:bg-transparent lg:pb-0 duration-300 `}
            >
              <Link
                href={"/movies"}
                className={`font-semibold hover:text-mainDarkRed duration-300 ${
                  pathname === "/movies" ? "text-mainDarkRed" : ""
                }`}
              >
                Movies
              </Link>
              <Link
                href={"/"}
                className={`font-semibold hover:text-mainDarkRed duration-300 ${
                  pathname === "/tv-shows" ? "text-mainDarkRed" : ""
                }`}
              >
                Tv Shows
              </Link>{" "}
              <Link
                href={"/"}
                className={`font-semibold hover:text-mainDarkRed duration-300 ${
                  pathname === "/people" ? "text-mainDarkRed" : ""
                }`}
              >
                People
              </Link>
              <Link
                href={"/"}
                className={`font-semibold hover:text-mainDarkRed duration-300 ${
                  pathname === "/people" ? "text-mainDarkRed" : ""
                }`}
              >
                My Favories
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-transparent p-2 text-2xl flex items-center justify-center text-white hover:text-mainDarkRed duration-300"
            >
              <AiOutlineSearch />
            </button>
            <Button type="button" className="bg-mainDarkRed text-white">
              Login
            </Button>
            <Button
              onClick={() => setMobilNavOpen(!mobilNavOpen)}
              type="button"
              className="bg-transparent text-2xl text-white lg:hidden relative"
            >
              <AiOutlineClose
                className={`${
                  mobilNavOpen ? "opacity-100" : " opacity-0"
                } duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              />
              <GiHamburgerMenu
                className={`${
                  !mobilNavOpen ? "opacity-100" : " opacity-0 "
                } duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[65px] w-full "></div>
    </>
  );
};

export default Navbar;
