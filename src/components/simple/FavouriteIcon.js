import styled from "styled-components";

const FavouriteIconWrapper = styled.svg`
  cursor: pointer;
  pointer-events: all;
  fill: ${({ color }) => color};
  stroke: ${({ color }) => color};
`;

const FillPath = styled.path`
  fill: ${({ saved, color }) => (saved ? color : "#fff")};

  @media ${({ theme }) => theme.breakpoints.laptop} {
    &:hover {
      fill: ${({ color }) => color};
    }
  }
`;

const FavouriteIcon = ({
  onClick,
  saved = false,
  size = 20,
  color = "black",
}) => {
  return (
    <FavouriteIconWrapper
      onClick={onClick}
      width={`${size * 0.12}em`}
      height={`${size * 0.12}em`}
      color={color}
      viewBox="0 -5 49 67"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 25.1919L6.26866 58L22.7164 32.5455H4L35.194 2L21.5821 25.1919H42Z"
        strokeWidth="3"
      />

      <FillPath
        fillRule="evenodd"
        clipRule="evenodd"
        saved={saved}
        color={color}
        strokeWidth={3}
        d="M42 25.1919L6.26866 58L22.7164 32.5455H4L35.194 2L21.5821 25.1919H42Z"
      />
    </FavouriteIconWrapper>
  );
};
export default FavouriteIcon;
