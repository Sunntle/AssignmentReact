import { useEffect, useState } from "react";
import Blog from "./Blog";
import Feature from "./Feature";
import NewArrival from "./NewArrival";
import Sale from "./Sale";
import Slide from "./Slide";
import ToastMessage from "components/Toast";
function Home() {
  const [toast, setToast] = useState({});
  const [toggleToast, setToggleToast] = useState(false);
  useEffect(() => {
    if (Object.keys(toast).length > 1) setToggleToast(true);
    const delay = setTimeout(() => {
      setToggleToast(false);
      setToast({});
    }, 2000);
    return () => clearTimeout(delay);
  }, [toast]);
  return (
    <div className="position-relative">
      <ToastMessage isOpen={toggleToast} message={toast} />
      <Slide />
      <Feature />
      <NewArrival setToast={setToast} />
      <Sale />
      <Blog />
    </div>
  );
}

export default Home;
