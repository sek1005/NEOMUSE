import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AllDataProvider } from "./contexts/AllDataContext";
import useUser, { UserProvider } from "./contexts/UserContext";
import App from "./App";
import Home from "./pages/Home/Home";
import Artist from "./pages/Artist/Artist";
import Artistlist from "./pages/Artist/Artistlist";
import Artworklist from "./pages/Artwork/Artworklist";
import Artwork from "./pages/Artwork/ArtworkDetail";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Users from "./pages/Users/Users";
import Favoris from "./pages/Favoris/Favoris";
import Information from "./pages/Information/Information";
import LoginSignup from "./pages/LoginSignup";
import ManageArtist from "./pages/Admin/ManageArtist";
import ManageArtwork from "./pages/Admin/ManageArtwork";
import GetUser from "./pages/Admin/GetUser";
import Data from "./pages/data/data";
// eslint-disable-next-line import/no-unresolved
import Loader from "./components/loader/loader";
import "./index.css";

function PrivateRoute({ children }) {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(null);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoading) setPage(<Loader />);
    else if (!user) redirect("./login");
    else setPage(children);
    return () => setPage(null);
  }, [user, isLoading, location]);
  return page;
}
function PublicRoute({ children }) {
  const { user, isLoading } = useUser();
  const [page, setPage] = useState(children);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isLoading) setPage(<Loader />);
    else if (user) redirect(-1);
    else setPage(children);
  }, [user, isLoading, location]);
  return page;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "/artists",
        element: <Artistlist />,
      },
      {
        path: "/artists/:id",
        element: <Artist />,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/artworks/artists/${
              params.id
            }`,
            {
              method: "GET",
            }
          ),
      },
      {
        path: "/artworks",
        element: <Artworklist />,
      },
      {
        path: "/artworks/:id",
        element: <Artwork />,
      },
      {
        path: "/data",
        element: <Data />,
      },
      {
        path: "/favoris",
        element: (
          <PrivateRoute>
            <Favoris />
          </PrivateRoute>
        ),
      },
      {
        path: "/information",
        element: (
          <PrivateRoute>
            <Information />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminModifArtist",
        element: (
          <PrivateRoute>
            <ManageArtist />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminModifOeuvre",
        element: (
          <PrivateRoute>
            <ManageArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminListUser",
        element: (
          // <PrivateRoute>
          <GetUser />
          // </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <AllDataProvider>
        <RouterProvider router={router} />
      </AllDataProvider>
    </UserProvider>
  </React.StrictMode>
);
