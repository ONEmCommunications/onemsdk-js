## Classes

<dl>
<dt><a href="#ATagAttrs">ATagAttrs</a></dt>
<dd></dd>
<dt><a href="#ATag">ATag</a></dt>
<dd></dd>
<dt><a href="#BrTag">BrTag</a></dt>
<dd></dd>
<dt><a href="#FooterTag">FooterTag</a></dt>
<dd></dd>
<dt><a href="#FormTagAttrs">FormTagAttrs</a></dt>
<dd></dd>
<dt><a href="#FormTag">FormTag</a></dt>
<dd></dd>
<dt><a href="#HeaderTag">HeaderTag</a></dt>
<dd></dd>
<dt><a href="#ImgTagAttrs">ImgTagAttrs</a></dt>
<dd></dd>
<dt><a href="#ImgTag">ImgTag</a></dt>
<dd></dd>
<dt><a href="#InputTagAttrs">InputTagAttrs</a></dt>
<dd></dd>
<dt><a href="#InputTag">InputTag</a></dt>
<dd></dd>
<dt><a href="#LiTagAttrs">LiTagAttrs</a></dt>
<dd></dd>
<dt><a href="#LiTag">LiTag</a></dt>
<dd></dd>
<dt><a href="#LoginTagAttrs">LoginTagAttrs</a></dt>
<dd></dd>
<dt><a href="#LoginTag">LoginTag</a></dt>
<dd></dd>
<dt><a href="#LogoutTagAttrs">LogoutTagAttrs</a></dt>
<dd></dd>
<dt><a href="#LogoutTag">LogoutTag</a></dt>
<dd></dd>
<dt><a href="#PTag">PTag</a></dt>
<dd></dd>
<dt><a href="#SectionTagAttrs">SectionTagAttrs</a></dt>
<dd></dd>
<dt><a href="#SectionTag">SectionTag</a></dt>
<dd></dd>
<dt><a href="#Tag">Tag</a></dt>
<dd></dd>
<dt><a href="#TextareaTag">TextareaTag</a></dt>
<dd></dd>
<dt><a href="#UlTag">UlTag</a></dt>
<dd></dd>
<dt><a href="#VideoTagAttrs">VideoTagAttrs</a></dt>
<dd></dd>
<dt><a href="#VideoTag">VideoTag</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ATag">ATag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#BrTag">BrTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#FooterTag">FooterTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#FormTag">FormTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#HeaderTag">HeaderTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#ImgTag">ImgTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#InputTag">InputTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LabelTag">LabelTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LiTag">LiTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LoginTag">LoginTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LogoutTag">LogoutTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#PTag">PTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#SectionTag">SectionTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#Tag">Tag</a></dt>
<dd></dd>
<dt><a href="#TextareaTag">TextareaTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#UlTag">UlTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#VideoTag">VideoTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
</dl>

<a name="ATagAttrs"></a>

## ATagAttrs
**Kind**: global class  
<a name="new_ATagAttrs_new"></a>

### new ATagAttrs(href, method)

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> |  |
| method | <code>&#x27;GET&#x27;</code> \| <code>&#x27;POST&#x27;</code> | default 'GET' |

<a name="ATag"></a>

## ATag
**Kind**: global class  

* [ATag](#ATag)
    * [new ATag(children, attrs)](#new_ATag_new)
    * [.getAttributes(node)](#ATag.getAttributes)

<a name="new_ATag_new"></a>

### new ATag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 

<a name="ATag.getAttributes"></a>

### ATag.getAttributes(node)
**Kind**: static method of [<code>ATag</code>](#ATag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLAnchorElement</code> | 

<a name="BrTag"></a>

## BrTag
**Kind**: global class  
<a name="FooterTag"></a>

## FooterTag
**Kind**: global class  
<a name="new_FooterTag_new"></a>

### new FooterTag(children)
Instantiates a new FooterTag


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="FormTagAttrs"></a>

## FormTagAttrs
**Kind**: global class  
<a name="new_FormTagAttrs_new"></a>

### new FormTagAttrs(action, method, header, footer, completionStatusShow, completionStatusInHeader, skipConfirmation)
Instantiates a new FormTagAttrs


| Param | Type | Description |
| --- | --- | --- |
| action | <code>string</code> | the path where the form data is sent to after the user finishes the form |
| method | <code>string</code> | the method use to send the form data |
| header | <code>string</code> \| <code>undefined</code> | the global form header which can be overwritten at the SectionTag level |
| footer | <code>string</code> \| <code>undefined</code> | the global form footer which can be overwritten at the SectionTag level |
| completionStatusShow | <code>boolean</code> \| <code>undefined</code> | whether to display the progress the user made in a form |
| completionStatusInHeader | <code>boolean</code> \| <code>undefined</code> | whether to display that progress in header (if false it will be displayed in body) |
| skipConfirmation | <code>boolean</code> \| <code>undefined</code> | whether the additional confirmation step at the end of the form will be skipped |

<a name="FormTag"></a>

## FormTag
**Kind**: global class  
<a name="new_FormTag_new"></a>

### new FormTag(children, attrs)
Instantiates a new FormTag. It is the equivalent of the HTML <form> tag and
it is always the root (it cannot be placed inside of another tag). The
FormTag is be used in all the situations where some data is expected from the
user. The FormTag can have only SectionTag children and each SectionTag
deals with one piece of data from the user.


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;SectionTag&gt;</code>](#SectionTag) | 
| attrs | [<code>FormTagAttrs</code>](#FormTagAttrs) | 

<a name="HeaderTag"></a>

## HeaderTag
**Kind**: global class  
<a name="new_HeaderTag_new"></a>

### new HeaderTag(children)
Instantiates a new HeaderTag


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="ImgTagAttrs"></a>

## ImgTagAttrs
**Kind**: global class  
<a name="new_ImgTagAttrs_new"></a>

### new ImgTagAttrs([src], [alt])

| Param | Type |
| --- | --- |
| [src] | <code>string</code> | 
| [alt] | <code>string</code> | 

<a name="ImgTag"></a>

## ImgTag
**Kind**: global class  

* [ImgTag](#ImgTag)
    * [new ImgTag(children, attrs)](#new_ImgTag_new)
    * [.getAttributes(node)](#ImgTag.getAttributes) ⇒ [<code>ImgTagAttrs</code>](#ImgTagAttrs)

<a name="new_ImgTag_new"></a>

### new ImgTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="ImgTag.getAttributes"></a>

### ImgTag.getAttributes(node) ⇒ [<code>ImgTagAttrs</code>](#ImgTagAttrs)
**Kind**: static method of [<code>ImgTag</code>](#ImgTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLImgElement</code> | 

<a name="InputTagAttrs"></a>

## InputTagAttrs
**Kind**: global class  
<a name="new_InputTagAttrs_new"></a>

### new InputTagAttrs(type, [min], [minError], [minlength must be an integer], [minlengthError], [max], [maxError], [maxlength must be an integer], [maxlengthError], [step], [value], [pattern])

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> \| <code>&#x27;email&#x27;</code> \| <code>&#x27;hidden&#x27;</code> \| <code>&#x27;location&#x27;</code> \| <code>&#x27;number&#x27;</code> \| <code>&#x27;phone&#x27;</code> \| <code>&#x27;range&#x27;</code> \| <code>&#x27;tel&#x27;</code> \| <code>&#x27;text&#x27;</code> \| <code>&#x27;textarea&#x27;</code> \| <code>&#x27;url&#x27;</code> |  |
| [min] | <code>number</code> |  |
| [minError] | <code>string</code> |  |
| [minlength must be an integer] | <code>number</code> |  |
| [minlengthError] | <code>string</code> |  |
| [max] | <code>number</code> |  |
| [maxError] | <code>string</code> |  |
| [maxlength must be an integer] | <code>number</code> |  |
| [maxlengthError] | <code>string</code> |  |
| [step] | <code>number</code> |  |
| [value] | <code>string</code> | required if type="hidden" |
| [pattern] | <code>string</code> |  |

<a name="InputTag"></a>

## InputTag
**Kind**: global class  

* [InputTag](#InputTag)
    * [new InputTag(children, attrs)](#new_InputTag_new)
    * [.getAttributes(node)](#InputTag.getAttributes) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)

<a name="new_InputTag_new"></a>

### new InputTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="InputTag.getAttributes"></a>

### InputTag.getAttributes(node) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)
**Kind**: static method of [<code>InputTag</code>](#InputTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLInputElement</code> | 

<a name="LiTagAttrs"></a>

## LiTagAttrs
**Kind**: global class  
<a name="new_LiTagAttrs_new"></a>

### new LiTagAttrs(value, textSearch)

| Param | Type |
| --- | --- |
| value | <code>string</code> \| <code>undefined</code> | 
| textSearch | <code>string</code> \| <code>undefined</code> | 

<a name="LiTag"></a>

## LiTag
**Kind**: global class  
<a name="new_LiTag_new"></a>

### new LiTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|string)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

<a name="LoginTagAttrs"></a>

## LoginTagAttrs
**Kind**: global class  
<a name="new_LoginTagAttrs_new"></a>

### new LoginTagAttrs([onSuccess], [onFailure])

| Param | Type |
| --- | --- |
| [onSuccess] | <code>string</code> | 
| [onFailure] | <code>string</code> | 

<a name="LoginTag"></a>

## LoginTag
**Kind**: global class  

* [LoginTag](#LoginTag)
    * [new LoginTag(children, attrs)](#new_LoginTag_new)
    * [.getAttributes(node)](#LoginTag.getAttributes) ⇒ [<code>LoginTagAttrs</code>](#LoginTagAttrs)

<a name="new_LoginTag_new"></a>

### new LoginTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LoginTagAttrs</code>](#LoginTagAttrs) | 

<a name="LoginTag.getAttributes"></a>

### LoginTag.getAttributes(node) ⇒ [<code>LoginTagAttrs</code>](#LoginTagAttrs)
**Kind**: static method of [<code>LoginTag</code>](#LoginTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="LogoutTagAttrs"></a>

## LogoutTagAttrs
**Kind**: global class  
<a name="new_LogoutTagAttrs_new"></a>

### new LogoutTagAttrs([onSuccess], [onFailure])

| Param | Type |
| --- | --- |
| [onSuccess] | <code>string</code> | 
| [onFailure] | <code>string</code> | 

<a name="LogoutTag"></a>

## LogoutTag
**Kind**: global class  

* [LogoutTag](#LogoutTag)
    * [new LogoutTag(children, attrs)](#new_LogoutTag_new)
    * [.getAttributes(node)](#LogoutTag.getAttributes) ⇒ [<code>LogoutTagAttrs</code>](#LogoutTagAttrs)

<a name="new_LogoutTag_new"></a>

### new LogoutTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LogoutTagAttrs</code>](#LogoutTagAttrs) | 

<a name="LogoutTag.getAttributes"></a>

### LogoutTag.getAttributes(node) ⇒ [<code>LogoutTagAttrs</code>](#LogoutTagAttrs)
**Kind**: static method of [<code>LogoutTag</code>](#LogoutTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="PTag"></a>

## PTag
**Kind**: global class  
<a name="new_PTag_new"></a>

### new PTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="SectionTagAttrs"></a>

## SectionTagAttrs
**Kind**: global class  
<a name="new_SectionTagAttrs_new"></a>

### new SectionTagAttrs([props])
Instantiates a new SectionTagAttrs


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [props] | <code>object</code> |  |  |
| [props.name] | <code>string</code> |  | this attribute is relevant only if the                              SectionTag is part of a FormTag |
| [props.header] | <code>string</code> |  | text that will be included in header |
| [props.footer] | <code>string</code> |  | text that will be included in footer |
| [props.autoSelect] | <code>boolean</code> | <code>false</code> |  |
| [props.multiSelect] | <code>boolean</code> | <code>false</code> |  |
| [props.numbered] | <code>boolean</code> | <code>false</code> |  |
| [props.chunkingFooter] | <code>string</code> |  |  |
| [props.confirmationLabel] | <code>string</code> |  |  |
| [props.method] | <code>string</code> |  |  |
| [props.required] | <code>boolean</code> | <code>false</code> |  |
| [props.default] | <code>string</code> |  |  |
| [props.statusExclude] | <code>boolean</code> | <code>false</code> |  |
| [props.statusPrepend] | <code>boolean</code> | <code>false</code> |  |
| [props.url] | <code>string</code> |  |  |
| [props.validateTypeError] | <code>string</code> |  |  |
| [props.validateTypeErrorFooter] | <code>string</code> |  |  |
| [props.validateUrl] | <code>string</code> |  |  |

<a name="SectionTag"></a>

## SectionTag
**Kind**: global class  
<a name="new_SectionTag_new"></a>

### new SectionTag(children, attrs)
Instantiates a new SectionTag. A SectionTag may represent a step in a form,
a menu or a block of text. A user will always receive the content of a
SectionTag at a time.


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(PTag\|BrTag\|UlTag\|LabelTag\|LoginTag\|LogoutTag\|HeaderTag\|FooterTag\|TextareaTag\|InputTag\|ImgTag\|VideoTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

<a name="Tag"></a>

## Tag
**Kind**: global class  

* [Tag](#Tag)
    * [new Tag(children, attrs)](#new_Tag_new)
    * [.fromNode(node)](#Tag.fromNode) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>LoginTag</code>](#LoginTag) \| [<code>LogoutTag</code>](#LogoutTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>TextareaTag</code>](#TextareaTag) \| [<code>ImgTag</code>](#ImgTag) \| [<code>VideoTag</code>](#VideoTag)
    * [.getAttributes(node)](#Tag.getAttributes) ⇒ <code>Object</code> \| <code>undefined</code>

<a name="new_Tag_new"></a>

### new Tag(children, attrs)
Instantiates a Tag


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 

<a name="Tag.fromNode"></a>

### Tag.fromNode(node) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>LoginTag</code>](#LoginTag) \| [<code>LogoutTag</code>](#LogoutTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>TextareaTag</code>](#TextareaTag) \| [<code>ImgTag</code>](#ImgTag) \| [<code>VideoTag</code>](#VideoTag)
**Kind**: static method of [<code>Tag</code>](#Tag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="Tag.getAttributes"></a>

### Tag.getAttributes(node) ⇒ <code>Object</code> \| <code>undefined</code>
Returns the attributes specific to a certain tag

**Kind**: static method of [<code>Tag</code>](#Tag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="TextareaTag"></a>

## TextareaTag
**Kind**: global class  
<a name="new_TextareaTag_new"></a>

### new TextareaTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="UlTag"></a>

## UlTag
**Kind**: global class  
<a name="new_UlTag_new"></a>

### new UlTag(children)

| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;LiTag&gt;</code>](#LiTag) | 

<a name="VideoTagAttrs"></a>

## VideoTagAttrs
**Kind**: global class  
<a name="new_VideoTagAttrs_new"></a>

### new VideoTagAttrs([src], [alt])

| Param | Type |
| --- | --- |
| [src] | <code>string</code> | 
| [alt] | <code>string</code> | 

<a name="VideoTag"></a>

## VideoTag
**Kind**: global class  

* [VideoTag](#VideoTag)
    * [new VideoTag(children, attrs)](#new_VideoTag_new)
    * [.getAttributes(node)](#VideoTag.getAttributes) ⇒ [<code>VideoTagAttrs</code>](#VideoTagAttrs)

<a name="new_VideoTag_new"></a>

### new VideoTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="VideoTag.getAttributes"></a>

### VideoTag.getAttributes(node) ⇒ [<code>VideoTagAttrs</code>](#VideoTagAttrs)
**Kind**: static method of [<code>VideoTag</code>](#VideoTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLVideoElement</code> | 

<a name="ATag"></a>

## ATag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 


* [ATag](#ATag) ⇐ [<code>Tag</code>](#Tag)
    * [new ATag(children, attrs)](#new_ATag_new)
    * [.getAttributes(node)](#ATag.getAttributes)

<a name="new_ATag_new"></a>

### new ATag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 

<a name="ATag.getAttributes"></a>

### ATag.getAttributes(node)
**Kind**: static method of [<code>ATag</code>](#ATag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLAnchorElement</code> | 

<a name="BrTag"></a>

## BrTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | <code>undefined</code> | 

<a name="FooterTag"></a>

## FooterTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="new_FooterTag_new"></a>

### new FooterTag(children)
Instantiates a new FooterTag


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="FormTag"></a>

## FormTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | [<code>Array.&lt;SectionTag&gt;</code>](#SectionTag) | 
| attrs | [<code>FormTagAttrs</code>](#FormTagAttrs) | 

<a name="new_FormTag_new"></a>

### new FormTag(children, attrs)
Instantiates a new FormTag. It is the equivalent of the HTML <form> tag and
it is always the root (it cannot be placed inside of another tag). The
FormTag is be used in all the situations where some data is expected from the
user. The FormTag can have only SectionTag children and each SectionTag
deals with one piece of data from the user.


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;SectionTag&gt;</code>](#SectionTag) | 
| attrs | [<code>FormTagAttrs</code>](#FormTagAttrs) | 

<a name="HeaderTag"></a>

## HeaderTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="new_HeaderTag_new"></a>

### new HeaderTag(children)
Instantiates a new HeaderTag


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="ImgTag"></a>

## ImgTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 


* [ImgTag](#ImgTag) ⇐ [<code>Tag</code>](#Tag)
    * [new ImgTag(children, attrs)](#new_ImgTag_new)
    * [.getAttributes(node)](#ImgTag.getAttributes) ⇒ [<code>ImgTagAttrs</code>](#ImgTagAttrs)

<a name="new_ImgTag_new"></a>

### new ImgTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="ImgTag.getAttributes"></a>

### ImgTag.getAttributes(node) ⇒ [<code>ImgTagAttrs</code>](#ImgTagAttrs)
**Kind**: static method of [<code>ImgTag</code>](#ImgTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLImgElement</code> | 

<a name="InputTag"></a>

## InputTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 


* [InputTag](#InputTag) ⇐ [<code>Tag</code>](#Tag)
    * [new InputTag(children, attrs)](#new_InputTag_new)
    * [.getAttributes(node)](#InputTag.getAttributes) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)

<a name="new_InputTag_new"></a>

### new InputTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="InputTag.getAttributes"></a>

### InputTag.getAttributes(node) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)
**Kind**: static method of [<code>InputTag</code>](#InputTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLInputElement</code> | 

<a name="LabelTag"></a>

## LabelTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="LiTag"></a>

## LiTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|string)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

<a name="new_LiTag_new"></a>

### new LiTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|string)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

<a name="LoginTag"></a>

## LoginTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LoginTagAttrs</code>](#LoginTagAttrs) | 


* [LoginTag](#LoginTag) ⇐ [<code>Tag</code>](#Tag)
    * [new LoginTag(children, attrs)](#new_LoginTag_new)
    * [.getAttributes(node)](#LoginTag.getAttributes) ⇒ [<code>LoginTagAttrs</code>](#LoginTagAttrs)

<a name="new_LoginTag_new"></a>

### new LoginTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LoginTagAttrs</code>](#LoginTagAttrs) | 

<a name="LoginTag.getAttributes"></a>

### LoginTag.getAttributes(node) ⇒ [<code>LoginTagAttrs</code>](#LoginTagAttrs)
**Kind**: static method of [<code>LoginTag</code>](#LoginTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="LogoutTag"></a>

## LogoutTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LogoutTagAttrs</code>](#LogoutTagAttrs) | 


* [LogoutTag](#LogoutTag) ⇐ [<code>Tag</code>](#Tag)
    * [new LogoutTag(children, attrs)](#new_LogoutTag_new)
    * [.getAttributes(node)](#LogoutTag.getAttributes) ⇒ [<code>LogoutTagAttrs</code>](#LogoutTagAttrs)

<a name="new_LogoutTag_new"></a>

### new LogoutTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>LogoutTagAttrs</code>](#LogoutTagAttrs) | 

<a name="LogoutTag.getAttributes"></a>

### LogoutTag.getAttributes(node) ⇒ [<code>LogoutTagAttrs</code>](#LogoutTagAttrs)
**Kind**: static method of [<code>LogoutTag</code>](#LogoutTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="PTag"></a>

## PTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="new_PTag_new"></a>

### new PTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="SectionTag"></a>

## SectionTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;(HeaderTag\|FooterTag\|UlTag\|PTag\|BrTag\|InputTag\|TextareaTag\|LabelTag\|LoginTag\|LogoutTag\|ImgTag\|VideoTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

<a name="new_SectionTag_new"></a>

### new SectionTag(children, attrs)
Instantiates a new SectionTag. A SectionTag may represent a step in a form,
a menu or a block of text. A user will always receive the content of a
SectionTag at a time.


| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(PTag\|BrTag\|UlTag\|LabelTag\|LoginTag\|LogoutTag\|HeaderTag\|FooterTag\|TextareaTag\|InputTag\|ImgTag\|VideoTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

<a name="Tag"></a>

## Tag
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 
| tagName | <code>string</code> | 


* [Tag](#Tag)
    * [new Tag(children, attrs)](#new_Tag_new)
    * [.fromNode(node)](#Tag.fromNode) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>LoginTag</code>](#LoginTag) \| [<code>LogoutTag</code>](#LogoutTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>TextareaTag</code>](#TextareaTag) \| [<code>ImgTag</code>](#ImgTag) \| [<code>VideoTag</code>](#VideoTag)
    * [.getAttributes(node)](#Tag.getAttributes) ⇒ <code>Object</code> \| <code>undefined</code>

<a name="new_Tag_new"></a>

### new Tag(children, attrs)
Instantiates a Tag


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 

<a name="Tag.fromNode"></a>

### Tag.fromNode(node) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>LoginTag</code>](#LoginTag) \| [<code>LogoutTag</code>](#LogoutTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>TextareaTag</code>](#TextareaTag) \| [<code>ImgTag</code>](#ImgTag) \| [<code>VideoTag</code>](#VideoTag)
**Kind**: static method of [<code>Tag</code>](#Tag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="Tag.getAttributes"></a>

### Tag.getAttributes(node) ⇒ <code>Object</code> \| <code>undefined</code>
Returns the attributes specific to a certain tag

**Kind**: static method of [<code>Tag</code>](#Tag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLElement</code> | 

<a name="TextareaTag"></a>

## TextareaTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="new_TextareaTag_new"></a>

### new TextareaTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;string&gt;</code> | 

<a name="UlTag"></a>

## UlTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | [<code>Array.&lt;LiTag&gt;</code>](#LiTag) | 
| attrs | <code>undefined</code> | 

<a name="new_UlTag_new"></a>

### new UlTag(children)

| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;LiTag&gt;</code>](#LiTag) | 

<a name="VideoTag"></a>

## VideoTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 


* [VideoTag](#VideoTag) ⇐ [<code>Tag</code>](#Tag)
    * [new VideoTag(children, attrs)](#new_VideoTag_new)
    * [.getAttributes(node)](#VideoTag.getAttributes) ⇒ [<code>VideoTagAttrs</code>](#VideoTagAttrs)

<a name="new_VideoTag_new"></a>

### new VideoTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="VideoTag.getAttributes"></a>

### VideoTag.getAttributes(node) ⇒ [<code>VideoTagAttrs</code>](#VideoTagAttrs)
**Kind**: static method of [<code>VideoTag</code>](#VideoTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLVideoElement</code> | 

