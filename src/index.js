const snakecase = require('snakecase-keys');
const tags = require('./tag');
const UlTag = tags.UlTag,
    SectionTag = tags.SectionTag,
    FormTag = tags.FormTag,
    LiTag = tags.LiTag,
    ATag = tags.ATag,
    PTag = tags.PTag,
    HeaderTag = tags.HeaderTag,
    FooterTag = tags.FooterTag,
    InputTag = tags.InputTag,
    LoginTag = tags.LoginTag,
    LogoutTag = tags.LogoutTag,
    TextareaTag = tags.TextareaTag,
    ImgTag = tags.ImgTag,
    VideoTag = tags.VideoTag,
    SnackbarTag = tags.SnackbarTag,
    CardTag = tags.CardTag,
    CardActionTag = tags.CardActionTag,
    CardActionsTag = tags.CardActionsTag,
    CardAvatarTag = tags.CardAvatarTag,
    CardContentTag = tags.CardContentTag,
    CardHeaderTag = tags.CardHeaderTag,
    CardMediaTag = tags.CardMediaTag;

/**
 Instantiates a new Card

 @class Card
 @classdesc A Card object as defined in the JSON schema

 @param {object} props - Properties to initialize the `Card` with
 @param {CardHeader} [props.header] - Sets {@link Card#header}
 @param {string} [props.src] - Sets {@link Card#media}
 @param {string} [props.title] - Sets {@link Card#title}
 @param {string} [props.subtitle] - Sets {@link Card#subtitle}
 @param {string} [props.description] - Sets {@link Card#description}
 @param {Array<CardAction>} [props.actions] - Sets {@link Card#actions}
 */
function Card(props) {

    /**
     * CardHeader object
     * 
     @name Card#header
     @type {CardHeader}
     */
    this.header = props.header || null;

    /**
     Link to public url for card media (image, mp4, youtube or vimeo)

     @name Card#src
     @type {string}
     */
    this.src = props.src || null;

    /**
     Card title in main card body

     @name Card#title
     @type {string}
     */
    this.title = props.title || null;

    /**
     Card subtitle in main card body

     @name Card#subtitle
     @type {string}
     */
    this.subtitle = props.subtitle || null;

    /**
     Card content in main card body

     @name Card#description
     @type {string}
     */
    this.description = props.description || null;

    /**
     Array of card actions

     @name Card#actions
     @type {Array<CardAction>}
     */
    this.actions = props.actions || null;

}

/**
 * Creates a Card from a CardTag
 * @param {CardTag} cardTag
 * @returns {Card}
 */
Card.fromTag = function (cardTag) {
    let description, header, src, title, subtitle, actions;

    for (const child of cardTag.children) {
        if (child instanceof CardHeaderTag) {
            header = CardHeader.fromTag(child);
        } else if (child instanceof CardMediaTag) {
            src = child.attrs.src;         
        } else if (child instanceof CardContentTag) {
            description = child.attrs.content
            title = child.attrs.title;
            subtitle = child.attrs.subtitle;
        } else if (child instanceof CardActionsTag && child.children.length && !actions) {
            actions = [];
            child.children.forEach(function (cardActionTag) {
                if (cardActionTag instanceof CardActionTag) {
                    actions.push(CardAction.fromTag(cardActionTag));
                } else {
                    throw Error("Unexpected tag in <cardactions>, expecting <cardaction>");
                }
            });
        } else {
            throw Error("Unexpected tag in <card>, expecting one of: <cardheader>, <cardcontent>, <cardmedia>, <cardactions>")
        }
    }

    return new Card({
        header: header,
        src: src,
        title: title,
        subtitle: subtitle,
        description: description,
        actions: actions
    });
};

/**
 Instantiates a new CardHeader

 @class CardHeader
 @classdesc A CardHeader object as defined in the JSON schema

 @param {object} props - Properties to initialize the `CardHeader` with
 @param {string} props.title - Sets {@link CardHeader#title}
 @param {string} [props.subtitle] - Sets {@link CardHeader#subtitle}
 @param {CardAvatar} [props.avatar] - Sets {@link CardHeader#avatar}
 */
function CardHeader(props) {

    /**
     Card title of the card header

     @name CardHeader#title
     @type {string}
     */
    this.title = props.title;
    if (!this.title) {
        throw Error("CardHeader title is mandatory")
    }

    /**
     Card subtitle in main card body

     @name CardHeader#subtitle
     @type {string}
     */
    this.subtitle = props.subtitle || null;

    /**
     Card subtitle in main card body

     @name CardHeader#avatar
     @type {CardAvatar}
     */
    this.avatar = props.avatar || null;    

}

/**
 * Creates a CardHeader from a CardHeaderTag
 * @param {CardHeaderTag} cardHeaderTag
 * @returns {CardHeader}
 */
CardHeader.fromTag = function (cardHeaderTag) {
    let processedAvatar = false;
    let avatar = null;

    for (const child of cardHeaderTag.children) {
        if (child instanceof CardAvatarTag && !processedAvatar) {
            avatar = new CardAvatar({
                src: child.attrs.src, 
                name: child.attrs.name
            });
            processedAvatar = true;
        } else {
            throw Error("<cardheader> can only have one <cardavatar> child")
        }
    }

    return new CardHeader({
        title: cardHeaderTag.attrs.title,
        subtitle: cardHeaderTag.attrs.subtitle,
        avatar: avatar
    });
};

/**
 Instantiates a new CardAvatar

 @class CardAvatar
 @classdesc A CardAvatar object as defined in the JSON schema

 @param {object} [props] - Properties to initialize the `CardAvatar with
 @param {string} [props.src] - Sets {@link CardAvatar#src}
 @param {string} [props.name] - Sets {@link CardAvatar#name}
 */
function CardAvatar(props) {

    /**
     Link to public url of avatar image

     @name CardAvatar#src
     @type {string}
     */
    this.src = typeof props === 'object' ? props.src : null;

    /**
     Name of the avatar

     @name CardAvatar#name
     @type {string}
     */
    this.name = typeof props === 'object' ? props.name : null;

}

/**
 Instantiates a new CardAction

 @class CardAction
 @classdesc A CardAction object as defined in the JSON schema

 @param {object} props - Properties to initialize the CardAction with
 @param {string} props.name - Sets {@link CardAction#name}
 @param {string} props.path - Sets {@link CardAction#path}
 @param {('GET'|'POST'|'PUT'|'PATCH'|'DELETE')} props.method='GET' - Sets {@link CardAction#method}
 */
function CardAction(props) {

    /**
     Name of the action

     @name CardAction#name
     @type {string}
     */
    this.name = props.name || null;
    if (!this.name) {
        throw Error("name is mandatory");
    }

    /**
     Path for the callback action

     @name CardAction#path
     @type {string}
     */
    this.path = props.path || null;
    if (!this.path) {
        throw Error("path is mandatory");
    }

    /**
     Method to use when path is specified

     @name CardAction#method
     @type {string}
     @default 'GET'
     */
    if (props.path) {
        this.method = props.method || 'GET';
    } else {
        this.method = null;
    }

}

/**
 * Creates a CardAction from a CardActionTag
 * @param {CardActionTag} cardActionTag
 * @returns {CardAction}
 */
CardAction.fromTag = function (cardActionTag) {

    return new CardAction({
        name: cardActionTag.attrs.name,
        path: cardActionTag.attrs.path,
        method: cardActionTag.attrs.method
    });
    
};

/**
 Instantiates a new Form

 @class Form
 @classdesc A Form object as defined in the JSON schema

 @param {object} props - Properties to initialize the `Form` with
 @param {Snackbar} [props.snackbar] - Sets {@link Snackbar}
 @param {Array<FormItem>} props.body - Sets {@link Form#body}
 @param {('GET'|'POST'|'PUT'|'PATCH'|'DELETE')} props.method='POST' - Sets {@link Form#method}
 @param {string} props.path - Sets {@link Form#path}
 @param {string} [props.header] - Sets {@link Form#header}
 @param {string} [props.footer] - Sets {@link Form#footer}
 @param {FormMeta} [props.meta] - Sets {@link Form#meta}
 */
function Form(props) {
    if (!props.body || !props.path) {
        throw Error('(body, path) are mandatory');
    }

    /**
     Indicates the type of the object, defaults to `"form"`

     @name Form#type
     @type {string}
     @default "form"
     @readonly
     */
    this.type = 'form';

    /**
     Sequence of {@link `FormItem`} objects used to acquire information from user

     @name Form#body
     @type {Array<FormItem>}
     */
    this.body = props.body;

    /**
     HTTP method indicating how to trigger the callback path. Defaults to `"POST"`.

     @name Form#method
     @type {string}
     @default "POST"
     */
    this.method = props.method || 'POST';

    /**
     The callback path used to send the serialized form data.

     @name Form#path
     @type {string}
     */
    this.path = props.path;

    /**
     The header of the form. It can be overwritten by each body component.

     @name Form#header
     @type {string}
     */
    this.header = props.header || null;

    /**
     The footer of the form. It can be overwritten by each body component.

     @name Form#footer
     @type {string}
     */
    this.footer = props.footer || null;

    /**
     {@link FormMeta`} object. Contains configuration flags.

     @name Form#meta
     @type {FormMeta}
     */
    this.meta = props.meta || null;

    /**
     Snackbar for the form.

     @name Snackbar
     @type {Snackbar}
     */
    this.snackbar = props.snackbar || null;
}

/**
 * Creates a Form from a FormTag
 * @param {FormTag} formTag
 * @returns {Form}
 */
Form.fromTag = function (formTag) {
    let body = [], snackbar, processedSnackbar = false;

    for (const tag of formTag.children) {
        if (tag instanceof SectionTag) {
            body.push(FormItem.fromTag(tag));
        } else if (tag instanceof SnackbarTag) {
            if (processedSnackbar) {
                throw Error("Only one <snackbar> tag is allowed in a <menu> or <form>")
            }
            processedSnackbar = true;
            snackbar = Snackbar.fromTag(tag);
        }
    }

    return new Form({
        body: body,
        method: formTag.attrs.method,
        path: formTag.attrs.action,
        header: formTag.attrs.header,
        footer: formTag.attrs.footer,
        meta: new FormMeta({
            completionStatusShow: formTag.attrs.completionStatusShow,
            completionStatusInHeader: formTag.attrs.completionStatusInHeader,
            skipConfirmation: formTag.attrs.skipConfirmation
        }),
        snackbar: snackbar
    });
};

/**
 Instantiates a new FormMeta

 @class FormMeta
 @classdesc {@link Form} related component holding configuration fields for the form. A FormMeta object as defined in the JSON schema.

 @param {object} props - Properties to initialize the FormMeta with
 @param {boolean} [props.completionStatusShow] - Sets {@link FormMeta#completionStatusShow}
 @param {boolean} [props.completionStatusInHeader] - Sets {@link FormMeta#completionStatusInHeader}
 @param {boolean} [props.skipConfirmation] - Sets {@link FormMeta#skipConfirmation}
 */
function FormMeta(props) {
    /**
     If `true` will show a completion status. Defaults to `false`.

     @name FormMeta#completionStatusShow
     @type {boolean}
     @default false
     */
    this.completionStatusShow = props.completionStatusShow;

    /**
     If `true` will indicate the status in the header. Defaults to `false`, which means it will be shown below
     header if the completion status is shown.

     @name FormMeta#completionStatusInHeader
     @type {boolean}
     @default false
     */
    this.completionStatusInHeader = props.completionStatusInHeader;

    /**
     If `true` will not ask for confirmation. Defaults to `false`.

     @name FormMeta#skipConfirmation
     @type {boolean}
     @default false
     */
    this.skipConfirmation = props.skipConfirmation;
}

/**
 * Instantiates a new FormItem
 *
 * @class FormItem
 * @classdesc A FormItem object as defined in the JSON schema
 *
 * @param {object} props - Properties to initialize the form item with
 * @param {('string'|'date'|'datetime'|'int'|'float'|'hidden'|'form-menu'|
 * 'email'|'url'|'location'|'range'|'regex'|'tel'|'phone'|'textarea'|'login'|'logout')} props.type - Sets {@link FormItem#type}
 * @param {string} props.name - Sets {@link FormItem#name}
 * @param {string} [props.description] - Sets {@link FormItem#description}
 * @param {string} [props.header] - Sets {@link FormItem#header}
 * @param {string} [props.footer] - Sets {@link FormItem#footer}
 * @param {Array<MenuItemFormItem>} [props.body] - Sets {@link FormItem#body}
 * @param {string} [props.value] - Sets {@link FormItem#value}
 * @param {string} [props.chunkingFooter] - Sets {@link FormItem#chunkingFooter}
 * @param {string} [props.confirmationLabel] - Sets {@link FormItem#confirmationLabel}
 * @param {number} [props.minLength] - Sets {@link FormItem#minLength}. It must be integer.
 * @param {string} [props.minLengthError] - Sets {@link FormItem#minLengthError}
 * @param {number} [props.maxLength] - Sets {@link FormItem#maxLength}. It must be integer.
 * @param {string} [props.maxLengthError] - Sets {@link FormItem#maxLengthError}
 * @param {number} [props.minValue] - Sets {@link FormItem#minValue}
 * @param {string} [props.minValueError] - Sets {@link FormItem#minValueError}
 * @param {number} [props.maxValue] - Sets {@link FormItem#maxValue}
 * @param {string} [props.maxValueError] - Sets {@link FormItem#maxValueError}
 * @param {number} [props.step] - Sets {@link FormItem#step}
 * @param {MenuFormItemMeta} [props.meta] - Sets {@link FormItem#meta}
 * @param {string} [props.method] - Sets {@link FormItem#method}
 * @param {string} [props.onLoginFailure] - Sets {@link FormItem#onLoginFailure}
 * @param {string} [props.onLoginSuccess] - Sets {@link FormItem#onLoginSuccess}
 * @param {string} [props.onLogoutFailure] - Sets {@link FormItem#onLogoutFailure}
 * @param {string} [props.onLogoutSuccess] - Sets {@link FormItem#onLogoutSuccess}
 * @param {boolean} [props.required=false] - Sets {@link FormItem#required}
 * @param {string} [props.default] - Sets {@link FormItem#default}
 * @param {string} [props.pattern] - Sets {@link FormItem#pattern}
 * @param {boolean} [props.statusExclude=false] - Sets {@link FormItem#statusExclude}
 * @param {boolean} [props.statusPrepend=false] - Sets {@link FormItem#statusPrepend}
 * @param {string} [props.url] - Sets {@link FormItem#url}
 * @param {string} [props.validateTypeError] - Sets {@link FormItem#validateTypeError}
 * @param {string} [props.validateTypeErrorFooter] - Sets {@link FormItem#validateTypeErrorFooter}
 * @param {string} [props.validateUrl] - Sets {@link FormItem#validateUrl}
 * @constructor
 */
function FormItem(props) {
    /**
     Indicates the type of the object.

     @name FormItem#type
     @type {string}
     */
    this.type = props.type;

    const supportedTypes = [
        'date', 'datetime', 'email', 'form-menu', 'float', 'hidden', 'int',
        'location', 'login', 'logout', 'range', 'regex', 'string', 'tel', 'phone', 'url', 'textarea'
    ];

    if (supportedTypes.indexOf(this.type) === -1) {
        throw Error(`FormItem type="${this.type}" is not supported. Supported types: ${supportedTypes}`);
    }

    /**
     The name of this `FormItem`, used in form serialization.

     @name FormItem#name
     @type {string}
     */
    this.name = props.name;

    /**
     The description of this `FormItem`.

     @name FormItem#description
     @type {string}
     */
    this.description = props.description || null;

    /**
     If provided will overwrite the {@link Form#header}.

     @name FormItem#header
     @type {string}
     */
    this.header = props.header || null;

    /**
     If provided will overwrite the {@link Form#footer}.

     @name FormItem#footer
     @type {string}
     */
    this.footer = props.footer || null;

    /**
     Composed of {@link MenuItemFormItem} objects <br> _required only for `type=form-menu`_.

     @name FormItem#body
     @type {Array<MenuItemFormItem>}
     */
    this.body = props.body || null;

    /**
     Value to pass in the form serialization data _.

     @name FormItem#value
     @type {string}
     */
    this.value = typeof props.value === 'undefined' ? null : props.value;

    // if (this.value == null) {
    //     if (this.type === 'hidden') {
    //         throw Error('value is required when type="hidden"');
    //     }
    // }

    /**
     Shown in the footer of the sms chunks.

     @name FormItem#chunkingFooter
     @type {string}
     */
    this.chunkingFooter = props.chunkingFooter || null;

    /**
     Shown in the confirmation menu.

     @name FormItem#confirmationLabel
     @type {string}
     */
    this.confirmationLabel = props.confirmationLabel || null;

    /**
     Validates the user input <br> _applies only for `type=string`_.

     @name FormItem#minLength
     @type {number}
     */
    this.minLength = typeof props.minLength === 'undefined' ? null : props.minLength;

    /**
     Message to be shown on `minLength` error.

     @name FormItem#minLengthError
     @type {string}
     */
    this.minLengthError = props.minLengthError || null;

    /**
     Validates the user input <br> _applies only for `type=string`_.

     @name FormItem#maxLength
     @type {number}
     */
    this.maxLength = typeof props.maxLength === 'undefined' ? null : props.maxLength;

    /**
     Message to be shown on `maxLength` error.

     @name FormItem#maxLengthError
     @type {string}
     */
    this.maxLengthError = props.maxLengthError || null;

    /**
     Validates the user input <br> _applies only for `type=int|float`_.

     @name FormItem#minValue
     @type {number}
     */
    this.minValue = typeof props.minValue === 'undefined' ? null : props.minValue;

    /**
     Message to be shown on `minValue` error.

     @name FormItem#minValueError
     @type {string}
     */
    this.minValueError = props.minValueError || null;

    /**
     Validates the user input <br> _applies only for `type=int|float`_.

     @name FormItem#maxValue
     @type {number}
     */
    this.maxValue = typeof props.maxValue === 'undefined' ? null : props.maxValue;

    /**
     Message to be shown on `maxValue` error.

     @name FormItem#maxValueError
     @type {string}
     */
    this.maxValueError = props.maxValueError || null;

    /**
     Optional path to redirect on login success, valid when type='login'

     @name FormItem#onLoginSuccess
     @type {string}
     */
    this.onLoginSuccess = props.onLoginSuccess || null;

    /**
    Optional path to redirect on login failure, valid when type='login'

     @name FormItem#onLoginFailure
    @type {string}
    */
    this.onLoginFailure = props.onLoginFailure || null;

    /**
     Optional path to redirect on logout success, valid when type='logout'

     @name FormItem#onLogoutSuccess
     @type {string}
     */
    this.onLogoutSuccess = props.onLogoutSuccess || null;

    /**
    Optional path to redirect on logout failure, valid when type='logout'

     @name FormItem#onLogoutFailure
    @type {string}
    */
    this.onLogoutFailure = props.onLogoutFailure || null;

    /**
     specifies the legal number intervals for input field
     @name FormItem#step
     @type {number}
     */
    this.step = typeof props.step === 'undefined' ? null : props.step;

    /**
     {@link MenuFormItemMeta} object <br> _applies only for `type=form-menu`_.

     @name FormItem#meta
     @type {MenuFormItemMeta}
     */
    this.meta = props.meta || null;

    /**
     HTTP method, how the callback url should be triggered.

     @name FormItem#method
     @type {string}
     */
    this.method = props.method || null;

    /**
     User can `SKIP` this `FormItem` if set to `false`

     @name FormItem#required
     @type {boolean}
     @default false
     */
    this.required = props.required || false;

    /**
     * A default value in case of non required form items
     *
     * @name FormItem#default
     * @type {string}
     */
    this.default = props.default || null;

    /**
     ECMA Script regex pattern string <br> _applies only for `type=regex`_.

     @name FormItem#pattern
     @type {string|null}
     */
    this.pattern = props.pattern || null;

    if (this.pattern == null) {
        if (this.type === 'regex') {
            throw Error('pattern is required when type is "regex"');
        }
    } else {
        if (this.type !== 'regex') {
            throw Error('type must be set to "regex" when pattern is defined');
        }
    }

    // Check if the pattern is valid. This will raise a SyntaxError if not.
    "".match(new RegExp(this.pattern));

    /**
     If `true` this step will be excluded from the form completion status.

     @name FormItem#statusExclude
     @type {boolean}
     @default false
     */
    this.statusExclude = props.statusExclude || false;

    /**
     If `true` this step will be prepended to the body of the response. Appended otherwise.

     @name FormItem#statusPrepend
     @type {boolean}
     @default false
     */
    this.statusPrepend = props.statusPrepend || false;

    /**
     Callback url triggered right after the choice has been set for this form item.

     @name FormItem#url
     @type {string}
     */
    this.url = props.url || null;

    /**
     An error message to be shown on basic type validation.

     @name FormItem#validateTypeError
     @type {string}
     */
    this.validateTypeError = props.validateTypeError || null;

    /**
     Shown in the error message footer.

     @name FormItem#validateTypeErrorFooter
     @type {string}
     */
    this.validateTypeErrorFooter = props.validateTypeErrorFooter || null;

    /**
     The callback url path `"GET"` triggered to validate user input.
     <br> A query string is sent by ONEm: `?form_item_name=user_input`
     <br> The validate_url must return a json response:
     `{"valid": true/false, "error": "Some message in case of
     validation errors"}`.

     @name FormItem#validateUrl
     @type {string}
     */
    this.validateUrl = props.validateUrl || null;
}

/**
 * Creates a FormItem from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {FormItem}
 */
FormItem.fromTag = function (sectionTag) {
    let header,
        footer,
        body = [],
        value,
        minValue,
        minValueError,
        minLength,
        minLengthError,
        maxValue,
        maxValueError,
        maxLength,
        maxLengthError,
        onLoginFailure = null,
        onLoginSuccess = null,
        onLogoutFailure = null,
        onLogoutSuccess = null,
        formItemType,
        description,
        pattern,
        step;

    for (const child of sectionTag.children) {
        if (child instanceof InputTag) {
            const inputType = child.attrs.type;
            if (inputType === 'number') {
                if (child.attrs.step) {
                    formItemType = 'int';
                } else {
                    formItemType = 'float';
                }
            } else if (inputType === 'hidden') {
                value = child.attrs.value;
                formItemType = 'hidden';
                if (value === undefined) {
                    throw Error('value attribute is required for input type="hidden"');
                }
            } else {
                switch (inputType) {
                    case 'text':
                        formItemType = 'string';
                        break;
                    case undefined:
                        formItemType = 'string';
                        break;
                    case 'date':
                        formItemType = 'date';
                        break;
                    case 'datetime':
                        formItemType = 'datetime';
                        break;
                    case 'url':
                        formItemType = 'url';
                        break;
                    case 'email':
                        formItemType = 'email';
                        break;
                    case 'location':
                        formItemType = 'location';
                        break;
                    case 'tel':
                        formItemType = 'tel';
                        break;
                    case 'phone':
                        formItemType = 'phone';
                        break;
                    case 'range':
                        formItemType = 'range';
                        break;
                    case 'textarea':
                        formItemType = 'textarea';
                        break;
                    default:
                        throw Error(`<input/> type "${inputType}" is not supported`);
                }
            }

            const forceRegexType = child.attrs.pattern !== undefined;
            if (forceRegexType) {
                formItemType = 'regex';
            }

            minValue = child.attrs.min;
            minValueError = child.attrs.minError;
            minLength = child.attrs.minlength;
            minLengthError = child.attrs.minlengthError;
            maxValue = child.attrs.max;
            maxValueError = child.attrs.maxError;
            step = child.attrs.step;
            maxLength = child.attrs.maxlength;
            maxLengthError = child.attrs.maxlengthError;
            description = sectionTag.toString(true, true);
            pattern = child.attrs.pattern;
            value = child.attrs.value;

            break; // ignore other <input> tags if exist
        }
        if (child instanceof UlTag) {
            formItemType = 'form-menu';
            let menuItemFormItem;
            // reiterate through the section's children to render them in body
            for (const child2 of sectionTag.children) {
                if (child2 instanceof UlTag) {
                    for (const li of child2.children) {
                        menuItemFormItem = MenuItemFormItem.fromTag(li);
                        if (menuItemFormItem !== undefined) {
                            body.push(menuItemFormItem);
                        }
                    }
                } else if (child2 instanceof HeaderTag) {
                    // Header is not rendered in section's tag body
                } else if (child2 instanceof FooterTag) {
                    // Footer is not rendered in section's tag body
                } else {
                    menuItemFormItem = MenuItemFormItem.fromTag(child2);
                    if (menuItemFormItem !== undefined) {
                        body.push(menuItemFormItem);
                    }
                }
            }
            break;
        }
        if (child instanceof TextareaTag) {
            formItemType = 'textarea';
            description = sectionTag.toString(true, true);
            value = child.toString() || null;
        }
        if (child instanceof LoginTag) {
            formItemType = 'login';
            onLoginSuccess = child.attrs.onSuccess;
            onLoginFailure = child.attrs.onFailure;
        }
        if (child instanceof LogoutTag) {
            formItemType = 'logout';
            onLogoutSuccess = child.attrs.onSuccess;
            onLogoutFailure = child.attrs.onFailure;
        }
    }

    if (!formItemType) {
        throw Error('When <section> plays the role of a form item, ' +
            'it must contain a <input/>, <login/>, <logout/>, <textarea></textarea> or <ul></ul>'
        )
    }

    if (sectionTag.children[0] instanceof HeaderTag) {
        header = sectionTag.children[0].toString();
    }
    if (sectionTag.children[sectionTag.children.length - 1] instanceof FooterTag) {
        footer = sectionTag.children[sectionTag.children.length - 1].toString();
    }

    return new FormItem({
        type: formItemType,
        name: sectionTag.attrs.name,
        description: description,
        header: header || sectionTag.attrs.header,
        footer: footer || sectionTag.attrs.footer,
        body: body.length === 0 ? undefined : body,
        value: value,
        chunkingFooter: sectionTag.attrs.chunkingFooter,
        confirmationLabel: sectionTag.attrs.confirmationLabel,
        minLength: minLength,
        minLengthError: minLengthError,
        maxLength: maxLength,
        onLoginFailure: onLoginFailure,
        onLoginSuccess: onLoginSuccess,
        onLogoutFailure: onLogoutFailure,
        onLogoutSuccess: onLogoutSuccess,
        step: step,
        maxLengthError: maxLengthError,
        minValue: minValue,
        minValueError: minValueError,
        maxValue: maxValue,
        maxValueError: maxValueError,
        meta: new MenuFormItemMeta({
            autoSelect: sectionTag.attrs.autoSelect,
            multiSelect: sectionTag.attrs.multiSelect,
            numbered: sectionTag.attrs.numbered
        }),
        method: sectionTag.attrs.method,
        required: sectionTag.attrs.required,
        default: sectionTag.attrs.default,
        pattern: pattern,
        statusExclude: sectionTag.attrs.statusExclude,
        statusPrepend: sectionTag.attrs.statusPrepend,
        url: sectionTag.attrs.url,
        validateTypeError: sectionTag.attrs.validateTypeError,
        validateTypeErrorFooter: sectionTag.attrs.validateTypeErrorFooter,
        validateUrl: sectionTag.attrs.validateUrl
    });
};


/**
 Instantiates a new MenuFormItemMeta

 @class MenuFormItemMeta
 @classdesc A MenuFormItemMeta object as defined in the JSON schema

 @param {object} props - Properties to initialize the MenuFormItemMeta object with
 @param {boolean} [props.autoSelect=false] - Sets {@link MenuFormItemMeta#autoSelect}
 @param {boolean} [props.multiSelect=false] - Sets {@link MenuFormItemMeta#multiSelect}
 @param {boolean} [props.numbered=false] - Sets {@link MenuFormItemMeta#numbered}
 */
function MenuFormItemMeta(props) {
    /**
     Will be automatically selected if set to true and in case of a single
     option in the menu.

     @name MenuFormItemMeta#autoSelect
     @type {boolean}
     @default false
     */
    this.autoSelect = props.autoSelect || false;

    /**
     It allows multiple options to be selected.

     @name MenuFormItemMeta#multiSelect
     @type {boolean}
     @default false
     */
    this.multiSelect = props.multiSelect || false;

    /**
     Display numbers instead of letter option markers.

     @name MenuFormItemMeta#numbered
     @type {boolean}
     @default false
     */
    this.numbered = props.numbered || false;
}

/**
 * Instantiates a new MenuItemFormItem
 *
 * @class MenuItemFormItem
 * @classdesc A MenuItemFormItem object as defined in the JSON schema. It
 * represents an item in a form's menu.
 *
 * @param {object} props - Properties to initialize the MenuItemFormItem with
 * @param {string} props.description - Sets {@link MenuItemFormItem#description}
 * @param {string} [props.textSearch] - Sets {@link MenuItemFormItem#textSearch}
 * @param {string} [props.value] - Sets {@link MenuItemFormItem#value}
 */
function MenuItemFormItem(props) {
    /**
     The type of a menu item inside a form, either `"option"` or `"content"`.

     @name MenuItemFormItem#type
     @type {string}
     @readonly
     */
    this.type = 'content';

    if (props.value !== undefined) {
        this.type = 'option';
    }

    /**
     The description of this MenuItemFormItem.

     @name MenuItemFormItem#description
     @type {string}
     */
    this.description = (props.description === undefined) ? null : props.description;

    /**
     The value of this MenuItemFormItem, used in form serialization.

     @name MenuItemFormItem#value
     @type {string}
     */
    this.value = props.value || null;

    /**
     Field to add more context for searching in options.

     @name MenuItemFormItem#textSearch
     @type {string}
     */
    this.textSearch = props.textSearch || null;
}

/**
 * Creates a MenuItemFormItem from a SectionTag's child
 * @param tag
 * @returns {MenuItemFormItem}
 */
MenuItemFormItem.fromTag = function (tag) {
    let description,
        textSearch,
        value;

    if (typeof tag === 'string') {
        description = tag;
    } else {
        description = tag.toString();
    }

    if (!description) {
        // Ignore the menu items without text
        return undefined;
    }

    if (tag instanceof LiTag) {
        value = tag.attrs.value;
        textSearch = tag.attrs.textSearch;
    }

    return new MenuItemFormItem({
        description: description,
        value: value,
        textSearch: textSearch
    });
};

/**
 * Instantiates a new Menu
 *
 * @class Menu
 * @classdesc A Menu object as defined in the JSON schema. It represents
 * a top level component that permits displaying a navigable menu or a plain text.
 *
 * @param {object} props - Properties to initialize the menu with
 * @param {Snackbar} [props.snackbar] - Sets {@link Snackbar}
 * @param {Array<MenuItem>} props.body - Sets {@link Menu#body}
 * @param {string} [props.header] - Sets {@link Menu#header}
 * @param {string} [props.footer] - Sets {@link Menu#footer}
 * @param {MenuMeta} [props.meta] - Sets {@link Menu#meta}
 */
function Menu(props) {
    /**
     The type of the Menu object is always "menu".

     @name Menu#type
     @type {string}
     @readonly
     */
    this.type = "menu";
    /**
     The body/content of the menu.

     @name Menu#body
     @type {Array<MenuItem>}
     @default "menu"
     */
    this.body = props.body;
    /**
     The header of the menu.

     @name Menu#header
     @type {string}
     */
    this.header = props.header || null;
    /**
     The footer of the menu.

     @name Menu#footer
     @type {string}
     */
    this.footer = props.footer || null;
    /**
     Configuration fields for menu.

     @name Menu#meta
     @type {MenuMeta}
     */
    this.meta = props.meta || null;

    /**
     Snackbar for the menu.

     @name Snackbar
     @type {Snackbar}
     */
    this.snackbar = props.snackbar || null;


}

/**
 Instantiates a new SnackbarMeta

 @class SnackbarMeta
 @classdesc A SnackbarMeta object as defined in the JSON schema. It contains
 configuration fields for {@link Snackbar}.

 @param {object} props - Properties to initialize the snackbar meta with
 @param {number} [props.autoHideDuration] - Sets {@link SnackbarMeta.autoHideDuration}
 */
function SnackbarMeta(props) {
    /**
     Time to wait (in ms) until the Snackbar should be automatically closed.
    * If not supplied, zero or null, the default system value applies (usually 7s)

     @name SnackbarMeta#autoHideDuration
     @type {number}
     */
    this.autoHideDuration = props.autoHideDuration || null;
}

/**
 * Instantiates a new Snackbar
 *
 * @class Snackbar
 * @classdesc A snackbar component that can be used to render an error message with a given severity and action
 * can be used in Menus or Forms.
 *
 * @param {object} props - Properties to initialize the snackbar with
 * @param {string} props.message - Sets {@link Snackbar#message}
 * @param {('info' | 'warn' | 'error' | 'success')} [props.severity='info'] - Sets {@link Snackbar#severity}
 * @param {string} [props.name] - Sets {@link Snackbar#name}
 * @param {string} [props.path] - Sets {@link Snackbar#path}
 * @param {string} [props.method] - Sets {@link Snackbar#method}
 * @param {SnackbarMeta} [props.meta] - Sets {@link Snackbar#meta}
 */
function Snackbar(props) {

     /**
     The error message text

     @name Snackbar#message
     @type {string}
     */
    this.message = props.message || null;

    if (!this.message) {
        throw Error('message property must be provided');
    }
     /**
     The severity of the error

     @name Snackbar#severity
     @type {string}
     @default 'info'
     */
    this.severity = props.severity ? String(props.severity).toLowerCase() : "info";

    const supportedSeverities = [
        'info', 'warn', 'error', 'success'
    ];

    if (supportedSeverities.indexOf(this.severity) === -1) {
        throw Error(`Snackbar type="${this.severity}" is not supported. Supported types: ${supportedSeverities}`);
    }

     /**
     The name of the action button

     @name Snackbar#name
     @type {string}
     */
    this.name = props.name || null;

     /**
     The callback path of the action

     @name Snackbar#path
     @type {string}
     */
    this.path = props.path || null;

    if (this.name && !this.path) {
        throw Error('path must have a value when name is provided');
    }

    /**
     The method of the action

    @name Snackbar#method
    @type {string}
    */
   this.method = props.method || null;

    /**
     Configuration fields for snackbar.

     @name Snackbar#meta
     @type {SnackbarMeta}
     */
    this.meta = props.meta || null;

}

Snackbar.fromTag = function(snackbarTag) {

    return new Snackbar({
        message: snackbarTag.attrs.message,
        severity: snackbarTag.attrs.severity,
        name: snackbarTag.attrs.name,
        path: snackbarTag.attrs.path,
        method: snackbarTag.attrs.method,
        meta: new SnackbarMeta({
            autoHideDuration: snackbarTag.attrs.autoHideDuration
        })
    });
};

/**
 * Creates a Menu from a SectionTag
 * @param {SectionTag} sectionTag
 * @returns {Menu}
 */
Menu.fromTag = function (sectionTag) {
    let body = [],
        header,
        footer,
        snackbar,
        processedSnackbar = false;

    sectionTag.children.forEach(function (child) {
        if (child instanceof UlTag) {
            child.children.forEach(function (liTag) {
                body.push(MenuItem.fromTag(liTag));
            });
        } else if (child instanceof HeaderTag) {
            header = child.toString();
        } else if (child instanceof FooterTag) {
            footer = child.toString();
        } else if (child instanceof SnackbarTag) {
            if (processedSnackbar) {
                throw Error("Only one <snackbar> tag is allowed in a <menu> or <form>");
            }
            snackbar = Snackbar.fromTag(child);
            processedSnackbar = true;
        } else {
            body.push(MenuItem.fromTag(child));
        }
    });

    // Discard all the menu items evaluated to false (eg: those with no description)
    body = body.filter(function (menuItem) {
        return menuItem;
    });

    return new Menu({
        snackbar: snackbar,
        body: body,
        header: header || sectionTag.attrs.header,
        footer: footer || sectionTag.attrs.footer,
        meta: new MenuMeta({
            autoSelect: sectionTag.attrs.autoSelect
        })
    });
};

/**
 Instantiates a new MenuMeta

 @class MenuMeta
 @classdesc A MenuMeta object as defined in the JSON schema. It contains
 configuration fields for {@link Menu}.

 @param {object} props - Properties to initialize the menu meta with
 @param {boolean} [props.autoSelect=false] - Sets {@link MenuMeta.autoSelect}
 */
function MenuMeta(props) {
    /**
     If the Menu has only one option, it is automatically selected, without
     asking the user for selection.

     @name MenuMeta#autoSelect
     @type {boolean}
     @default false
     */
    this.autoSelect = props.autoSelect || false;
}

/**
 Instantiates a new MenuItem

 @class MenuItem
 @classdesc A MenuItem object as defined in the JSON schema. It represents an item
 in a menu. Depending on its type, a menu item can be either an option
 (type=option) or an option separator (type=content).

 @param {object} props - Properties to initialize the menu item with.
 @param {string} props.description - Sets {@link MenuItem#description}
 @param {string} [props.textSearch] - Sets {@link MenuItem#textSearch}
 @param {('GET'|'POST'|'PUT'|'PATCH'|'DELETE')} [props.method] - Sets {@link MenuItem#method}
 @param {string} [props.path] - Sets {@link MenuItem#path}
 @param {string} [props.src] - Sets {@link MenuItem#src}
 @param {string} [props.onLoginFailure] - Sets {@link MenuItem#onLoginFailure}
 @param {string} [props.onLoginSuccess] - Sets {@link MenuItem#onLoginSuccess}
 @param {string} [props.onLogoutFailure] - Sets {@link MenuItem#onLogoutFailure}
 @param {string} [props.onLogoutSuccess] - Sets {@link MenuItem#onLogoutSuccess}
 @param {Card} [props.card] = Sets {@link Card}
 */
function MenuItem(props) {
    /**
     The type of the menu item (`content` or `option`).

     @name MenuItem#type
     @type {string}
     @readonly
     */
    this.type = props.type || 'content';

    if (props.path !== undefined) {
        this.type = 'option';
    }

    const supportedTypes = [
        'content', 'option', 'login', 'logout'
    ];

    if (supportedTypes.indexOf(this.type) === -1) {
        throw Error(`MenuItem type="${this.type}" is not supported. Supported types: ${supportedTypes}`);
    }

    /**
     The displayed text of a menu item.

     @name MenuItem#description
     @type {string}
     */
    this.description = props.description;

    /**
     Field to add more context for searching in options.

     @name MenuItem#textSearch
     @type {string}
     */
    this.textSearch = props.textSearch || null;

    /**
     The HTTP method called when the menu item is selected.

     @name MenuItem#method
     @type {string}
     */
    this.method = props.method || null;

    /**
     Optional path to call on login failure, used when type='login'.

     @name MenuItem#onLoginFailure
     @type {string}
     */
    this.onLoginFailure = props.onLoginFailure || null;

    /**
     Optional path to call on login success, used when type='login'.

     @name MenuItem#onLoginSuccess
     @type {string}
     */
    this.onLoginSuccess = props.onLoginSuccess || null;

    /**
     Optional path to call on logout failure, used when type='login'.

     @name MenuItem#onLogoutFailure
     @type {string}
     */
    this.onLogoutFailure = props.onLogoutFailure || null;

    /**
     Optional path to call on logout success, used when type='login'.

     @name MenuItem#onLogoutSuccess
     @type {string}
     */
    this.onLogoutSuccess = props.onLogoutSuccess || null;


    /**
     The path called when the menu item is selected.

     @name MenuItem#path
     @type {string}
     */
    this.path = props.path || null;

    /**
     A public link to media file of type jpg|png|mp4 .

     @name MenuItem#src
     @type {string}
     */
    this.src = props.src || null;

    /**
     Alternative text if media cannot be downloaded .

     @name MenuItem#alt
     @type {string}
     */
    this.alt = props.alt || null;

     /**
     Sets a card object.

     @name MenuItem#card
     @type {Card}
     */
    this.card = props.card || null;

}

/**
 * Creates a MenuItem from a SectionTag's child
 * @param {LiTag|BrTag|PTag|LoginTag|LogoutTag|string} tag
 * @returns {MenuItem}
 */
MenuItem.fromTag = function (tag) {
    let description = null,
        method,
        textSearch,
        path,
        onLoginSuccess = null,
        onLoginFailure = null,
        onLogoutSuccess = null,
        onLogoutFailure = null,
        type = null,
        src = null,
        alt = null,
        card = null;

    if (typeof tag === 'string') {
        description = tag;
    } else if (tag instanceof PTag || tag instanceof LiTag) {
        description = tag.toString();
    }


    // if (!description) {
    //     // Ignore the menu items without text
    //     return undefined;
    // }
    
    if (tag instanceof LiTag &&
        (tag.children[0] instanceof ATag ||
            tag.children[0] instanceof LoginTag ||
            tag.children[0] instanceof CardTag ||
            tag.children[0] instanceof LogoutTag)) {
        const theTag = tag.children[0];
        method = theTag.attrs.method;
        path = theTag.attrs.href;
        textSearch = tag.attrs.textSearch;
        if (theTag instanceof LoginTag) {
            onLoginFailure = theTag.attrs.onFailure;
            onLoginSuccess = theTag.attrs.onSuccess;
            description = null;
            type = "login";
        } else if (theTag instanceof LogoutTag) {
            onLogoutFailure = theTag.attrs.onFailure;
            onLogoutSuccess = theTag.attrs.onSuccess;
            description = null;
            type = "logout";  
        } else if (theTag.children.length == 1 &&
            (theTag.children[0] instanceof ImgTag ||
                theTag.children[0] instanceof VideoTag)) {
            src = theTag.children[0].attrs.src;
            alt = theTag.children[0].attrs.alt;
        } else if (theTag instanceof CardTag) {
            card = Card.fromTag(theTag);
            type = theTag.attrs.action ? 'option' : 'content';
            method = theTag.attrs.method && type === 'option' ? theTag.attrs.method || 'GET' : null;
            path = theTag.attrs.action;
            description = null;
        } else if (theTag.children.length == 1 &&
            typeof theTag.children[0] === 'string') {
            description = theTag.children[0];
        } else if (theTag.children.length > 1 &&
            (theTag.children[1] instanceof ImgTag ||
                theTag.children[1] instanceof VideoTag)) {
            src = theTag.children[1].attrs.src;
            alt = theTag.children[1].attrs.alt;
            description = theTag.children[0]
        }
    } else if (tag instanceof ImgTag || tag instanceof VideoTag) {
        src = tag.attrs.src;
        alt = tag.attrs.alt;
    } else if (tag instanceof LoginTag) {
        onLoginFailure = tag.attrs.onFailure;
        onLoginSuccess = tag.attrs.onSuccess;
        type = "login";
    } else if (tag instanceof LogoutTag) {
        onLogoutFailure = tag.attrs.onFailure;
        onLogoutSuccess = tag.attrs.onSuccess;
        type = "logout";
    } else if (tag instanceof CardTag) {
        card = Card.fromTag(tag);
        type = tag.attrs.action ? 'option' : 'content';
        method = tag.attrs.method && type === 'option' ? tag.attrs.method || 'GET' : null;
        path = tag.attrs.action;
        description = null;
    }
    //if everything is null, return undefined
    if (type !== 'login' && type !== 'logout' && !description && !src && !card) {
        return undefined;
    }

    return new MenuItem({
        description: description,
        textSearch: textSearch,
        method: method,
        path: path,
        src: src,
        alt: alt,
        type: type,
        onLoginFailure: onLoginFailure,
        onLoginSuccess: onLoginSuccess,
        onLogoutFailure: onLogoutFailure,
        onLogoutSuccess: onLogoutSuccess,
        card: card,
    });
};

/**
 * Instantiates a Response object
 *
 * @class Response
 * @classdesc A Response object as defined in the JSON schema. It can be
 * built only from a top level object ({@link Menu}, {@link Form}).
 *
 * @param {Form|Menu} content - The content of the response. Either {@link Form} or a {@link Menu}.
 */
function Response(content) {
    if (!content) {
        throw Error('content is mandatory');
    }

    let contentType;
    if (content instanceof Form) {
        contentType = 'form';
    } else if (content instanceof Menu) {
        contentType = 'menu';
    } else {
        throw Error(`Cannot create Response from ${content.constructor}`)
    }

    /**
     The type of the content of the response, either `"form"` or `"menu"`.

     @name Response#contentType
     @type {string}
     */
    this.contentType = contentType;

    /**
     The content of the response, either a {@link Form} or a {@link Menu}.

     @name Response#content
     @type {Form|Menu}
     */
    this.content = content;
}

/**
 * Creates a Response from a FormTag or SectionTag
 * @param {FormTag|SectionTag} tag
 * @returns {Response}
 */
Response.fromTag = function (tag) {
    if (tag instanceof FormTag) {
        return new Response(Form.fromTag(tag));
    } else if (tag instanceof SectionTag) {
        return new Response(Menu.fromTag(tag));
    } else {
        throw Error(`Cannot create response from ${tag.tagName} tag`)
    }
};

Response.prototype.toJSON = function () {
    return snakecase(this);
};


exports.Form = Form;
exports.Response = Response;
exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.MenuItemFormItem = MenuItemFormItem;
exports.FormItem = FormItem;
exports.FormMeta = FormMeta;
exports.MenuMeta = MenuMeta;
exports.MenuFormItemMeta = MenuFormItemMeta;
exports.Card = Card;

exports.parser = require('./parser');
exports.tags = require('./tag');
exports.config = require('./config');
