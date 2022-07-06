import React from "react";
import { Home } from "../pages/Home";
import { NewApplicant } from "../pages/NewApplicant";
import { SearchApplicant } from "../pages/SearchApplicant";
import { ManageSkill } from "../pages/ManageSkill";
import { AddComplete } from "../pages/AddComplete";
import { useLocation, Routes, Route } from "react-router-dom";
import { AddSkillComplete } from "../pages/AddSkillComplete";
import { AnimatePresence } from "framer-motion";
import { SingleApplicant } from "../pages/SingleApplicant";

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newApp" element={<NewApplicant />}></Route>
        <Route path="/searchApp" element={<SearchApplicant />}></Route>
        <Route path="/searchApp/:appId" element={<SingleApplicant />}></Route> 
        <Route path="/manageSkill" element={<ManageSkill />}></Route>
        <Route path="/complete" element={<AddComplete />}></Route>
        <Route path="/skillComplete" element={<AddSkillComplete />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

