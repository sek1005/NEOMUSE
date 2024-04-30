import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app-overall">
      <NavBar />
      <div className="app-outlet">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
