import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const MainLayout = styled(motion.main)`
  transform-origin: "100% 0%";
  flex-grow: ${({ growing }) => growing};
`;
const variants = {
  hidden: { scaleX: 0, originX: 0, x: "100%", y: 0 },
  enter: { scaleX: 1, originX: 0, x: "0%", y: 0 },
  exit: { scaleX: 0, originX: 0, x: "0%", y: 0 },
};

const Layout = ({ children, growing }) => (
  <MainLayout
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    growing={growing}
    transition={{ type: "linear", duration: 0.8 }}
  >
    {children}
  </MainLayout>
);

export default Layout;
