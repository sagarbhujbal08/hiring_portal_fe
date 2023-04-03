import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Report from "./Report";
import ViewOpenings from "./ViewOpenings";
import EditOpening from "./EditOpening";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
// const routes =
//   [
//     {path: "abc", componet: <Layout />}
//   ];
const MainRoute = () => (
  <main>
    <Routes>
      {/* {routes.map((route) => {
        return <Route exact path={route.path} element={route.componet} />
      })} */}
      <Route exact path="/" element={<Layout />} />
      <Route exact path="/report" element={<Report />} />
      <Route exact path="/view" element={<ViewOpenings />} />
      <Route exact path="/edit" element={<EditOpening />} />
    </Routes>
  </main>
);

export default MainRoute;
