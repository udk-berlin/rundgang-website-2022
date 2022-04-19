import styled from "styled-components";
const ArrowSvg = ({ direction, onClick }) => {
  const ArrowWrapper = styled.svg`
    width: 9vw;
    height: 9vw;
    cursor: pointer;
    pointer-events: all;
    flex-grow: 0;
  `;
  return (
    <ArrowWrapper
      onClick={onClick}
      viewBox="0 0 300 300"
      transform={direction == "right" ? "rotate(90)" : "rotate(270)"}
    >
      <path d="m50 150 92.957-77.84v208.88c0 3.3594 2.2383 5.6016 5.6016 5.6016 3.3594 0 5.6016-2.2383 5.6016-5.6016v-208.88l92.961 77.84c1.1211 1.1211 2.2383 1.1211 3.3594 1.1211 1.6797 0 3.3594-0.55859 4.4805-2.2383 2.2383-2.2383 1.6797-6.1602-0.55859-7.8398l-102.48-85.125c-2.2383-1.6797-5.0391-1.6797-7.2812 0l-101.92 85.68c-2.2383 2.2383-2.8008 5.6016-0.55859 7.8398 2.2383 2.2422 5.5977 2.8008 7.8398 0.5625z"></path>
    </ArrowWrapper>
  );
};
export default ArrowSvg;
