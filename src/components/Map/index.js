import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";
import useWindowSize from "@/hooks/useWindowSize";

const MapWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  width: ${({ width }) => `${width * 0.6}px`};
  height: ${({ height }) => `${height * 0.7}px`};
  @media ${({ theme }) => theme.breakpoints.md} {
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height * 0.7}px`};
  }
`;

const MapContainerDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const ZOOM = 11.5;
const FIRSTLAT = 52.513661;
const FIRSTLNG = 13.3286892;
const markers = [];

const Map = () => {
  const { dataStore } = useStores();
  const [addresses, setAddresses] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://osm.udk-berlin.de/styles/toner/style.json", // stylesheet location
      center: [FIRSTLNG, FIRSTLAT], // starting position [lng, lat]
      zoom: ZOOM,
      maxZoom: 20,
      minZoom: 10,
    });
  }, [size]);

  useEffect(() => {
    if (dataStore.api.locations && map) {
      const adrr = Object.values(dataStore.api.locations);
      setAddresses(adrr);
      adrr.forEach(el => {
        const { lat, lng } = el.allocation.physical[0];
        // create a DOM element for the marker
        const markerElement = document.createElement("div");
        markerElement.style.backgroundImage = 'url("/assets/img/haus1.svg")';
        markerElement.style.backgroundRepeat = "no-repeat";
        markerElement.style.backgroundSize = "cover";
        markerElement.style.width = "86px";
        markerElement.style.height = "35px";
        markerElement.id = el.id;

        const popup = new maplibregl.Popup({
          maxWidth: "200px",
          height: "20px",
          zIndex: 100,
        }).setHTML(`<h3>${el.name}</h3>`);

        // add marker to map
        const marker = new maplibregl.Marker(markerElement)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current);

        markers.push(marker);
      });
    }
  }, [dataStore.api.locations]);

  return (
    <MapWrapper width={size.width} height={size.height}>
      <MapContainerDiv ref={mapContainer} />
    </MapWrapper>
  );
};
export default observer(Map);
