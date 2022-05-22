import styled from "styled-components";
import Link from "next/link";


const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref scroll={false}>
    <a className={className}>{children}</a>
  </Link>
);

export const DefaultLink = styled(StyledLink)`
  color: #000000;
  text-decoration: none;

  &:hover {
    color: #222222;
  }

  &:focus {
    color: #888888;
    outline: none;
    border: 0;
  }
`;
