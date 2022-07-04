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
  height: 670px;
  @media only screen and (max-width: 999px) {
    height: 640px;
  }
  @media only screen and (max-width: 690px) {
    height: 500px;
  }
  @media only screen and (max-width: 479px) {
    height: 300px;
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
  position: absolute;
  width: inherit;
  height: inherit;
  top: calc(50% - 100px);
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    top: calc(50% - 120px);
  }
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
          c => c.id == a.id[process.env.NODE_ENV],
        ),
        isFound: dataStore.api.locations.find(
          c => c.id == a.id[process.env.NODE_ENV],
        )?.name,
        id: a.id[process.env.NODE_ENV],
      }));
      setAddresses(adrr);
    }
  }, [dataStore.api.locations]);

  useEffect(() => {
    if (addresses?.length) {
      maplibregl.maxParallelImageRequests = 10;
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: [FIRSTLNG, FIRSTLAT],
        zoom: ZOOM,
        maxZoom: 18,
        minZoom: 11,
        pitchWithRotate: false,
        clickTolerance: 7,
        dragRotate: false,
        boxZoom: false,
        pitchWithRotate: false,
        touchPitch: false,
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
          let mRoot = null;
          if (el.id in markers) {
            console.log("already in markers");
            mRoot = markers[el.id].mRoot;
          } else {
            mRoot = createRoot(markerElement);
          }

          let size = el.image == "location-external" ? 20 : 60;
          mRoot.render(<GrundrissMarker el={el} size={size} />);

          // add marker to map
          const marker = new maplibregl.Marker(markerElement)
            .setLngLat([el.lng, el.lat])
            .addTo(map.current);

          markers[el.id] = { marker, mRoot, scale: 0 };
        });

        const filterLocations = () => {
          let bounds = map.current.getBounds();
          let filteredLocations = addresses.filter(el =>
            bounds.contains([el.lng, el.lat]),
          );
          if (filteredLocations?.length !== uiStore.zoomFiltered?.length) {
            uiStore.setZoomFiltered(filteredLocations.map(loc => loc.id));
          }
          return filteredLocations;
        };

        const redrawMarkers = filteredLocations => {
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
        };

        map.current.on("zoom", () => {
          const filteredLocations = filterLocations();
          redrawMarkers(filteredLocations);
        });

        map.current.on("click", e => {
          addresses.map(otherEl => {
            const otherElement = document.getElementById(`popup-${otherEl.id}`);
            otherElement.style.display = "none";
          });
          if (e.originalEvent.target.id) {
            let popId = e.originalEvent.target.id.replace("-marker", "");
            uiStore.setZoomFiltered([popId]);
            const popupElement = document.getElementById(`popup-${popId}`);
            popupElement.style.display = "block";
          }
        });

        map.current.on("mousedown", () => {
          filterLocations();
        });

        map.current.on("touchstart", () => {
          filterLocations();
        });
      });
    }
  }, [size, dataStore.api.locations, addresses]);

  return (
    <MapWrapper size={size}>
      <link href="/assets/css/maplibre-gl.css" rel="stylesheet" />
      <MapContainerDiv ref={mapContainer} />
      <Popups>
        {addresses.map((house, i) => (
          <GrundrissPopup key={`popup-${house.id}`} el={house} size={230} />
        ))}
      </Popups>
    </MapWrapper>
  );
};
export default observer(Map);
