import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
export default function Modes() {
     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

     useEffect(() => {
          if (theme === "dark") {
               document.body.classList.add("dark");
               document.body.classList.remove("light");
          } else {
               document.body.classList.add("light");
               document.body.classList.remove("dark");
          }
          localStorage.setItem("theme", theme);
     }, [theme]);

     return (
          <button
               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
               className="p-2 rounded-full transition"
          >
               {theme === "dark" ? <FaMoon className="w-5 h-5 text-gray-200 spin" /> : <FaSun  className="w-5 h-5 text-yellow-500 spin" />}
          </button>
     );
};

