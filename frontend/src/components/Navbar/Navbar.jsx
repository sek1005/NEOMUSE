/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useUser from "../../contexts/UserContext";
import logoneomuse from "../../assets/images/logoneomuse.png";
/* eslint-disable camelcase */
function NavBar() {
  const { user } = useUser();
  const Links = [
    { name: "Les Artistes", link: "/artists" },
    { name: "Les Oeuvres", link: "/artworks" },
    { name: "La Gallerie", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full shadow-md">
      <div className="items-center justify-around py-4 bg-white md:flex md: md:px-10 px-7">
        {/* logo section */}
        <div>
          <a
            href="/"
            className="flex items-center gap-1 text-2xl font-bold cursor-pointer"
          >
            <img
              className="w-1/5 h-auto"
              src={logoneomuse}
              alt="logo-neomuse"
            />
          </a>
          {/* Menu icon */}

          <div
            onClick={() => setOpen(!open)}
            tabIndex={0}
            role="button"
            className="absolute cursor-pointer right-8 top-6 md:hidden w-7 h-7"
          >
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>
          {/* linke items */}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 bg-white pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 md:ml-8  transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="font-semibold md:ml-8 md:my-0 my-7">
              <a href={link.link} className="duration-500 hover:text-slate-500">
                {link.name}
              </a>
            </li>
          ))}
          {!user ? (
            <li>
              <Link
                to="/login"
                className="px-3 py-1 font-semibold text-white duration-500 bg-pink-800 rounded btn md:ml-8 md:static"
              >
                Se connecter
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/users"
                className="px-3 py-1 font-semibold text-white duration-500 bg-pink-800 rounded btn md:ml-8 md:static"
              >
                Mon compte
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
/* eslint-disable camelcase */
export default NavBar;
