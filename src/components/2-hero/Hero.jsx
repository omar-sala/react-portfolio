import React, { useRef } from "react";
import "./hero.css";
import Lottie from "lottie-react";
import developerAnimation from "../../animation/developer.json";
import { motion } from "framer-motion";

const Hero = () => {
  const lottieRef = useRef();
  return (
    <section className="hero flex">
      <div className="left-section">
        <div className="parent-avatar flex">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src="./images/me.jpg"
            className="avatar"
            alt=""
          />
          <div className="icon-verified"></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          I am a Front-end Developer using (React js).
        </motion.h1>
        <p className="sub-title">
          I'm Omar Salama, I am a Front-End developer seeking to learn new web
          technologies, I always strive to be different, I have learned JS
          framework ( React ) to enhance my skills, my goal is to be a great
          developer with a knowledge that adding new things to my community, so
          I always learning and researching.
        </p>
        <div className="all-icons flex">
          <a href="https://x.com/OmarSal00425156" target="_blank">
            <div className="icon icon-twitter"></div>
          </a>
          <a
            href="https://www.instagram.com/mrslmhbdlwhb/?hl=ar"
            target="_blank"
          >
            <div className="icon icon-instagram"></div>
          </a>
          <a href="https://github.com/omar-sala" target="_blank">
            <div className="icon icon-github"></div>
          </a>
          <a href="https://www.linkedin.com/in/om-salama/" target="_blank">
            <div className="icon icon-linkedin"></div>
          </a>
        </div>
      </div>
      <div className="right-section animation">
        <Lottie
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={developerAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
