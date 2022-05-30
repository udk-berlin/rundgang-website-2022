import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";
import useWindowSize from "@/utils/useWindowSize";
import exactLocations from "./locationData.json";
import GrundrissMarker from "./GrundrissMarker";
import GrundrissPopup from "./GrundrissPopup";

const MapWrapper = styled.div`
  position: relative;
  top: 0vh;
  left: 1vw;
  width: 70vw;
  height: 60vh;
  padding: ${({ theme }) => theme.spacing.lg};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 90vw;
    height: 70vh;
  }
`;

const MapContainerDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const ZOOM = 11.3;
const FIRSTLAT = 52.513661;
const FIRSTLNG = 13.3286892;

const Map = () => {
  const { dataStore } = useStores();
  const { locale } = useRouter();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const size = useWindowSize();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (exactLocations && dataStore.api.locations) {
      const adrr = exactLocations.map(a => ({
        ...a,
        ...(a.id in dataStore.api.locations.children
          ? dataStore.api.locations.children[a.id]
          : {}),
      }));
      setAddresses(adrr);
    }
  }, [exactLocations, dataStore.api.locations]);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://osm.udk-berlin.de/styles/toner/style.json",
      center: [FIRSTLNG, FIRSTLAT],
      zoom: ZOOM,
      maxZoom: 18,
      minZoom: 11,
    });
    map.current.on("load", () => {
      map.current.resize();
      const markers = [];

      addresses.forEach((el, i) => {
        // create a DOM element for the marker
        const markerElement = document.createElement("div");
        markerElement.pitchAlignment = "map";
        markerElement.rotationAlignment = "map";
        ReactDOM.render(<GrundrissMarker el={el} size={60} />, markerElement);

        const popupElement = document.createElement("div");
        ReactDOM.render(
          <GrundrissPopup el={el} locale={locale} />,
          popupElement,
        );

        const popup = new maplibregl.Popup()
          .setLngLat([el.lng, el.lat])
          .setDOMContent(popupElement);

        // add marker to map
        const marker = new maplibregl.Marker(markerElement)
          .setLngLat([el.lng, el.lat])
          .setPopup(popup)
          .addTo(map.current);

        markers[el.id] = { marker, markerElement };
        marker.getElement().addEventListener("click", () => {
          console.log("Clicked", el.id);
        });
      });

      map.current.on("zoomend", e => {
        let bounds = map.current.getBounds();
        let filteredLocations = addresses.filter(el =>
          bounds.contains([el.lng, el.lat]),
        );
        filteredLocations.map(el => {
          const scale = map.current.getZoom() - el.maxZoom;
          if (scale > 0) {
            ReactDOM.render(
              <GrundrissMarker el={el} size={60 * 2 ** scale} />,
              markers[el.id].markerElement,
            );
          } else {
            ReactDOM.render(
              <GrundrissMarker el={el} size={60} />,
              markers[el.id].markerElement,
            );
          }
        });
      });
    });
  }, [size, dataStore.api.locations]);

  return (
    <MapWrapper size={size}>
      <MapContainerDiv ref={mapContainer} />
    </MapWrapper>
  );
};
export default observer(Map);
