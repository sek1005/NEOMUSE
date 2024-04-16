import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MyNavbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app-overall">
      <MyNavbar />
      <div className="app-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
