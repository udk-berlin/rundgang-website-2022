import styled from "styled-components";
import Link from "next/link";

const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref>
    <a className={className}>{children}</a>
  </Link>
);

export const DefaultLink = styled(StyledLink)`
  color: #000000;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.darkgrey};
    outline: none;
    border: none;
  }
`;
