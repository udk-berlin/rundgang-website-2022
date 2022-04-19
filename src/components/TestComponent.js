import React, { useCallback, useState, useEffect } from "react";
import { useStores } from "../stores/index";
import useDebounce from "hooks/useDebounce";
import { observer } from "mobx-react";

const TestComponent = () => {
  const { uiStore } = useStores();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const debouncedSearchTerm = useDebounce(value, 600);

  const handleChangeValue = e => {
    let text = e.target.value;
    console.log(uiStore.filterStore);
    uiStore.filterStore.parseText(text);
    setIsLoading(true);
    setValue(text);
  };

  useEffect(() => {
    setIsLoading(false);
    setResults(uiStore.filterStore.result);
  }, [debouncedSearchTerm]);

  return (
    <div>
      TEST
      <input value={value} onChange={handleChangeValue} />
      {isLoading ? "is loading" : "loaded"}
      {results}
    </div>
  );
};

export default observer(TestComponent);
