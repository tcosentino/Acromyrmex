import React from 'react';
import Select from 'react-select';
import TetherComponent from 'react-tether';

/* from https://github.com/JedWatson/react-select/issues/810#issuecomment-250274937 */
export default class TetheredSelectWrap extends Select {
  constructor(props) {
    super(props);

    this.renderOuter = this._renderOuter;
  }

  _renderOuter(...rest) {
    const menu = super.renderOuter.apply(this, rest);

    // Don't return an updated menu render if we don't have one
    if (!menu) {
      return;
    }

    /* this.wrapper comes from the ref of the main Select component (super.render()) */
    const selectWidth = this.wrapper ? this.wrapper.offsetWidth : null;

    return (
      <TetherComponent
        attachment="top left"
        constraints={[
          {
            to: 'window',
            attachment: 'together',
            pin: ['top']
          }
        ]}
        renderElementTo="body"
        targetAttachment="top left"
        renderTarget={ref => <div ref={ref} />}
        renderElement={ref => (
          <div ref={ref}>
            <div />
            {React.cloneElement(menu, {
              style: { position: 'static', width: selectWidth }
            })}
          </div>
        )}
      />
    );
  }
}
