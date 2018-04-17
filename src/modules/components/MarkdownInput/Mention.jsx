import React from "react";

const Entry = props => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className="mention">
        <div className="mention-thumb">{mention.get("stepNumber")}</div>

        <div className="mention-info">
          <div className="mention-header">{mention.get("name")}</div>

          <div className="mention-detail">{mention.get("stepName")}</div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
