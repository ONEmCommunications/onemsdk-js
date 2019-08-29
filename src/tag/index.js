const ATag = require("./a").ATag;
const BrTag = require("./br").BrTag;
const FooterTag = require("./footer").FooterTag;
const FormTag = require("./form").FormTag;
const HeaderTag = require("./header").HeaderTag;
const InputTag = require("./input").InputTag;
const LabelTag = require("./label").LabelTag;
const LiTag = require("./li").LiTag;
const PTag = require("./p").PTag;
const SectionTag = require("./section").SectionTag;
const UlTag = require("./ul").UlTag;
// const Tag = require("./tag").Tag;

const tagClsMap = {
    a: ATag,
    br: BrTag,
    footer: FooterTag,
    form: FormTag,
    header: HeaderTag,
    input: InputTag,
    label: LabelTag,
    li: LiTag,
    p: PTag,
    section: SectionTag,
    ul: UlTag,
};

const getTagCls = function getTagCls(tagName) {
    return tagClsMap[tagName];
};


exports.ATag = ATag;
exports.BrTag = BrTag;
exports.FooterTag = FooterTag;
exports.FormTag = FormTag;
exports.HeaderTag = HeaderTag;
exports.InputTag = InputTag;
exports.LabelTag = LabelTag;
exports.LiTag = LiTag;
exports.PTag = PTag;
exports.SectionTag = SectionTag;
exports.UlTag = UlTag;
// exports.Tag = Tag;
exports.getTagCls = getTagCls;
