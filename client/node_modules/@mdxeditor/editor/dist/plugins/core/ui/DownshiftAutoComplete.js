import { useCombobox } from "downshift";
import React__default from "react";
import { Controller } from "react-hook-form";
import styles from "../../../styles/ui.module.css.js";
import DropDownIcon from "../../../icons/arrow_drop_down.svg.js";
const MAX_SUGGESTIONS = 20;
const DownshiftAutoComplete = ({ autofocus, suggestions, control, inputName, placeholder, initialInputValue, setValue }) => {
  const [items, setItems] = React__default.useState(suggestions.slice(0, MAX_SUGGESTIONS));
  const enableAutoComplete = suggestions.length > 0;
  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
    initialInputValue,
    onInputValueChange({ inputValue = "" }) {
      setValue(inputName, inputValue);
      inputValue = (inputValue == null ? void 0 : inputValue.toLowerCase()) || "";
      const matchingItems = [];
      for (const suggestion of suggestions) {
        if (suggestion.toLowerCase().includes(inputValue)) {
          matchingItems.push(suggestion);
          if (matchingItems.length >= MAX_SUGGESTIONS) {
            break;
          }
        }
      }
      setItems(matchingItems);
    },
    items,
    itemToString(item) {
      return item ?? "";
    }
  });
  const dropdownIsVisible = isOpen && items.length > 0;
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.downshiftAutocompleteContainer }, /* @__PURE__ */ React__default.createElement("div", { "data-visible-dropdown": dropdownIsVisible, className: styles.downshiftInputWrapper }, /* @__PURE__ */ React__default.createElement(
    Controller,
    {
      name: inputName,
      control,
      render: ({ field }) => {
        const downshiftSrcProps = getInputProps();
        return /* @__PURE__ */ React__default.createElement(
          "input",
          {
            ...downshiftSrcProps,
            name: field.name,
            placeholder,
            className: styles.downshiftInput,
            size: 30,
            "data-editor-dialog": true,
            autoFocus: autofocus
          }
        );
      }
    }
  ), enableAutoComplete && /* @__PURE__ */ React__default.createElement("button", { "aria-label": "toggle menu", type: "button", ...getToggleButtonProps() }, /* @__PURE__ */ React__default.createElement(DropDownIcon, null))), /* @__PURE__ */ React__default.createElement("div", { className: styles.downshiftAutocompleteContainer }, /* @__PURE__ */ React__default.createElement("ul", { ...getMenuProps(), "data-visible": dropdownIsVisible }, items.map((item, index) => /* @__PURE__ */ React__default.createElement(
    "li",
    {
      "data-selected": selectedItem === item,
      "data-highlighted": highlightedIndex === index,
      key: `${item}${index}`,
      ...getItemProps({ item, index })
    },
    item
  )))));
};
export {
  DownshiftAutoComplete
};
