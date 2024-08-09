import { useEffect, useState } from "react";
import Header from "./components/1-header/Header.jsx";
import Hero from "./components/2-hero/Hero.jsx";
import Main from "./components/3-main/Main.jsx";
import Contact from "./components/4-contact/Contact.jsx";
import Footer from "./components/5-footer/Footer.jsx";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setshowScrollBTN(true);
      } else {
        setshowScrollBTN(false);
      }
    });
  }, []);

  const [showScrollBTN, setshowScrollBTN] = useState(false);

  return (
    <div id="up" className="container">
      <Header />
      <Hero />
      <div className="divider" />
      <Main />
      <div className="divider" />
      <Contact />
      <div className="divider" />
      <Footer />
      {showScrollBTN && (
        <a
          style={{ opacity: showScrollBTN ? 1 : 0, transition: "1s" }}
          href="#up"
        >
          <button className="icon-keyboard_arrow_up scroll2top"></button>
        </a>
      )}
    </div>
  );
}

export default App;
