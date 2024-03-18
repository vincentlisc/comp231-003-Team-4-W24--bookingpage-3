import { useState, useEffect } from "react";

import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../Auth/auth";
import Cookies from "js-cookie";
import isAuthenicated from '../ProtectedRoutes';
const NavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/RestaurantList",
    display: "Restaurants",
  },
  {
    path: "/Signup",
    display: "Signup",
  },
];
// const getCookieValue = (name) => {
//   const matches = document.cookie.match(
//     "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
//   );
//   return matches ? decodeURIComponent(matches[2]) : null;
// };

console.log(Cookies.get("userId"));

// const fetchUserType = async (userID) => {
//   try {
//     const response = await fetch(`http://localhost:5500/User/${userID}`);
//     if (!response.ok) throw new Error("Network response was not OK");
//     const data = await response.json();
//     return data.type; // Assuming the API returns a JSON object with a 'type' field
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     return null; // Handle error appropriately or return null
//   }
// };

const Header = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
  
    const userID = Cookies.get("userId"); // Use the correct cookie name here
    console.log(`UserID from cookie: ${userID}`);
    if (userID) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    console.log("test log");
    setUserType("Diner");
    setIsLoggedIn(false); // Update isLoggedIn state on logout
    authLogout();
    console.log("Logged out!");
    navigate("/"); // Navigate to home page or login page as per requirement after logout
  };

  useEffect(()=>{
    console.log(`isLoggin? ${isLoggedIn}`)
  },[isLoggedIn])

  return (
    <header className="header flex items-center">
      <div className="container flex items-center justify-between w-full">
        {/*====logo *=====*/}
        <div>
          <img src={logo} alt="logo" />
        </div>

        {/**========Menu */}
        <div className="navigation">
          <ul className="menu flex items-center gap-[2.7rem]">
            {NavLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={(isActive) =>
                    isActive
                      ? "text-primary-Color text-[16px] leading-7 font-[600]"
                      : "text-text-Color text-[16px] leading-7 font-[500] hover:text-primary-Color"
                  }
                  
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/*==== Nav Right ====*/}
        <div className="flex items-center gap-4">
          <div className="hidden">
            <NavLink to="/">
              <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                <img
                  src="{userImg}"
                  alt="user"
                  className="w-full h-full rounded-full"
                />
              </figure>
            </NavLink>
          </div>
          {!isLoggedIn && (
              <NavLink to="/AdminLogin">
              <button className="bg-primaryColor py-1 px-6 text-white font-[600] h-[46px] text-sm flex items-center-justify-top rounded-[50px]">
              Admin Login
              </button>
              </NavLink>
              )}

          {!isLoggedIn && (
            <NavLink to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center-justify-center rounded-[50px]">
                Login
              </button>
            </NavLink>
          )}

          
            {isLoggedIn &&(
            <button
              onClick={logout}
              className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center-justify-center rounded-[50px]"
            >
              Logout
            </button>)}
        

          <div className="container flex items-center justify-between w-full">
            {/* Other header content */}

            {/* Additional button for Admin */}
            {userType === "Admin" && (
              <button
                onClick={() => navigate("/Admin")}
                className="bg-primaryColor py-1 px-6 text-white font-[600] h-[44px] flex items-center-justify-center rounded-[50px] nudge-text-up"
              >
                Admin Page
              </button>
            )}

            {/* More elements like logout button, etc. */}
          </div>
          <span className="md:hidden">
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;