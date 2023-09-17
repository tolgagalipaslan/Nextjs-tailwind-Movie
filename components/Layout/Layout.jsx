import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
import { setData } from "@/redux/features/watchList";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      handleSetWatchList();
    }
  }, [session]);

  const handleSetWatchList = async () => {
    try {
      const res = await axios.get(
        `/api/watchList?queryId=${session?.user?.id}`
      );
      dispatch(setData(res?.data?.watchList));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
