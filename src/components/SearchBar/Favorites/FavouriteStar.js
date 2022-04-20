import styled from "styled-components";

const FavouriteStarWrapper = styled.svg`
  width: 100%;
  height: 100%;
  cursor: pointer;
  pointer-events: all;
`;

const FavouriteStarSvg = ({ onClick }) => {
  return (
    <FavouriteStarWrapper
      onClick={onClick}
      width="71"
      height="70"
      viewBox="0 0 71 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34 6L43 26.5L68.5 10L49 37.5L68.5 66.5L43 51.5L10.5 68L27.5 46L6 18L27.5 24L34 6Z"
        stroke="black"
        strokeWidth="4"
      />
    </FavouriteStarWrapper>
  );
};
export default FavouriteStarSvg;
