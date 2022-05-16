import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";
import useWindowSize from "@/hooks/useWindowSize";
import testAddresses from "./locationData.json";
import GrundrissMarker from "./GrundrissMarker";

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

const ZOOM = 11.3;
const FIRSTLAT = 52.513661;
const FIRSTLNG = 13.3286892;

const Map = () => {
  const { dataStore } = useStores();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://osm.udk-berlin.de/styles/toner/style.json",
      center: [FIRSTLNG, FIRSTLAT],
      zoom: ZOOM,
      maxZoom: 18,
      minZoom: 11,
    });
    map.current.on("load", function () {
      map.current.resize();
      const adrr = testAddresses.reduce(
        (obj, a, i) => ({
          ...obj,
          [a.image]: {
            ...a,
            id: `grundriss-${i}`,
            lat: a.coordinates.split(",")[0].trim(),
            lng: a.coordinates.split(",")[1].trim(),
          },
        }),
        {},
      );
      let addresses = Object.values(adrr);
      const markers = [];

      addresses.forEach((el, i) => {
        // create a DOM element for the marker
        const markerElement = document.createElement("div");
        markerElement.pitchAlignment = "map";
        markerElement.rotationAlignment = "map";
        ReactDOM.render(<GrundrissMarker el={el} size={60} />, markerElement);

        const popup = new maplibregl.Popup({
          maxWidth: "200px",
          height: "20px",
          zIndex: 200,
        }).setHTML(`<h3>${el.name}</h3>`);

        // add marker to map
        const marker = new maplibregl.Marker(markerElement)
          .setLngLat([el.lng, el.lat])
          .setPopup(popup)
          .addTo(map.current);

        markers[el.id] = { marker, markerElement };
      });

      map.current.on("zoomend", e => {
        let bounds = map.current.getBounds();
        let filteredLocations = addresses.filter(el =>
          bounds.contains([el.lng, el.lat]),
        );
        filteredLocations.map(el => {
          const scale = map.current.getZoom() - el.maxZoom;
          if (scale > 0) {
            console.log(scale, 60 * 2 ** scale);
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
  }, [size]);

  return (
    <MapWrapper width={size.width} height={size.height}>
      <MapContainerDiv ref={mapContainer} />
    </MapWrapper>
  );
};
export default observer(Map);
