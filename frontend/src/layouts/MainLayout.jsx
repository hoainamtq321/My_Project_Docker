import {Header} from "../components/Layout/Header/Header";
import {Footer} from "../components/Layout/Footer/Footer";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../stores/categorySlice";


const MainLayout = () => {

  const dispatch = useDispatch();
  const loaded = useSelector(state => state.category.loaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchCategories());
    }
  }, [dispatch, loaded]);

  return (
    <>
      <Header />
      <Breadcrumb />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
