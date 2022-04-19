import React from "react";
import { makeAutoObservable, reaction } from "mobx";

class FilterStore {
  constructor() {
    this.api = null;
    this.isInitialized = false;
    makeAutoObservable(this, {
      api: false,
    });
  }

  initialize = () => {
    this.api = "test";

    this.isInitialized = true;
  };

  connect(parentStore) {
    this.parentStore = parentStore;
  }
}
export default FilterStore;
