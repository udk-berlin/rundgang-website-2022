import React, { useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FormattedTime } from "react-intl";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import { makeUrlFromId } from "@/utils/idUtils";
import LocalizedText from "modules/i18n/components/LocalizedText";

const ListItemWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-top: 16px;
`;

const Image = styled.picture`
  cursor: pointer;
  width: 100%;
  height: auto;
  position: relative;
  opacity: 85%;
  &:hover {
    opacity: 100%;
  }
`;

const SaveIcon = styled.div`
  position: absolute;
  background: white;
  padding: 0px 4px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  top: 8px;
  right: 8px;
  background: ${({ theme, saved }) =>
    saved ? theme.colors.black : theme.colors.white};
  color: ${({ theme, saved }) =>
    saved ? theme.colors.white : theme.colors.black};
  border: 1px solid
    ${({ theme, saved }) => (saved ? theme.colors.white : theme.colors.black)};
`;

const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: black;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: "DiatypeBold";
  &:hover {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
  overflow-wrap: break-word;
  word-wrap: break-word;
`;
const Authors = styled.div`
  flex-grow: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

const Time = styled.div`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(8)}`};
  margin: ${({ theme }) => `${theme.space(4)} 0px`};
  border-radius: ${({ theme }) => theme.space(16)};
  border: 1px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const TimeWrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space(8)};
  left: ${({ theme }) => theme.space(8)};
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  height: fit-content;
`;

const ListItem = ({ element, numCol }) => {
  const { uiStore } = useStores();
  const router = useRouter();
  const linklocation = useMemo(() => {
    const pid = makeUrlFromId(element.id);
    if (router.pathname.includes("[pid]"))
      return router.pathname.replace("[pid]", pid);
    else if (router.pathname !== "/") {
      return `${router.pathname}/${pid}`;
    } else return `katalog/${pid}`;
  }, []);
  const handleAddSaved = (e, id) => {
    uiStore.addToSaved(e, id);
  };

  return (
    <ListItemWrapper padding={numCol > 2 ? 48 : 20}>
      <RestyledLink to={linklocation}>
        <ImageWrapper>
          <Image>
            <source
              srcSet={element.thumbnail}
              src={element.thumbnail_full_size}
            />
            <img
              src="/assets/img/missing.png"
              alt="missing image"
              style={{ width: "100%", height: "auto" }}
              onError={e => {
                e.target.onerror = null;
                e.currentTarget.parentNode.children[0].srcset =
                  "/assets/img/missing.png";
                e.currentTarget.parentNode.children[1].srcset =
                  "/assets/img/missing.png";
              }}
            />
          </Image>
          <SaveIcon
            saved={uiStore.isSaved(element.id)}
            onClick={e => handleAddSaved(e, element.id)}
          >
            <LocalizedText
              id={uiStore.isSaved(element.id) ? "saved" : "save"}
            />
          </SaveIcon>
          <TimeWrapper>
            {element.template == "event" && element.allocation?.temporal?.length
              ? element.allocation?.temporal?.slice(0, 3).map((t, i) => (
                  <Time key={`time-range-${t.start}-${i}-${t.end}`}>
                    <FormattedTime
                      value={(t.start - 7200) * 1000}
                      weekday="short"
                      hour="numeric"
                      minute="numeric"
                    />
                  </Time>
                ))
              : null}
          </TimeWrapper>
        </ImageWrapper>
        <Title>{element.name}</Title>
        <Authors>
          {[
            ...new Set(
              element.origin?.authors.map(a => (a.name ? a.name.split("@")[0].trim() : null)),
            ),
          ]
            .filter(a => a)
            .join(", ")}
        </Authors>
      </RestyledLink>
    </ListItemWrapper>
  );
};

export default observer(ListItem);
