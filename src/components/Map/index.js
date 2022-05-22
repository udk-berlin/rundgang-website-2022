import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";
import useWindowSize from "@/utils/useWindowSize";
import testAddresses from "./locationData.json";
import GrundrissMarker from "./GrundrissMarker";

const MapWrapper = styled.div`
  position: relative;
  top: 0vh;
  left: 1vw;
  width: ${({ size }) => `${size?.width * 0.66}px`};
  height: ${({ size }) => `${size?.height * 0.8}px`};
  padding-bottom: 100px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 90vh;
    height: 65vh;
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
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (testAddresses) {
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
      setAddresses(Object.values(adrr));
    }
  }, [testAddresses]);

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
      const markers = [];

      addresses.forEach((el, i) => {
        // create a DOM element for the marker
        const markerElement = document.createElement("div");
        markerElement.pitchAlignment = "map";
        markerElement.rotationAlignment = "map";
        ReactDOM.render(<GrundrissMarker el={el} size={60} />, markerElement);

        // add marker to map
        const marker = new maplibregl.Marker(markerElement)
          .setLngLat([el.lng, el.lat])
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
  }, [size, addresses]);

  return (
    <MapWrapper size={size} >
      <MapContainerDiv ref={mapContainer}/>
    </MapWrapper>
  );
};
export default observer(Map);
