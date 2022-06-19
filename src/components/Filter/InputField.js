import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import { useIntl } from "react-intl";
import AutoComplete from "./AutoComplete";

const Field = styled.input`
  color: ${({ theme }) => theme.colors.primary};
  background: inherit;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: ${({ theme, isOpen }) =>
    isOpen ? `4px solid ${theme.colors.highlight}` : "none"};
  height: 5vh;
  width: 100%;
  align-items: center;
  font-size: ${({ isOpen }) => (isOpen ? "3vh" : "5vh")};
  margin: ${({ theme, isOpen }) => (isOpen ? `${theme.spacing.sm}` : "0px")};
  :focus {
    outline: none;
  }
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.primary};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputFieldWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CloseButton = styled.div`
  font-family: "Diatype";
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-grow: 0;
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const InputField = ({ handleFocus, handleSubmit }) => {
  const { uiStore } = useStores();
  const { messages } = useIntl();
  const [value, setValue] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const hasContent = useMemo(() => value.length > 0, [value]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const _handleFocus = () => {
    handleFocus();
    setAutocompleteOpen(true);
  };

  const handleReset = e => {
    setValue("");
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSelect = () => {
    setValue("");
    setAutocompleteOpen(false);
    handleSubmit();
  };

  return (
    <InputFieldWrapper>
      <Field
        spellCheck="false"
        autoCorrect="false"
        autoCapitalize="false"
        value={value}
        onChange={handleChange}
        onFocus={_handleFocus}
        isOpen={uiStore.isOpen == "filter"}
        placeholder={
          uiStore.isOpen == "filter" ? messages.search : messages.filter
        }
      />
      {hasContent && <CloseButton onClick={handleReset}>&#57344;</CloseButton>}
      {hasContent && autocompleteOpen && (
        <AutoComplete searchValue={value} handleSelect={handleSelect} />
      )}
    </InputFieldWrapper>
  );
};

export default observer(InputField);
