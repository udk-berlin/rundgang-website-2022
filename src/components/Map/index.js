import React, { useRef, useEffect, useState, useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react";
import { createRoot } from "react-dom/client";
import maplibregl from "maplibre-gl";
import { useStores } from "@/stores/index";
import useWindowSize from "@/utils/useWindowSize";
import exactLocations from "./locationData.json";
import GrundrissMarker from "./GrundrissMarker";
import GrundrissPopup from "./GrundrissPopup";

const MapWrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 700px;
  @media only screen and (max-width: 999px) {
    height: 640px;
  }
  @media only screen and (max-width: 690px) {
    height: 500px;
  }
  @media only screen and (max-width: 479px) {
    height: 400px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: auto;
  }
`;

const MapContainerDiv = styled.div`
  width: 100%;
  height: 100%;
`;


const Popups = styled.div`
  display: none;
`;
const MAP_STYLE =
  "https://api.maptiler.com/maps/0c31e459-4801-44f9-a78e-7404c9e2ece1/style.json?key=xOE99p3irw1zge6R9iKY";
const FIRSTLAT = 52.5093753;
const FIRSTLNG = 13.3302138;

const Map = () => {
  const { dataStore, uiStore } = useStores();
  const mapContainer = useRef(null);
  const map = useRef(null);

  const size = useWindowSize();

  const ZOOM = size?.width > 999 ? 12.5 : 11.3;
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (exactLocations && dataStore.api.locations) {
      const adrr = exactLocations.map(a => ({
        ...a,
        ...dataStore.api.locations.find(
          c => c.id == a.id.development,
        ),
        isFound: dataStore.api.locations.find(
          c => c.id == a.id.development,
        )?.name,
      }));
      setAddresses(adrr);
    }
  }, [dataStore.api.locations]);

  useEffect(() => {
    if (addresses?.length) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: [FIRSTLNG, FIRSTLAT],
        zoom: ZOOM,
        maxZoom: 18,
        minZoom: 11,
      });

      var nav = new maplibregl.NavigationControl();
      map.current.addControl(nav, "bottom-right");
      map.current.on("load", () => {
        map.current.resize();
        let markers = {};

        addresses.forEach((el, i) => {
          // create a DOM element for the marker
          const markerElement = document.createElement("div");
          markerElement.pitchAlignment = "map";
          markerElement.rotationAlignment = "map";
          const mRoot = createRoot(markerElement);
          let size = el.image == "location-external" ? 20 : 60;
          mRoot.render(<GrundrissMarker el={el} size={size} />);

          // add marker to map
          const marker = new maplibregl.Marker(markerElement)
            .setLngLat([el.lng, el.lat])
            .addTo(map.current);

          const addPopup = () => {
            // add poopup
            const popupElement = document.getElementById(`popup-${el.id}`);
            const popup = new maplibregl.Popup()
              .setLngLat([el.lng, el.lat])
              .setDOMContent(popupElement);
            marker.setPopup(popup);
          };
          marker.getElement().addEventListener("click", addPopup);

          markers[el.id] = { marker, mRoot, scale: 0 };
        });

        map.current.on("zoom", e => {
          let bounds = map.current.getBounds();
          let filteredLocations = addresses.filter(el =>
            bounds.contains([el.lng, el.lat]),
          );
          if (filteredLocations?.length !== uiStore.zoomFiltered?.length) {
            uiStore.setZoomFiltered(filteredLocations.map(loc => loc.id));
          }
          filteredLocations.map(el => {
            const scale = map.current.getZoom() - el.maxZoom;
            if (el.image !== "location-external") {
              if (scale !== markers[el.id].scale && scale > 0) {
                markers[el.id].scale = scale;
                markers[el.id].mRoot.render(
                  <GrundrissMarker el={el} size={60 * 2 ** scale} />,
                );
              } else if (markers[el.id].scale > 0 && scale <= 0) {
                markers[el.id].scale = scale;
                markers[el.id].mRoot.render(
                  <GrundrissMarker el={el} size={60} />,
                );
              }
            }
          });
        });
      });
    }
  }, [size, dataStore.api.locations, addresses]);

  return (
    <MapWrapper size={size}>
      <Popups>
        {addresses.map((house, i) => (
          <GrundrissPopup key={`popup-${house.id}`} el={house} size={210} />
        ))}
      </Popups>
      <MapContainerDiv ref={mapContainer} />
    </MapWrapper>
  );
};
export default observer(Map);
