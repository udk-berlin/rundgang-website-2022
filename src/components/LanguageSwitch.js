import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const LanguageSwitchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 0;
`;

const LanguageItem = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => ` 0 ${theme.spacing.xs}`};
`;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`;
const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 4px;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid black;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  height: 10px;
`;

const SliderBall = styled.span`
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: ${({ isOn }) => (isOn ? "15px" : "0px")};
  bottom: 0;
  background-color: black;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
`;

const LanguageSwitch = ({ grow }) => {
  const router = useRouter();
  return (
    <LanguageSwitchWrapper grow>
      <LanguageItem
        onClick={() => {
          router.replace(router.asPath, router.asPath, { locale: "en" });
        }}
      >
        EN
      </LanguageItem>
      <Switch
        onClick={() => {
          if (router.locale == "de") {
            router.replace(router.asPath, router.asPath, { locale: "en" });
          }
          if (router.locale == "en") {
            router.replace(router.asPath, router.asPath, { locale: "de" });
          }
        }}
      >
        <SliderBall isOn={router.locale == "de"} />
        <Slider></Slider>
      </Switch>
      <LanguageItem
        onClick={() => {
          router.replace(router.asPath, router.asPath, { locale: "de" });
        }}
      >
        DE
      </LanguageItem>
    </LanguageSwitchWrapper>
  );
};

export default LanguageSwitch;
