
import { useTransform } from "framer-motion";
import { interpolate } from "flubber";

export const getIndex = (_, index) => index;

export function useFlubber(progress, paths) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
}