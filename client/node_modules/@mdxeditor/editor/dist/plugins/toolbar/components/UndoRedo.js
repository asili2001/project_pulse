import { mergeRegister } from "@lexical/utils";
import { CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_REDO_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import React__default from "react";
import RedoIcon from "../../../icons/redo.svg.js";
import UndoIcon from "../../../icons/undo.svg.js";
import { IS_APPLE } from "../../../utils/detectMac.js";
import { corePluginHooks } from "../../core/index.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
const UndoRedo = () => {
  const [activeEditor] = corePluginHooks.useEmitterValues("activeEditor");
  const [canUndo, setCanUndo] = React__default.useState(false);
  const [canRedo, setCanRedo] = React__default.useState(false);
  React__default.useEffect(() => {
    if (activeEditor) {
      return mergeRegister(
        activeEditor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        activeEditor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );
    }
  }, [activeEditor]);
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [
        {
          title: IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)",
          disabled: !canUndo,
          contents: /* @__PURE__ */ React__default.createElement(UndoIcon, null),
          active: false,
          onChange: () => activeEditor == null ? void 0 : activeEditor.dispatchCommand(UNDO_COMMAND, void 0)
        },
        {
          title: IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)",
          disabled: !canRedo,
          contents: /* @__PURE__ */ React__default.createElement(RedoIcon, null),
          active: false,
          onChange: () => activeEditor == null ? void 0 : activeEditor.dispatchCommand(REDO_COMMAND, void 0)
        }
      ]
    }
  );
};
export {
  UndoRedo
};
