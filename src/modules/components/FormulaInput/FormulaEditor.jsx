import OurEditor from '../MarkdownInput/Editor';
import './FormulaEditor.css';

// const TEMPLATE_REGEX = /{([0-9a-zA-Z-.$_]+)}/g;
// const OPTION_MENTION_INDEX = 0;

const FORMULA_REGEX = /\$(\S*-*)([0-9a-zA-Z-]+)\$/g;
const FORMULA_MENTION_INDEX = 1;

const ATTRIBUTE_REGEX = /#(\S*-*)([0-9a-zA-Z-]+)#/g;
const ATTRIBUTE_MENTION_INDEX = 2;

class FormulaEditor extends OurEditor {
  // eslint-disable-next-line class-methods-use-this
  extraMentions() {
    return [
      {
        regex: FORMULA_REGEX,
        index: FORMULA_MENTION_INDEX,
        trigger: '$',
        suggestionProp: 'formulas',
        theme: {
          mention: 'mention-formula'
        }
      },
      {
        regex: ATTRIBUTE_REGEX,
        index: ATTRIBUTE_MENTION_INDEX,
        trigger: '#',
        suggestionProp: 'attributes',
        theme: {
          mention: 'mention-attribute'
        }
      }
    ];
  }
}

export default FormulaEditor;
