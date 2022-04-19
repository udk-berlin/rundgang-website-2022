import styled from "styled-components";
import MenuBar from "@/components/MenuBar";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <div>
      <MenuBar />
      <Title>My pageHallo</Title>
    </div>
  );
}
