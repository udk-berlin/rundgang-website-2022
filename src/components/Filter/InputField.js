import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import AutoComplete from "./AutoComplete";
import { SEARCHBAR_HEIGHT } from "@/utils/constants";
import { useIntl } from "react-intl";

const Field = styled.input`
  cursor: pointer !important;
  color: ${({ theme }) => theme.colors.primary};
  background: inherit;
  border: ${({ theme }) => `4px solid ${theme.colors.highlight}`};
  height: ${SEARCHBAR_HEIGHT}px;
  width: 100%;
  margin: ${({ theme }) => theme.space(8)};
  align-items: center;
  padding: 0;
  padding-left: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  :focus {
    outline: 1px solid #333;
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
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const InputFieldWrapper = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
`;

const CloseButton = styled.div`
  font-family: "Diatype";
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-grow: 0;
  padding: ${({ theme }) => `0 ${theme.space(8)}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const InputField = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const hasContent = useMemo(() => value.length > 0, [value]);
  const intl = useIntl()

  const handleChange = e => {
    setValue(e.target.value);
  };

  const _handleFocus = () => {
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
        placeholder={intl.formatMessage({ id: "search" })}
      />
      {hasContent && <CloseButton onClick={handleReset}>&#57344;</CloseButton>}
      {hasContent && autocompleteOpen && (
        <AutoComplete
          searchValue={value}
          handleSelect={handleSelect}
          handleReset={handleReset}
        />
      )}
    </InputFieldWrapper>
  );
};

export default observer(InputField);
