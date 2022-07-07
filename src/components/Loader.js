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
  overflow: "hidden",
};

const baseStyle = {
  position: "absolute",
  margin: "auto",
  display: "block",
  top: "10%",
  left: "10%",
  width: "80%",
  height: "80%",
  willChange: "transform",
  transformOrigin: "center left",
  backgroundImage: "url('/assets/img/intro2.svg')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
};

const variants = {
  left: {
    scaleX: [0, 1, 0],
    translateX: ["0%", "0%", "100%"],
  },
};

const spinTransition = {
  ease: "linear",
  duration: 4,
};

export default function Loader() {
  return (
    <motion.div animate={{ display: "none" }} transition={{ delay: 4 }}>
      <motion.div
        style={containerStyle}
        animate={{ opacity: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          style={baseStyle}
          transition={spinTransition}
          animate={"left"}
          variants={variants}
        />
      </motion.div>
    </motion.div>
  );
}
