import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useCallback, useEffect, useMemo } from "react";
import { createEditor, Node, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import ClickAwayListener from "./ClickAwayListener";

const InputField = styled(Editable)`
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: "Helvetica";
  border: 3px solid #333;
  min-width: 12rem;
  padding: 0.25em 0.4em;
  height: 36px;
  flex-grow: 1;
  align-items: center;
`;

const SmartInputWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 16px;
`;

const PluginList = React.memo(({ plugins }) =>
  plugins
    .filter(p => p.render)
    .map(plugin => <plugin.render key={plugin.id} />),
);

PluginList.propTypes = {
  plugins: PropTypes.array,
};

PluginList.defaultProps = {
  plugins: [],
};

const SmartInput = ({ plugins, onSubmit, onChange, text, onFocus, onBlur }) => {
  const hasContent = useMemo(() => text.length > 0, [text]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const editorState = useMemo(
    () => [
      {
        type: "section",
        children: [
          {
            type: "paragraph",
            children: [
              {
                text,
              },
            ],
          },
        ],
      },
    ],
    [text],
  );

  const handleComponentDidMount = useCallback(() => {
    plugins.forEach(plugin => {
      if (plugin.attach) plugin.attach(editor);
    });
  }, [editor, plugins, text]);

  useEffect(handleComponentDidMount, [handleComponentDidMount]);

  const handleChange = useCallback(
    newValue => {
      if (!newValue) return false;
      const valueFromPlugins = plugins
        .filter(p => p.handleChange)
        .reduce((modifiedValue, plugin) => {
          return plugin.handleChange(modifiedValue, editor);
        }, newValue);
      const textFromChange = Node.string(valueFromPlugins[0]);
      if (onChange && textFromChange !== text) {
        onChange({ text: textFromChange });
      }
    },
    [plugins, editor, onChange, text],
  );

  // The decorate function
  const decorate = useCallback(
    ([node, path]) => {
      const rangesWithoutOverlap = plugins
        .filter(p => p.decorate)
        .reduce(
          (allRanges, currentPlugin) => [
            ...allRanges,
            ...currentPlugin
              .decorate([node, path])
              // Skip ranges that overlap with already defined ones
              .filter(
                newRange =>
                  !allRanges.some(range => Range.includes(range, newRange)),
              ),
          ],
          [],
        );
      return rangesWithoutOverlap;
    },
    [plugins],
  );

  const handleReturn = useCallback(() => {
    if (onSubmit) return onSubmit(text);
  }, [text, onSubmit]);
  // Call the onKeyDown handlers of all plugins

  const onKeyDown = useCallback(
    event => {
      const somePluginHasCapturedTheEvent = plugins
        .filter(f => f.onKeyDown)
        .reduce((theEventWasCaptured, plugin) => {
          // Continue evaluation if not captured yet
          if (!theEventWasCaptured) {
            theEventWasCaptured = plugin.onKeyDown(event) || false;
          }
          return theEventWasCaptured;
        }, false);

      const isEnter = event.key === "Enter";

      // Any plugin can catch + stop the event for all following plugins (+ eventually the editor) by returning true
      if (somePluginHasCapturedTheEvent || isEnter) {
        event.preventDefault();
        event.stopPropagation();
      }

      // If plugin captured the event stop here
      if (somePluginHasCapturedTheEvent) return false;
      if (isEnter) {
        handleReturn();
        return false;
      }
    },
    [plugins, handleReturn],
  );

  const handleClick = useCallback(() => {
    onFocus();
    ReactEditor.focus(editor);
  }, [editor]);

  const handleReset = useCallback(
    e => {
      ReactEditor.focus(editor);
      if (editor.selection) {
        const path = editor.selection.anchor.path;
        Transforms.setSelection(editor, {
          anchor: { path, offset: 0 },
          focus: { path, offset: text.length },
        });
        Transforms.delete(editor);
        ReactEditor.deselect(editor);
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [text, editor, onChange],
  );

  // A `Leaf` is a part of text that contains identical `decorate` properties.
  // Every plugin can provide a `renderLeaf` function.
  // The first result of any renderLeaf plugin will be rendered.
  const renderLeaf = useCallback(
    leafProps => {
      const {
        leaf: { text },
      } = leafProps;
      if (hasContent && text === "") return null;
      const pluginLeafResult = plugins
        .filter(p => p.renderLeaf)
        .reduce((previousResult, plugin) => {
          if (previousResult) return previousResult;
          return plugin.renderLeaf(leafProps) || null;
        }, null);
      // Return default span when no plugin is responsible for leaf rendering
      return (
        <span>
          {pluginLeafResult || (
            <span {...leafProps.attributes}>{leafProps.children}</span>
          )}
        </span>
      );
    },
    [plugins, hasContent],
  );

  // TODO: Necessary until https://github.com/ianstormtaylor/slate/issues/3321 is fixed
  const keyToTriggerRerender = useMemo(() => `SLATE-FAKE-KEY`);

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <SmartInputWrapper onClick={handleClick}>
        <Slate
          key={keyToTriggerRerender}
          editor={editor}
          value={editorState}
          onChange={handleChange}
        >
          <InputField
            spellCheck="false"
            autoCorrect="false"
            autoCapitalize="false"
            decorate={decorate}
            onKeyDown={onKeyDown}
            renderLeaf={renderLeaf}
            placeholder={"TYPE STH..."}
          />
        </Slate>
        {hasContent && <div onClick={handleReset}>X</div>}
        <PluginList plugins={plugins} />
      </SmartInputWrapper>
    </ClickAwayListener>
  );
};

SmartInput.defaultProps = {
  text: "",
  isLoading: false,
  isDisabled: false,
  allowSubmission: false,
  onChange: () => {},
  onSubmit: () => {},
  onFocus: () => {},
  onBlur: () => {},
  className: "",
  editorProps: {
    readOnly: false,
  },
  plugins: [],
};

SmartInput.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  allowSubmission: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  editorProps: PropTypes.object,
  plugins: PropTypes.array,
};

export default SmartInput;