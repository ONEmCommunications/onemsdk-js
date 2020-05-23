const ATag = require("./a").ATag;
const BrTag = require("./br").BrTag;
const FooterTag = require("./footer").FooterTag;
const FormTag = require("./form").FormTag;
const HeaderTag = require("./header").HeaderTag;
const InputTag = require("./input").InputTag;
const LabelTag = require("./label").LabelTag;
const LiTag = require("./li").LiTag;
const LoginTag = require("./login").LoginTag;
const LogoutTag = require("./logout").LogoutTag;
const PTag = require("./p").PTag;
const SectionTag = require("./section").SectionTag;
const SnackbarTag = require("./snackbar").SnackbarTag;
const UlTag = require("./ul").UlTag;
const TextareaTag = require("./textarea").TextareaTag;
const ImgTag = require("./img").ImgTag;
const VideoTag = require("./video").VideoTag;

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
    login: LoginTag,
    logout: LogoutTag,
    p: PTag,
    section: SectionTag,
    snackbar: SnackbarTag,
    textarea: TextareaTag,
    ul: UlTag,
    img: ImgTag,
    video: VideoTag
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
exports.LoginTag = LoginTag;
exports.LogoutTag = LogoutTag;
exports.PTag = PTag;
exports.SectionTag = SectionTag;
exports.SnackbarTag = SnackbarTag;
exports.UlTag = UlTag;
exports.TextareaTag = TextareaTag;
exports.ImgTag = ImgTag;
exports.VideoTag = VideoTag;
// exports.Tag = Tag;
exports.getTagCls = getTagCls;
