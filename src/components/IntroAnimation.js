import React from "react";
import { motion } from "framer-motion";

const containerStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  zIndex: 200,
  display: "flex",
  justifyContent: "center",
  background: "white",
};

const baseStyle = {
  position: "absolute",
  margin: "auto",
  display: "block",
  width: "100vh",
  height: "100vh",
};

const leftStyle = {
  ...baseStyle,
  transformOrigin: "center left",
  backgroundImage: "url('/assets/img/haus2.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const topStyle = {
  ...baseStyle,
  transformOrigin: "top center",
  backgroundImage: "url('/assets/img/4001.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const rightStyle = {
  ...baseStyle,
  transformOrigin: "center right",
  backgroundImage: "url('/assets/img/haus4.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const bottomStyle = {
  ...baseStyle,
  transformOrigin: "bottom center",
  backgroundImage: "url('/assets/img/haus7.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const variants = {
  left: {
    scaleX: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    x: ["0%", "0%", "100%", "100%", "100%", "100%", "100%", "100%", "100%"],
  },
  top: {
    scaleY: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    y: ["0%", "0%", "0%", "0%", "100%", "100%", "100%", "100%", "100%"],
  },
  right: {
    scaleX: [0, 0, 0, 0, 0, 1, 0, 0, 0],
    x: ["0%", "0%", "0%", "0%", "0%", "0%", "-100%", "-100%", "-100%"],
  },
  bottom: {
    scaleY: [0, 0, 0, 0, 0, 0, 0, 1, 0],
    y: ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "-100%"],
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
      animate={{ opacity: 0 }}
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
