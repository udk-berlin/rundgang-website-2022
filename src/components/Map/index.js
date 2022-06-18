import React, { useRef, useEffect, useState } from "react";
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
  width: 60vw;
  height: 70vh;
  margin: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 90vw;
    height: 70vh;
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
    if (exactLocations && dataStore.api.locations) {
      const adrr = exactLocations.map(a => ({
        ...a,
        ..._.values(dataStore.api.locations.children).find(
          c => c.name == a.image,
        ),
        name: a.name,
        isFound: dataStore.api.locations.children[a.id]?.name,
      }));
      setAddresses(adrr);
    }
  }, [exactLocations, dataStore.api.locations]);

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
      map.current.on("load", () => {
        map.current.resize();
        let markers = {};

        addresses.forEach((el, i) => {
          // create a DOM element for the marker
          const markerElement = document.createElement("div");
          markerElement.pitchAlignment = "map";
          markerElement.rotationAlignment = "map";
          const mRoot = createRoot(markerElement);
          mRoot.render(<GrundrissMarker el={el} size={60} />);

          // add marker to map
          const marker = new maplibregl.Marker(markerElement)
            .setLngLat([el.lng, el.lat])
            .addTo(map.current);

          markers[el.id] = { marker, mRoot, scale: 0 };

          marker.getElement().addEventListener("click", () => {
            const popupElement = document.getElementById(`popup-${el.id}`);
            const popup = new maplibregl.Popup()
              .setLngLat([el.lng, el.lat])
              .setDOMContent(popupElement);
            marker.setPopup(popup);
          });
        });

        map.current.on("zoomend", e => {
          let bounds = map.current.getBounds();
          let filteredLocations = addresses.filter(el =>
            bounds.contains([el.lng, el.lat]),
          );
          filteredLocations.map(el => {
            const scale = map.current.getZoom() - el.maxZoom;
            if (el.image == "haus9") {
            }
            if (scale !== markers[el.id].scale && scale > 0) {
              markers[el.id].mRoot.render(
                <GrundrissMarker el={el} size={60 * 2 ** scale} />,
              );
            } else if (markers[el.id].scale > 0 && scale < 0) {
              markers[el.id].mRoot.render(
                <GrundrissMarker el={el} size={60} />,
              );
            }
          });
        });
      });
    }
  }, [size, dataStore.api.locations, addresses]);

  return (
    <MapWrapper size={size}>
      <Popups>
        {addresses.map(house => (
          <GrundrissPopup key={`popup-${house.image}`} el={house} size={180} />
        ))}
      </Popups>
      <MapContainerDiv ref={mapContainer} />
    </MapWrapper>
  );
};
export default observer(Map);
