## Classes

<dl>
<dt><a href="#Form">Form</a></dt>
<dd></dd>
<dt><a href="#FormMeta">FormMeta</a></dt>
<dd></dd>
<dt><a href="#FormItemContent">FormItemContent</a></dt>
<dd></dd>
<dt><a href="#FormItemMenu">FormItemMenu</a></dt>
<dd></dd>
<dt><a href="#FormItemMenuItem">FormItemMenuItem</a></dt>
<dd></dd>
<dt><a href="#Menu">Menu</a></dt>
<dd></dd>
<dt><a href="#MenuItem">MenuItem</a></dt>
<dd></dd>
<dt><a href="#Response">Response</a></dt>
<dd></dd>
<dt><a href="#Tag">Tag</a></dt>
<dd></dd>
<dt><a href="#BrTag">BrTag</a></dt>
<dd></dd>
<dt><a href="#PTag">PTag</a></dt>
<dd></dd>
<dt><a href="#ATagAttrs">ATagAttrs</a></dt>
<dd></dd>
<dt><a href="#ATag">ATag</a></dt>
<dd></dd>
<dt><a href="#LiTagAttrs">LiTagAttrs</a></dt>
<dd></dd>
<dt><a href="#LiTag">LiTag</a></dt>
<dd></dd>
<dt><a href="#UlTag">UlTag</a></dt>
<dd></dd>
<dt><a href="#InputTagAttrs">InputTagAttrs</a></dt>
<dd></dd>
<dt><a href="#InputTag">InputTag</a></dt>
<dd></dd>
<dt><a href="#SectionTagAttrs">SectionTagAttrs</a></dt>
<dd></dd>
<dt><a href="#SectionTag">SectionTag</a></dt>
<dd></dd>
<dt><a href="#FormTagAttrs">FormTagAttrs</a></dt>
<dd></dd>
<dt><a href="#FormTag">FormTag</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#tagClsMap">tagClsMap</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#loadHtml">loadHtml(htmlFile, htmlText)</a> ⇒ <code><a href="#FormTag">FormTag</a></code> | <code><a href="#SectionTag">SectionTag</a></code> | <code><a href="#UlTag">UlTag</a></code> | <code><a href="#LiTag">LiTag</a></code> | <code><a href="#ATag">ATag</a></code> | <code><a href="#PTag">PTag</a></code> | <code>*</code></dt>
<dd><p>Turns a HTML content (from file or from variable) to a Tag object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Form">Form</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FormMeta">FormMeta</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FormItemContent">FormItemContent</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FormItemMenu">FormItemMenu</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FormItemMenuItem">FormItemMenuItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Menu">Menu</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MenuItem">MenuItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Response">Response</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Tag">Tag</a></dt>
<dd></dd>
<dt><a href="#HeaderTag">HeaderTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#FooterTag">FooterTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LabelTag">LabelTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#InputTag">InputTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#ATag">ATag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#PTag">PTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#BrTag">BrTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#LiTag">LiTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#UlTag">UlTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#SectionTag">SectionTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
<dt><a href="#FormTag">FormTag</a> ⇐ <code><a href="#Tag">Tag</a></code></dt>
<dd></dd>
</dl>

<a name="Form"></a>

## Form
**Kind**: global class  

* [Form](#Form)
    * [new Form(body, method, path, header, footer, meta)](#new_Form_new)
    * [.fromTag(formTag)](#Form.fromTag) ⇒ [<code>Form</code>](#Form)

<a name="new_Form_new"></a>

### new Form(body, method, path, header, footer, meta)
Instantiates a new Form


| Param | Type | Default |
| --- | --- | --- |
| body | <code>Array.&lt;(FormItemContent\|FormItemMenu)&gt;</code> |  | 
| method | <code>&#x27;GET&#x27;</code> \| <code>&#x27;POST&#x27;</code> \| <code>&#x27;PUT&#x27;</code> \| <code>&#x27;DELETE&#x27;</code> | <code>&#x27;POST&#x27;</code> | 
| path | <code>string</code> |  | 
| header | <code>string</code> \| <code>undefined</code> |  | 
| footer | <code>string</code> \| <code>undefined</code> |  | 
| meta | [<code>FormMeta</code>](#FormMeta) \| <code>undefined</code> |  | 

<a name="Form.fromTag"></a>

### Form.fromTag(formTag) ⇒ [<code>Form</code>](#Form)
Creates a Form from a FormTag

**Kind**: static method of [<code>Form</code>](#Form)  

| Param | Type |
| --- | --- |
| formTag | [<code>FormTag</code>](#FormTag) | 

<a name="FormMeta"></a>

## FormMeta
**Kind**: global class  
<a name="new_FormMeta_new"></a>

### new FormMeta(completionStatusShow, completionStatusInHeader, confirmationNeeded)
Instantiates a new FormMeta


| Param | Type |
| --- | --- |
| completionStatusShow | <code>boolean</code> \| <code>undefined</code> | 
| completionStatusInHeader | <code>boolean</code> \| <code>undefined</code> | 
| confirmationNeeded | <code>boolean</code> \| <code>undefined</code> | 

<a name="FormItemContent"></a>

## FormItemContent
**Kind**: global class  

* [FormItemContent](#FormItemContent)
    * [new FormItemContent(type, name, description, header, footer)](#new_FormItemContent_new)
    * [.fromTag(sectionTag)](#FormItemContent.fromTag) ⇒ [<code>FormItemContent</code>](#FormItemContent)

<a name="new_FormItemContent_new"></a>

### new FormItemContent(type, name, description, header, footer)
Instantiates a new FormItemContent


| Param | Type |
| --- | --- |
| type | <code>&#x27;string&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> | 
| name | <code>string</code> | 
| description | <code>string</code> | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 

<a name="FormItemContent.fromTag"></a>

### FormItemContent.fromTag(sectionTag) ⇒ [<code>FormItemContent</code>](#FormItemContent)
Creates a FormItemContent from a SectionTag

**Kind**: static method of [<code>FormItemContent</code>](#FormItemContent)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="FormItemMenu"></a>

## FormItemMenu
**Kind**: global class  

* [FormItemMenu](#FormItemMenu)
    * [new FormItemMenu(body)](#new_FormItemMenu_new)
    * [.fromTag(sectionTag)](#FormItemMenu.fromTag) ⇒ [<code>FormItemMenu</code>](#FormItemMenu)

<a name="new_FormItemMenu_new"></a>

### new FormItemMenu(body)
Instantiates a new FormItemMenu


| Param | Type |
| --- | --- |
| body | [<code>Array.&lt;FormItemMenuItem&gt;</code>](#FormItemMenuItem) | 

<a name="FormItemMenu.fromTag"></a>

### FormItemMenu.fromTag(sectionTag) ⇒ [<code>FormItemMenu</code>](#FormItemMenu)
Creates a FormItemMenu from a SectionTag

**Kind**: static method of [<code>FormItemMenu</code>](#FormItemMenu)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="FormItemMenuItem"></a>

## FormItemMenuItem
**Kind**: global class  

* [FormItemMenuItem](#FormItemMenuItem)
    * [new FormItemMenuItem(type, description, value)](#new_FormItemMenuItem_new)
    * [.fromTag(tag)](#FormItemMenuItem.fromTag) ⇒ [<code>FormItemMenuItem</code>](#FormItemMenuItem)

<a name="new_FormItemMenuItem_new"></a>

### new FormItemMenuItem(type, description, value)
Instantiates a new FormItemMenuItem


| Param | Type |
| --- | --- |
| type | <code>&#x27;option&#x27;</code> \| <code>&#x27;content&#x27;</code> | 
| description | <code>string</code> | 
| value | <code>string</code> \| <code>undefined</code> | 

<a name="FormItemMenuItem.fromTag"></a>

### FormItemMenuItem.fromTag(tag) ⇒ [<code>FormItemMenuItem</code>](#FormItemMenuItem)
Creates a FormItemMenuItem from a SectionTag's child

**Kind**: static method of [<code>FormItemMenuItem</code>](#FormItemMenuItem)  

| Param |
| --- |
| tag | 

<a name="Menu"></a>

## Menu
**Kind**: global class  

* [Menu](#Menu)
    * [new Menu(body, header, footer)](#new_Menu_new)
    * [.fromTag(sectionTag)](#Menu.fromTag) ⇒ [<code>Menu</code>](#Menu)

<a name="new_Menu_new"></a>

### new Menu(body, header, footer)
Instantiates a new Menu


| Param | Type |
| --- | --- |
| body | [<code>Array.&lt;MenuItem&gt;</code>](#MenuItem) | 
| header | <code>String</code> \| <code>undefined</code> | 
| footer | <code>String</code> \| <code>undefined</code> | 

<a name="Menu.fromTag"></a>

### Menu.fromTag(sectionTag) ⇒ [<code>Menu</code>](#Menu)
Creates a Menu from a SectionTag

**Kind**: static method of [<code>Menu</code>](#Menu)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="MenuItem"></a>

## MenuItem
**Kind**: global class  

* [MenuItem](#MenuItem)
    * [new MenuItem(type, description, method, path)](#new_MenuItem_new)
    * [.fromTag(tag)](#MenuItem.fromTag) ⇒ [<code>MenuItem</code>](#MenuItem)

<a name="new_MenuItem_new"></a>

### new MenuItem(type, description, method, path)
Instantiates a new MenuItem


| Param |
| --- |
| type | 
| description | 
| method | 
| path | 

<a name="MenuItem.fromTag"></a>

### MenuItem.fromTag(tag) ⇒ [<code>MenuItem</code>](#MenuItem)
Creates a MenuItem from a SectionTag's child

**Kind**: static method of [<code>MenuItem</code>](#MenuItem)  

| Param | Type |
| --- | --- |
| tag | [<code>LiTag</code>](#LiTag) \| [<code>BrTag</code>](#BrTag) \| [<code>PTag</code>](#PTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>InputTag</code>](#InputTag) \| <code>String</code> | 

<a name="Response"></a>

## Response
**Kind**: global class  

* [Response](#Response)
    * [new Response(messageId, content)](#new_Response_new)
    * [.fromTag(tag, messageId)](#Response.fromTag) ⇒ [<code>Response</code>](#Response)

<a name="new_Response_new"></a>

### new Response(messageId, content)
Instantiates a Response object


| Param | Type |
| --- | --- |
| messageId | <code>String</code> \| <code>undefined</code> | 
| content | [<code>Form</code>](#Form) \| [<code>Menu</code>](#Menu) | 

<a name="Response.fromTag"></a>

### Response.fromTag(tag, messageId) ⇒ [<code>Response</code>](#Response)
Creates a Response from a FormTag or SectionTag

**Kind**: static method of [<code>Response</code>](#Response)  

| Param |
| --- |
| tag | 
| messageId | 

<a name="Tag"></a>

## Tag
**Kind**: global class  

* [Tag](#Tag)
    * [new Tag(children, attrs)](#new_Tag_new)
    * [.fromNode(node)](#Tag.fromNode) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag)
    * [.getAttributes(node)](#Tag.getAttributes) ⇒ <code>Object</code> \| <code>undefined</code>

<a name="new_Tag_new"></a>

### new Tag(children, attrs)
Instantiates a Tag


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 

<a name="Tag.fromNode"></a>

### Tag.fromNode(node) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag)
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

<a name="BrTag"></a>

## BrTag
**Kind**: global class  
<a name="PTag"></a>

## PTag
**Kind**: global class  
<a name="new_PTag_new"></a>

### new PTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 

<a name="ATagAttrs"></a>

## ATagAttrs
**Kind**: global class  
<a name="new_ATagAttrs_new"></a>

### new ATagAttrs(href)

| Param | Type |
| --- | --- |
| href | <code>String</code> | 

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
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 

<a name="ATag.getAttributes"></a>

### ATag.getAttributes(node)
**Kind**: static method of [<code>ATag</code>](#ATag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLAnchorElement</code> | 

<a name="LiTagAttrs"></a>

## LiTagAttrs
**Kind**: global class  
<a name="new_LiTagAttrs_new"></a>

### new LiTagAttrs(value)

| Param | Type |
| --- | --- |
| value | <code>String</code> \| <code>undefined</code> | 

<a name="LiTag"></a>

## LiTag
**Kind**: global class  
<a name="new_LiTag_new"></a>

### new LiTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|String)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

<a name="UlTag"></a>

## UlTag
**Kind**: global class  
<a name="new_UlTag_new"></a>

### new UlTag(children)

| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;LiTag&gt;</code>](#LiTag) | 

<a name="InputTagAttrs"></a>

## InputTagAttrs
**Kind**: global class  
<a name="new_InputTagAttrs_new"></a>

### new InputTagAttrs(name, type)

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| type | <code>&#x27;text&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> | 

<a name="InputTag"></a>

## InputTag
**Kind**: global class  

* [InputTag](#InputTag)
    * [new InputTag(attrs)](#new_InputTag_new)
    * [.getAttributes(node)](#InputTag.getAttributes) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)

<a name="new_InputTag_new"></a>

### new InputTag(attrs)

| Param | Type |
| --- | --- |
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="InputTag.getAttributes"></a>

### InputTag.getAttributes(node) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)
**Kind**: static method of [<code>InputTag</code>](#InputTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLInputElement</code> | 

<a name="SectionTagAttrs"></a>

## SectionTagAttrs
**Kind**: global class  
<a name="new_SectionTagAttrs_new"></a>

### new SectionTagAttrs(name, expectedResponse, header, footer)
Instantiates a new SectionTagAttrs


| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| expectedResponse | <code>&#x27;string&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 

<a name="SectionTag"></a>

## SectionTag
**Kind**: global class  
<a name="new_SectionTag_new"></a>

### new SectionTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(PTag\|BrTag\|UlTag\|LabelTag\|HeaderTag\|FooterTag\|InputTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

<a name="FormTagAttrs"></a>

## FormTagAttrs
**Kind**: global class  
<a name="new_FormTagAttrs_new"></a>

### new FormTagAttrs(path, method, header, footer, completionStatusShow, completionStatusInHeader, confirmationNeeded)
Instantiates a new FormTagAttrs


| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| method | <code>string</code> | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 
| completionStatusShow | <code>boolean</code> \| <code>undefined</code> | 
| completionStatusInHeader | <code>boolean</code> \| <code>undefined</code> | 
| confirmationNeeded | <code>boolean</code> \| <code>undefined</code> | 

<a name="FormTag"></a>

## FormTag
**Kind**: global class  
<a name="new_FormTag_new"></a>

### new FormTag(children, attrs)

| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;SectionTag&gt;</code>](#SectionTag) | 
| attrs | [<code>FormTagAttrs</code>](#FormTagAttrs) | 

<a name="tagClsMap"></a>

## tagClsMap : <code>Object</code>
**Kind**: global constant  
<a name="loadHtml"></a>

## loadHtml(htmlFile, htmlText) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| <code>\*</code>
Turns a HTML content (from file or from variable) to a Tag object

**Kind**: global function  

| Param | Type |
| --- | --- |
| htmlFile | <code>String</code> \| <code>undefined</code> | 
| htmlText | <code>String</code> \| <code>undefined</code> | 

<a name="Form"></a>

## Form : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;form&#x27;</code> |  |
| header | <code>string</code> \| <code>undefined</code> | header value |
| footer | <code>string</code> \| <code>undefined</code> | footer value |
| meta | [<code>FormMeta</code>](#FormMeta) |  |
| method | <code>&#x27;get&#x27;</code> \| <code>&#x27;post&#x27;</code> \| <code>&#x27;put&#x27;</code> \| <code>&#x27;delete&#x27;</code> |  |
| path | <code>string</code> |  |
| body | [<code>FormItemContent</code>](#FormItemContent) \| [<code>FormItemMenu</code>](#FormItemMenu) | form body object |


* [Form](#Form) : <code>object</code>
    * [new Form(body, method, path, header, footer, meta)](#new_Form_new)
    * [.fromTag(formTag)](#Form.fromTag) ⇒ [<code>Form</code>](#Form)

<a name="new_Form_new"></a>

### new Form(body, method, path, header, footer, meta)
Instantiates a new Form


| Param | Type | Default |
| --- | --- | --- |
| body | <code>Array.&lt;(FormItemContent\|FormItemMenu)&gt;</code> |  | 
| method | <code>&#x27;GET&#x27;</code> \| <code>&#x27;POST&#x27;</code> \| <code>&#x27;PUT&#x27;</code> \| <code>&#x27;DELETE&#x27;</code> | <code>&#x27;POST&#x27;</code> | 
| path | <code>string</code> |  | 
| header | <code>string</code> \| <code>undefined</code> |  | 
| footer | <code>string</code> \| <code>undefined</code> |  | 
| meta | [<code>FormMeta</code>](#FormMeta) \| <code>undefined</code> |  | 

<a name="Form.fromTag"></a>

### Form.fromTag(formTag) ⇒ [<code>Form</code>](#Form)
Creates a Form from a FormTag

**Kind**: static method of [<code>Form</code>](#Form)  

| Param | Type |
| --- | --- |
| formTag | [<code>FormTag</code>](#FormTag) | 

<a name="FormMeta"></a>

## FormMeta : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| completionStatusShow | <code>boolean</code> \| <code>undefined</code> | 
| completionStatusInHeader | <code>boolean</code> \| <code>undefined</code> | 
| confirmationNeeded | <code>boolean</code> \| <code>undefined</code> | 

<a name="new_FormMeta_new"></a>

### new FormMeta(completionStatusShow, completionStatusInHeader, confirmationNeeded)
Instantiates a new FormMeta


| Param | Type |
| --- | --- |
| completionStatusShow | <code>boolean</code> \| <code>undefined</code> | 
| completionStatusInHeader | <code>boolean</code> \| <code>undefined</code> | 
| confirmationNeeded | <code>boolean</code> \| <code>undefined</code> | 

<a name="FormItemContent"></a>

## FormItemContent : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>&#x27;string&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> | 
| name | <code>string</code> | 
| description | <code>string</code> | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 


* [FormItemContent](#FormItemContent) : <code>object</code>
    * [new FormItemContent(type, name, description, header, footer)](#new_FormItemContent_new)
    * [.fromTag(sectionTag)](#FormItemContent.fromTag) ⇒ [<code>FormItemContent</code>](#FormItemContent)

<a name="new_FormItemContent_new"></a>

### new FormItemContent(type, name, description, header, footer)
Instantiates a new FormItemContent


| Param | Type |
| --- | --- |
| type | <code>&#x27;string&#x27;</code> \| <code>&#x27;date&#x27;</code> \| <code>&#x27;datetime&#x27;</code> | 
| name | <code>string</code> | 
| description | <code>string</code> | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 

<a name="FormItemContent.fromTag"></a>

### FormItemContent.fromTag(sectionTag) ⇒ [<code>FormItemContent</code>](#FormItemContent)
Creates a FormItemContent from a SectionTag

**Kind**: static method of [<code>FormItemContent</code>](#FormItemContent)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="FormItemMenu"></a>

## FormItemMenu : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>&#x27;form-menu&#x27;</code> | 
| body | [<code>Array.&lt;FormItemMenuItem&gt;</code>](#FormItemMenuItem) | 


* [FormItemMenu](#FormItemMenu) : <code>Object</code>
    * [new FormItemMenu(body)](#new_FormItemMenu_new)
    * [.fromTag(sectionTag)](#FormItemMenu.fromTag) ⇒ [<code>FormItemMenu</code>](#FormItemMenu)

<a name="new_FormItemMenu_new"></a>

### new FormItemMenu(body)
Instantiates a new FormItemMenu


| Param | Type |
| --- | --- |
| body | [<code>Array.&lt;FormItemMenuItem&gt;</code>](#FormItemMenuItem) | 

<a name="FormItemMenu.fromTag"></a>

### FormItemMenu.fromTag(sectionTag) ⇒ [<code>FormItemMenu</code>](#FormItemMenu)
Creates a FormItemMenu from a SectionTag

**Kind**: static method of [<code>FormItemMenu</code>](#FormItemMenu)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="FormItemMenuItem"></a>

## FormItemMenuItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>&#x27;option&#x27;</code> \| <code>&#x27;content&#x27;</code> | 
| description | <code>string</code> | 
| value | <code>string</code> \| <code>undefined</code> | 


* [FormItemMenuItem](#FormItemMenuItem) : <code>object</code>
    * [new FormItemMenuItem(type, description, value)](#new_FormItemMenuItem_new)
    * [.fromTag(tag)](#FormItemMenuItem.fromTag) ⇒ [<code>FormItemMenuItem</code>](#FormItemMenuItem)

<a name="new_FormItemMenuItem_new"></a>

### new FormItemMenuItem(type, description, value)
Instantiates a new FormItemMenuItem


| Param | Type |
| --- | --- |
| type | <code>&#x27;option&#x27;</code> \| <code>&#x27;content&#x27;</code> | 
| description | <code>string</code> | 
| value | <code>string</code> \| <code>undefined</code> | 

<a name="FormItemMenuItem.fromTag"></a>

### FormItemMenuItem.fromTag(tag) ⇒ [<code>FormItemMenuItem</code>](#FormItemMenuItem)
Creates a FormItemMenuItem from a SectionTag's child

**Kind**: static method of [<code>FormItemMenuItem</code>](#FormItemMenuItem)  

| Param |
| --- |
| tag | 

<a name="Menu"></a>

## Menu : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>&#x27;menu&#x27;</code> | 
| body | [<code>Array.&lt;MenuItem&gt;</code>](#MenuItem) | 
| header | <code>string</code> \| <code>undefined</code> | 
| footer | <code>string</code> \| <code>undefined</code> | 


* [Menu](#Menu) : <code>Object</code>
    * [new Menu(body, header, footer)](#new_Menu_new)
    * [.fromTag(sectionTag)](#Menu.fromTag) ⇒ [<code>Menu</code>](#Menu)

<a name="new_Menu_new"></a>

### new Menu(body, header, footer)
Instantiates a new Menu


| Param | Type |
| --- | --- |
| body | [<code>Array.&lt;MenuItem&gt;</code>](#MenuItem) | 
| header | <code>String</code> \| <code>undefined</code> | 
| footer | <code>String</code> \| <code>undefined</code> | 

<a name="Menu.fromTag"></a>

### Menu.fromTag(sectionTag) ⇒ [<code>Menu</code>](#Menu)
Creates a Menu from a SectionTag

**Kind**: static method of [<code>Menu</code>](#Menu)  

| Param | Type |
| --- | --- |
| sectionTag | [<code>SectionTag</code>](#SectionTag) | 

<a name="MenuItem"></a>

## MenuItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&#x27;option&#x27;</code> \| <code>&#x27;content&#x27;</code> |  | indicating menu option or plain content |
| description | <code>string</code> |  |  |
| path | <code>string</code> \| <code>undefined</code> |  | For menu options only. Path to be used for HTTP callback (added to base path configured in app's settings in developer portal) |
| method | <code>&#x27;get&#x27;</code> \| <code>&#x27;post&#x27;</code> \| <code>&#x27;put&#x27;</code> \| <code>&#x27;delete&#x27;</code> \| <code>undefined</code> | <code>get</code> | For menu options only.  HTTP method that should be used when redirecting after successful menu option submission |


* [MenuItem](#MenuItem) : <code>object</code>
    * [new MenuItem(type, description, method, path)](#new_MenuItem_new)
    * [.fromTag(tag)](#MenuItem.fromTag) ⇒ [<code>MenuItem</code>](#MenuItem)

<a name="new_MenuItem_new"></a>

### new MenuItem(type, description, method, path)
Instantiates a new MenuItem


| Param |
| --- |
| type | 
| description | 
| method | 
| path | 

<a name="MenuItem.fromTag"></a>

### MenuItem.fromTag(tag) ⇒ [<code>MenuItem</code>](#MenuItem)
Creates a MenuItem from a SectionTag's child

**Kind**: static method of [<code>MenuItem</code>](#MenuItem)  

| Param | Type |
| --- | --- |
| tag | [<code>LiTag</code>](#LiTag) \| [<code>BrTag</code>](#BrTag) \| [<code>PTag</code>](#PTag) \| [<code>LabelTag</code>](#LabelTag) \| [<code>InputTag</code>](#InputTag) \| <code>String</code> | 

<a name="Response"></a>

## Response : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| messageId | <code>String</code> \| <code>undefined</code> | 
| contentType | <code>&#x27;form&#x27;</code> \| <code>&#x27;menu&#x27;</code> | 
| content | [<code>Form</code>](#Form) \| [<code>Menu</code>](#Menu) | 


* [Response](#Response) : <code>Object</code>
    * [new Response(messageId, content)](#new_Response_new)
    * [.fromTag(tag, messageId)](#Response.fromTag) ⇒ [<code>Response</code>](#Response)

<a name="new_Response_new"></a>

### new Response(messageId, content)
Instantiates a Response object


| Param | Type |
| --- | --- |
| messageId | <code>String</code> \| <code>undefined</code> | 
| content | [<code>Form</code>](#Form) \| [<code>Menu</code>](#Menu) | 

<a name="Response.fromTag"></a>

### Response.fromTag(tag, messageId) ⇒ [<code>Response</code>](#Response)
Creates a Response from a FormTag or SectionTag

**Kind**: static method of [<code>Response</code>](#Response)  

| Param |
| --- |
| tag | 
| messageId | 

<a name="Tag"></a>

## Tag
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 
| tagName | <code>String</code> | 


* [Tag](#Tag)
    * [new Tag(children, attrs)](#new_Tag_new)
    * [.fromNode(node)](#Tag.fromNode) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag)
    * [.getAttributes(node)](#Tag.getAttributes) ⇒ <code>Object</code> \| <code>undefined</code>

<a name="new_Tag_new"></a>

### new Tag(children, attrs)
Instantiates a Tag


| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;Tag&gt;</code>](#Tag) \| <code>undefined</code> | 
| attrs | <code>Object</code> \| <code>undefined</code> | 

<a name="Tag.fromNode"></a>

### Tag.fromNode(node) ⇒ [<code>FormTag</code>](#FormTag) \| [<code>SectionTag</code>](#SectionTag) \| [<code>UlTag</code>](#UlTag) \| [<code>LiTag</code>](#LiTag) \| [<code>ATag</code>](#ATag) \| [<code>PTag</code>](#PTag) \| [<code>BrTag</code>](#BrTag) \| [<code>HeaderTag</code>](#HeaderTag) \| [<code>FooterTag</code>](#FooterTag) \| [<code>InputTag</code>](#InputTag) \| [<code>LabelTag</code>](#LabelTag)
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

<a name="HeaderTag"></a>

## HeaderTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="FooterTag"></a>

## FooterTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="LabelTag"></a>

## LabelTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | <code>undefined</code> | 

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
    * [new InputTag(attrs)](#new_InputTag_new)
    * [.getAttributes(node)](#InputTag.getAttributes) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)

<a name="new_InputTag_new"></a>

### new InputTag(attrs)

| Param | Type |
| --- | --- |
| attrs | [<code>InputTagAttrs</code>](#InputTagAttrs) | 

<a name="InputTag.getAttributes"></a>

### InputTag.getAttributes(node) ⇒ [<code>InputTagAttrs</code>](#InputTagAttrs)
**Kind**: static method of [<code>InputTag</code>](#InputTag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLInputElement</code> | 

<a name="ATag"></a>

## ATag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 


* [ATag](#ATag) ⇐ [<code>Tag</code>](#Tag)
    * [new ATag(children, attrs)](#new_ATag_new)
    * [.getAttributes(node)](#ATag.getAttributes)

<a name="new_ATag_new"></a>

### new ATag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | [<code>ATagAttrs</code>](#ATagAttrs) | 

<a name="ATag.getAttributes"></a>

### ATag.getAttributes(node)
**Kind**: static method of [<code>ATag</code>](#ATag)  

| Param | Type |
| --- | --- |
| node | <code>HTMLAnchorElement</code> | 

<a name="PTag"></a>

## PTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 
| attrs | <code>undefined</code> | 

<a name="new_PTag_new"></a>

### new PTag(children)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;String&gt;</code> | 

<a name="BrTag"></a>

## BrTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>undefined</code> | 
| attrs | <code>undefined</code> | 

<a name="LiTag"></a>

## LiTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|String)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

<a name="new_LiTag_new"></a>

### new LiTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(ATag\|String)&gt;</code> | 
| attrs | [<code>LiTagAttrs</code>](#LiTagAttrs) | 

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

<a name="SectionTag"></a>

## SectionTag ⇐ [<code>Tag</code>](#Tag)
**Kind**: global typedef  
**Extends**: [<code>Tag</code>](#Tag)  
**Properties**

| Name | Type |
| --- | --- |
| children | <code>Array.&lt;(HeaderTag\|FooterTag\|UlTag\|PTag\|BrTag\|InputTag\|LabelTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

<a name="new_SectionTag_new"></a>

### new SectionTag(children, attrs)

| Param | Type |
| --- | --- |
| children | <code>Array.&lt;(PTag\|BrTag\|UlTag\|LabelTag\|HeaderTag\|FooterTag\|InputTag)&gt;</code> | 
| attrs | [<code>SectionTagAttrs</code>](#SectionTagAttrs) | 

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

| Param | Type |
| --- | --- |
| children | [<code>Array.&lt;SectionTag&gt;</code>](#SectionTag) | 
| attrs | [<code>FormTagAttrs</code>](#FormTagAttrs) | 

