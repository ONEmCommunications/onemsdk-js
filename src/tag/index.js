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
const CardTag = require("./card").CardTag;
const CardActionTag = require("./cardaction").CardActionTag;
const CardActionsTag = require("./cardactions").CardActionsTag;
const CardAvatarTag = require("./cardavatar").CardAvatarTag;
const CardContentTag = require("./cardcontent").CardContentTag;
const CardHeaderTag = require("./cardheader").CardHeaderTag;
const CardMediaTag = require("./cardmedia").CardMediaTag;

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
    video: VideoTag,
    card: CardTag,
    cardaction: CardActionTag,
    cardactions: CardActionsTag,
    cardavatar: CardAvatarTag,
    cardcontent: CardContentTag,
    cardheader: CardHeaderTag,
    cardmedia: CardMediaTag
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
exports.CardTag = CardTag;
exports.CardActionTag = CardActionTag;
exports.CardActionsTag = CardActionsTag;
exports.CardAvatarTag = CardAvatarTag;
exports.CardContentTag = CardContentTag;
exports.CardHeaderTag = CardHeaderTag;
exports.CardMediaTag = CardMediaTag;
// exports.Tag = Tag;
exports.getTagCls = getTagCls;
