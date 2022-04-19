import React from "react";
import { makeAutoObservable, reaction } from "mobx";

class FilterStore {
  constructor() {
    this.parser = null;
    this.result = null;
    this.isInitialized = false;
    makeAutoObservable(this, {
      parser: false,
    });
  }

  initialize = () => {
    this.parser = "test";
    console.log("init uistore");

    this.isInitialized = true;
  };

  parseText(text) {
    this.result = text.toUpperCase();
    return this.result;
  }

  connect(parentStore) {
    this.apiStore = parentStore.apiStore;
    this.parentStore = parentStore;
  }
}
export default FilterStore;
