import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  position: relative;
    box-sizing: border-box;
`;

const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref scroll={false}>
    <a className={className}>{children}</a>
  </Link>
);

export const DefaultLink = styled(StyledLink)`
  color: #000000;
  text-decoration: none;

  &:hover {
    color: #888888;
  }

  &:focus {
    color: #888888;
    outline: none;
    border: 0;
  }
`;
