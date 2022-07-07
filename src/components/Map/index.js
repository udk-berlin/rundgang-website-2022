import React, { useRef, useEffect, useState, useMemo } from "react";
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
  @media (min-height: 1200px) {
    height: 900px;
  }
  @media (max-width: 999px) {
    height: 640px;
  }
  @media (max-width: 690px) {
    height: 500px;
  }
  @media (max-width: 479px) {
    height: 300px;
  }
  @media (max-height: 800px) and (orientation: landscape) {
    height: 500px;
  }
  @media (max-height: 600px) and (orientation: landscape) {
    height: 400px;
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
const FIRSTLAT = 52.5215633;
const FIRSTLNG = 13.3491838;

const BOUNDS = [
  [13.2397254, 52.442394], // Southwest coordinates
  [13.4871903, 52.586099], // Northeast coordinates
];

const Map = () => {
  const { dataStore, uiStore } = useStores();
  const mapContainer = useRef(null);
  const map = useRef(null);

  const size = useWindowSize();

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (exactLocations && dataStore.api.locations && uiStore.filteredLocations) {
      const adrr = exactLocations.map(a => ({
        ...a,
        ...dataStore.api.locations.find(
          c => c.id == a.id[process.env.NODE_ENV],
        ),
        isFound: uiStore.filteredLocations.find(
          c => c.id == a.id[process.env.NODE_ENV],
        )?.id,
        id: a.id[process.env.NODE_ENV],
      }));
      setAddresses(adrr);
    }
  }, [dataStore.api.locations, uiStore.filteredLocations]);

  useEffect(() => {
    if (addresses?.length) {
      const ZOOM = size && size.width > 999 ? 12 : 10.5;
      //maplibregl.maxParallelImageRequests = 10;
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: [FIRSTLNG, FIRSTLAT],
        zoom: ZOOM,
        maxBounds: BOUNDS,
        maxZoom: 18,
        minZoom: 10,
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
            mRoot = markers[el.id].mRoot;
          } else {
            mRoot = createRoot(markerElement);
          }

          let markersize = el.image == "location-external" ? 20 : 60;
          mRoot.render(<GrundrissMarker el={el} size={markersize} />);

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
            const popupElement = document.getElementById(`popup-${popId}`);
            popupElement.style.display = "block";
          }
        });
      });
    }
  }, [size, addresses]);

  return (
    <MapWrapper size={size}>
      <link href="/assets/css/maplibre-gl.css" rel="stylesheet" />
      <MapContainerDiv ref={mapContainer} />
      <Popups>
        {addresses.map((house, i) => (
          <GrundrissPopup key={`popup-${house.id}`} el={house} size={290} />
        ))}
      </Popups>
    </MapWrapper>
  );
};
export default observer(Map);
