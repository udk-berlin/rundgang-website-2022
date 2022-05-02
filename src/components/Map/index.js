import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";

const MapWrapper = styled.div`
  width: 700px;
  background: #888;
  height: 400px;
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

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://osm.udk-berlin.de/styles/toner/style.json", // stylesheet location
      center: [FIRSTLNG, FIRSTLAT], // starting position [lng, lat]
      zoom: ZOOM,
      maxZoom: 20,
      minZoom: 10,
    });
  }, []);

  useEffect(() => {
    if (dataStore.apiStore.locations && map) {
      const adrr = Object.values(dataStore.apiStore.locations);
      setAddresses(adrr);
      adrr.forEach((el, index) => {
        const { lat, lng } = el.allocation.physical[0];
        console.log(el.name);
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
  }, [dataStore.apiStore.locations]);

  return <MapWrapper ref={mapContainer} />;
};
export default observer(Map);
