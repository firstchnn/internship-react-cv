import React from "react";
import { Home } from "../pages/Home";
import { NewApplicant } from "../pages/NewApplicant";
import { SearchApplicant } from "../pages/SearchApplicant";
import { useLocation, Routes, Route } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newApp" element={<NewApplicant />}></Route>
        <Route path="/searchApp" element={<SearchApplicant />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

