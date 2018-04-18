"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Entry = function Entry(props) {
  var mention = props.mention,
      theme = props.theme,
      searchValue = props.searchValue,
      isFocused = props.isFocused,
      parentProps = _objectWithoutProperties(props, ["mention", "theme", "searchValue", "isFocused"]);

  return _react2.default.createElement(
    "div",
    parentProps,
    _react2.default.createElement(
      "div",
      { className: "mention" },
      _react2.default.createElement(
        "div",
        { className: "mention-thumb" },
        mention.get("stepNumber")
      ),
      _react2.default.createElement(
        "div",
        { className: "mention-info" },
        _react2.default.createElement(
          "div",
          { className: "mention-header" },
          mention.get("name")
        ),
        _react2.default.createElement(
          "div",
          { className: "mention-detail" },
          mention.get("stepName")
        )
      )
    )
  );
};

exports.default = Entry;