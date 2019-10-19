import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  SplitButton,
  MenuItem,
  Overlay,
  Popover,
  FormControl,
  Col,
  FormGroup
} from 'react-bootstrap';

const ToolbarButton = props => {
  const { onClick, children, ...otherProps } = props;

  return (
    <Button
      bsStyle="primary"
      bsSize="xsmall"
      {...otherProps}
      onMouseDown={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  );
};

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

class Toolbar extends React.Component {
  constructor() {
    super();

    this.state = {
      popoverTarget: null,
      showLinkOverlay: false,
      linkText: ''
    };
  }

  render() {
    const {
      onInlineClicked,
      onBlockClicked,
      onUndoClicked,
      onRedoClicked,
      onLinkClicked,
      onUnlinkClicked,
      undoSize,
      redoSize,
      blockType,
      selection,
      getEntityAtCursor
    } = this.props;

    const { linkText, showLinkOverlay, popoverTarget } = this.state;
    const entity = getEntityAtCursor();

    return (
      <div>
        <ButtonGroup>
          <ToolbarButton
            onClick={() => {
              onInlineClicked('BOLD');
            }}
          >
            <i className="fa fa-bold" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              onInlineClicked('ITALIC');
            }}
          >
            <i className="fa fa-italic" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              onInlineClicked('CODE');
            }}
          >
            <i className="fa fa-code" />
          </ToolbarButton>
        </ButtonGroup>{' '}
        <ButtonGroup>
          <ToolbarButton
            active={blockType === 'unordered-list-item'}
            onClick={() => {
              onBlockClicked('unordered-list-item');
            }}
          >
            <i className="fa fa-list-ul" />
          </ToolbarButton>
          <ToolbarButton
            active={blockType === 'ordered-list-item'}
            onClick={() => {
              onBlockClicked('ordered-list-item');
            }}
          >
            <i className="fa fa-list-ol" />
          </ToolbarButton>
          <ToolbarButton
            active={blockType === 'blockquote'}
            onClick={() => {
              onBlockClicked('blockquote');
            }}
          >
            <i className="fa fa-quote-right" />
          </ToolbarButton>
          <SplitButton
            title="Normal"
            bsSize="xsmall"
            bsStyle="primary"
            id="formatting-split"
            active={blockType === 'unstyled'}
            onClick={() => {
              onBlockClicked('normal');
            }}
          >
            <MenuItem
              active={blockType === 'header-one'}
              onClick={() => {
                onBlockClicked('header-one');
              }}
            >
              Heading Large
            </MenuItem>
            <MenuItem
              active={blockType === 'header-two'}
              onClick={() => {
                onBlockClicked('header-two');
              }}
            >
              Heading Medium
            </MenuItem>
            <MenuItem
              active={blockType === 'header-three'}
              onClick={() => {
                onBlockClicked('header-three');
              }}
            >
              Heading Small
            </MenuItem>
            <MenuItem
              active={blockType === 'code-block'}
              onClick={() => {
                onBlockClicked('code-block');
              }}
            >
              Code Block
            </MenuItem>
          </SplitButton>
        </ButtonGroup>{' '}
        <ButtonGroup>
          <ToolbarButton
            onClick={e => {
              this.setState({
                showLinkOverlay: !showLinkOverlay,
                popoverTarget: e.currentTarget
              });
              // onLinkClicked();
            }}
            disabled={selection.isCollapsed()}
          >
            <i className="fa fa-link" />
          </ToolbarButton>
          <Overlay
            placement="bottom"
            target={popoverTarget}
            show={showLinkOverlay}
            container={this}
          >
            <Popover style={{ marginLeft: 22, marginTop: 15 }} id="link-popover">
              <FormGroup bsSize="small" className="clearfix" style={{ padding: 0, margin: 0 }}>
                <Col xs={8} style={{ padding: 0, margin: 0 }}>
                  <FormControl
                    type="text"
                    placeholder="http://"
                    value={linkText}
                    onChange={e => {
                      this.setState({ linkText: e.target.value });
                    }}
                  />
                </Col>
                <Col xs={4} style={{ padding: 0, paddingLeft: 3 }}>
                  <ButtonGroup>
                    <ToolbarButton
                      onClick={() => {
                        onLinkClicked(linkText);
                        this.setState({ showLinkOverlay: false });
                      }}
                      disabled={linkText.length < 1}
                      bsSize="small"
                      bsStyle="success"
                    >
                      <i className="fa fa-check" />
                    </ToolbarButton>
                    <ToolbarButton
                      onClick={() => {
                        this.setState({ showLinkOverlay: false });
                      }}
                      disabled={linkText.length < 1}
                      bsSize="small"
                      bsStyle="danger"
                    >
                      <i className="fa fa-times" />
                    </ToolbarButton>
                  </ButtonGroup>
                </Col>
              </FormGroup>
            </Popover>
          </Overlay>
          <ToolbarButton
            onClick={onUnlinkClicked}
            disabled={entity == null || entity.type !== 'LINK'}
          >
            <i className="fa fa-unlink" />
          </ToolbarButton>
        </ButtonGroup>{' '}
        <ButtonGroup>
          <ToolbarButton onClick={onUndoClicked} disabled={undoSize === 0}>
            <i className="fa fa-undo" />
          </ToolbarButton>
          <ToolbarButton onClick={onRedoClicked} disabled={redoSize === 0}>
            <i className="fa fa-repeat" />
          </ToolbarButton>
        </ButtonGroup>
      </div>
    );
  }
}

Toolbar.propTypes = {
  onInlineClicked: PropTypes.func.isRequired,
  onBlockClicked: PropTypes.func.isRequired,
  onUndoClicked: PropTypes.func.isRequired,
  onRedoClicked: PropTypes.func.isRequired,
  onLinkClicked: PropTypes.func.isRequired,
  onUnlinkClicked: PropTypes.func.isRequired,
  undoSize: PropTypes.number.isRequired,
  redoSize: PropTypes.number.isRequired,
  blockType: PropTypes.string.isRequired,
  selection: PropTypes.shape().isRequired,
  getEntityAtCursor: PropTypes.func.isRequired
};

export default Toolbar;
