import { Avatar } from "antd";
import React from "react";
import Title from "../ui/Title";

const ArtistList = ({ artist }) => {
  return (
    <div className="container py-10">
      <Title>Popular Artist</Title>
      <div className=" grid  grid-cols-5 md:grid-cols-10 items-center gap-5 overflow-hidden  ">
        {artist?.length !== 0
          ? artist?.slice(0, 10).map(
              (item, i) =>
                item?.profile_path && (
                  <div key={i}>
                    <Avatar
                      className="w-full h-full aspect-square border-[4px] border-mainDarkRed cursor-pointer"
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item?.profile_path}`}
                    />
                  </div>
                )
            )
          : null}
      </div>
    </div>
  );
};

export default ArtistList;
