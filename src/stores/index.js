import React, { useMemo } from "react";
import DataStore from "./DataStore";
import UiStore from "./UiStore";
import { MobXProviderContext, enableStaticRendering } from "mobx-react";
import { toJS } from "mobx";

enableStaticRendering(typeof window === "undefined");

let dataStore, uiStore;

export const getStoreInstances = snapshot => {
  const _dataStore = dataStore ?? new DataStore();
  const _uiStore = uiStore ?? new UiStore();

  // Connect stores to each other
  _uiStore.connect({ dataStore: _dataStore });

  if (snapshot) _dataStore.hydrate(snapshot);

  // For SSG and SSR always create a new store
  if (typeof window === "undefined")
    return {
      dataStore: _dataStore,
      uiStore: _uiStore,
    };

  // Create the stores only once in the client
  if (!dataStore) dataStore = _dataStore;
  if (!uiStore) uiStore = _uiStore;

  if (global.window) {
    window.__ds = dataStore;
    window.__us = uiStore;
    window.toJs = toJS;
  }
  return {
    dataStore,
    uiStore,
  };
};

export function useStoreInstances(snapshot) {
  const stores = useMemo(() => getStoreInstances(snapshot), [snapshot]);
  return stores;
}

export function useStores() {
  return React.useContext(MobXProviderContext);
}
