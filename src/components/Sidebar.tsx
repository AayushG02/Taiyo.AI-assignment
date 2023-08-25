import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

// Sidebar component
const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Toggles the visibility of the sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Get the current location
  const location = useLocation().pathname;

  return (
    <div
      className={` ${
        sidebarVisible ? "w-60" : "sm:w-24 w-20"
      } flex bg-gray-800 min-h-screen `}
    >
      {sidebarVisible ? (
        <div className="mt-[7rem] px-5 flex flex-col items-start">
          <Link to="/">
            <div
              className={`flex items-center rounded mb-2 hover:bg-gray-700 w-48 h-12 ${
                location === "/"
                  ? "text-blue-600 border-blue-600 hover:none"
                  : "text-gray-300 border-gray-300 hover:text-white hover:border-white"
              } sm:px-3 `}
            >
              <ContactsOutlinedIcon className="mr-4" />
              Contact
            </div>
          </Link>
          <Link to="/chartsmaps">
            <div
              className={`flex items-center rounded hover:bg-gray-700 w-48 h-12 ${
                location === "/chartsmaps"
                  ? "text-blue-600 border-blue-600 hover:none"
                  : "text-gray-300 border-gray-300 hover:text-white hover:border-white"
              } sm:px-3`}
            >
              <InsertChartOutlinedIcon className="mr-4" />
              Charts and Maps
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mt-[7rem] ml-5">
          <Link to="/">
            <div
              className={` flex items-center mb-2 hover:bg-gray-700 rounded-full w-8 h-8 sm:w-12 sm:h-12  ${
                location === "/"
                  ? "text-blue-600 border-blue-600 hover:none"
                  : "text-gray-300 border-gray-300 hover:text-white hover:border-white"
              } sm:px-3`}
            >
              <ContactsOutlinedIcon className="mr-4" />
            </div>
          </Link>
          <Link to="/chartsmaps">
            <div
              className={` flex items-center mb-8 hover:bg-gray-700 rounded-full w-8 h-8 sm:w-12 sm:h-12  ${
                location === "/chartsmaps"
                  ? "text-blue-600 border-blue-600 hover:none"
                  : "text-gray-300 border-gray-300 hover:text-white hover:border-white"
              } sm:px-3`}
            >
              <InsertChartOutlinedIcon className="mr-4" />
            </div>
          </Link>
        </div>
      )}
      <button
        className="bg-gray-700 text-white w-8 h-8 sm:w-12 sm:h-12 absolute top-0 sm:left-3 left-5 mt-4 sm:ml-2 rounded-full"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
      </button>
    </div>
  );
};

export default Sidebar;
