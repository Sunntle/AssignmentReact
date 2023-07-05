import React from "react";

import Slide from "./Slide";
import Feature from "./Feature";
import NewArrival from "./NewArrival";
import Sale from "./Sale";
import Blog from "./Blog";


function Home() {
  return (
      <>
        <Slide />
        <Feature/>
        <NewArrival/>
        <Sale/>
        <Blog/>
      </>
  );
}

export default Home;
