import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [showModal, setshowModal] = useState(false);
  const [theme, settheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  return (
    <header className="flex">
      <button
        onClick={() => {
          setshowModal(true);
        }}
        className="menu icon-menu flex"
      >
        {""}
      </button>

      <div />

      <nav>
        <ul className="flex">
          <li>
            <a href="#hero-section">About</a>
          </li>
          <li>
            <a href="#main-section">Projects</a>
          </li>
          <li>
            <a href="#contact-section">Contact</a>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => {
          // Send Value to LocalStorage
          localStorage.setItem(
            "currentMode",
            theme === "dark" ? "light" : "dark"
          );

          // Get Value From LocalStorage
          settheme(localStorage.getItem("currentMode"));
        }}
        className="mode flex"
      >
        {theme === "dark" ? (
          <span className="icon-moon-o"></span>
        ) : (
          <span className="icon-sun"></span>
        )}
      </button>

      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button
                className="icon-close"
                onClick={() => {
                  setshowModal(false);
                }}
              />
            </li>
            <li>
              <a href="#hero-section">About</a>
            </li>
            <li>
              <a href="#main-section">Projects</a>
            </li>
            <li>
              <a href="#contact-section">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
