import React, { useEffect, useState } from "react";
/* import styled from "styled-components"; */
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useFlubber, getIndex } from "@/utils/useFlubber";

const path1 =
  "M1291 343H954V374H623V343H449V374V390V625H783V876H449V1105V1127V1152H623V1127H954V1152H1291V1127H1663V1152H1837V1127V1105V876H1482V625H1837V390V374V343H1663V374H1291V343ZM1026 826H1239V625H1204.32C1204.77 628.269 1205 631.608 1205 635C1205 675.317 1172.32 708 1132 708C1091.68 708 1059 675.317 1059 635C1059 631.608 1059.23 628.269 1059.68 625H1026V826Z";
const path2 =
  "M1697 160H132V560V625V740H947V625H1411V904H704V1217H1697V955V904V625V528V160Z";
const path3 =
  "M406 362H934H1025H1651V478.167L1780.62 443.002L1836.12 647.606L1689 687.521V797H1688.93L1689.26 797.441L714.729 1515.22L508.04 1234.6L471.398 1186.62L546.158 1129.53L583.275 1178.14L864.257 971.184L761 826.816L762.141 826H761V682H406V362ZM1086 602H1285V661.288L1084.09 809.267L1034 739.235V654H1086V602Z";
const path4 =
  "M1691.23 289.142L1658.49 327.889L1935.3 561.834L1387.49 1210.01L1387.48 1209.99L1129.27 1299.09L1129 1298.32V1299H305V926.998H259V681.998H936V727.206L1116.49 664.924L1079.38 633.553L1504.11 130.996L1691.23 289.142Z";

const paths = [path2, path3];
const colors = ["#00cc88", "#8855ff"];

/* const IntroContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 200;
  display: flex;
  justify-content: center;
  background: white;
`; */

export default function IntroAnimation() {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useFlubber(progress, paths);

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.8,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
    });

    return () => animation.stop();
  }, [pathIndex]);

  return (
    <svg width="400" height="400">
      <g transform="translate(10 10) scale(17 17)">
        <motion.path fill={fill} d={path} />
      </g>
    </svg>
  );
}
