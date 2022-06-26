import React from "react";
import { motion } from "framer-motion";

const containerStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  zIndex: 900,
  display: "flex",
  justifyContent: "center",
  background: "#E2FF5D",
  overflow: "hidden",
};

const baseStyle = {
  position: "absolute",
  margin: "auto",
  display: "block",
  width: "100%",
  height: "100%",
};

const leftStyle = {
  ...baseStyle,
  transformOrigin: "center left",
  backgroundImage: "url('/assets/img/intro1.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

const topStyle = {
  ...baseStyle,
  transformOrigin: "top left",
  backgroundImage: "url('/assets/img/intro2.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

const rightStyle = {
  ...baseStyle,
  transformOrigin: "bottom right",
  backgroundImage: "url('/assets/img/intro3.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

const bottomStyle = {
  ...baseStyle,
  transformOrigin: "bottom left",
  backgroundImage: "url('/assets/img/intro4.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

const variants = {
  left: {
    scaleX: [0.5, 1, 1, 0, 0, 0, 0, 0, 0],
    scaleY: [1, 1, 0, 0, 0, 0, 0, 1, 1],
    y: ["0%", "0%", "100%", "100%", "100%", "100%", "100%", "0%", "0%"],
  },
  top: {
    scaleX: [1, 1, 1, 1, 0, 0, 0, 0, 0],
    scaleY: [0, 0, 0.5, 1, 1, 0, 0, 0, 0],
  },
  right: {
    scaleX: [0, 0, 0, 0, 0.5, 1, 1, 0, 0],
    scaleY: [1, 1, 1, 1, 1, 1, 0, 0, 0],
    y: ["0%", "0%", "0%", "0%", "0%", "0%", "-100%", "-100%", "-100%"],
  },
  bottom: {
    scaleY: [0, 0, 0, 0, 0, 0, 0.5, 1, 1],
    scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 0],
    x: ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "100%"],
  },
};

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 4,
};

export default function IntroAnimation() {
  return (
    <motion.div
      style={containerStyle}
      animate={{ opacity: [1, 0] }}
      transition={{ delay: 3.5 }}
    >
      <motion.div
        style={leftStyle}
        transition={spinTransition}
        animate={"left"}
        variants={variants}
      />
      <motion.div
        style={topStyle}
        animate={"top"}
        transition={spinTransition}
        variants={variants}
      />
      <motion.div
        style={rightStyle}
        animate={"right"}
        transition={spinTransition}
        variants={variants}
      />
      <motion.div
        style={bottomStyle}
        animate={"bottom"}
        transition={spinTransition}
        variants={variants}
      />
    </motion.div>
  );
}
