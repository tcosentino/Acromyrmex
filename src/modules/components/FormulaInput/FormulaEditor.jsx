import OurEditor from '../MarkdownInput/Editor';

const FORMULA_REGEX = /{{(\S*-*)([0-9a-zA-Z-]+)}}/g;
const FORMULA_MENTION_INDEX = 1;

const ATTRIBUTE_REGEX = /{{{(\S*-*)([0-9a-zA-Z-]+)}}}/g;
const ATTRIBUTE_MENTION_INDEX = 2;

class FormulaEditor extends OurEditor {
  constructor(props) {
    super(props);

    this.addMentionPlugin({
      regex: FORMULA_REGEX,
      index: FORMULA_MENTION_INDEX,
      trigger: '$',
    });

    this.addMentionPlugin({
      regex: ATTRIBUTE_REGEX,
      index: ATTRIBUTE_MENTION_INDEX,
      trigger: '#',
    });
  }
}

export default FormulaEditor;
