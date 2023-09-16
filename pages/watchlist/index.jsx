import Card from "@/components/Home/MovieCard";
import Title from "@/components/ui/Title";
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

const WatchList = ({ data }) => {
  const [watchList, setWatchList] = useState(data);
  return (
    <div className="h-fit py-5  w-full min-h-screen     bg-[url('/assets/auth-bg.jpg')] -mt-[65px] pt-[65px]  bg-center">
      <div className="container text-white">
        <Title>Watchlist</Title>

        <div className="grid p-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 container gap-3">
          {watchList?.map((item, i) => (
            <Card key={i} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchList;

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const res = await axios.get(
      `http://localhost:3000/api/watchList?queryId=${session?.user?.id}`
    );

    return {
      props: {
        data: res?.data?.watchList,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
