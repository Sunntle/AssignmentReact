import Blog from "./Blog";
import Feature from "./Feature";
import NewArrival from "./NewArrival";
import Sale from "./Sale";
import Slide from "./Slide";

function Home() {
  return (
    <div>
      <Slide />
      <Feature />
      <NewArrival />
      <Sale />
      <Blog />
    </div>
  );
}

export default Home;
