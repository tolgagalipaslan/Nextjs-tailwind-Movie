import ArtistList from "@/components/Home/ArtistList";
import Banner from "@/components/Home/Banner";
import axios from "axios";
import Link from "next/link";

const Home = ({ artist }) => {
  return (
    <div className=" ">
      <Banner />
      <ArtistList artist={artist} />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const artistRes = await axios.get(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );

    return {
      props: {
        artist: artistRes?.data?.results,
      },
    };
  } catch (error) {
    return {
      props: {
        artist: [],
      },
    };
  }
};
