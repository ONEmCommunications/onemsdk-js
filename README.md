<a name="module_onem-nodejs-api"></a>

## onem-nodejs-api
Node.js SDK for ONEm API


* [onem-nodejs-api](#module_onem-nodejs-api)
    * [~Service](#module_onem-nodejs-api..Service)
        * [new Service(serviceName)](#new_module_onem-nodejs-api..Service_new)
        * [.addForm(template, data)](#module_onem-nodejs-api..Service+addForm) ⇒ <code>object</code>
        * [.addMenu(template, data)](#module_onem-nodejs-api..Service+addMenu) ⇒ <code>object</code>
    * [~Form(index, template, data)](#module_onem-nodejs-api..Form)
        * [.header([header])](#module_onem-nodejs-api..Form+header) ⇒ <code>boolean</code> \| <code>string</code>
        * [.footer([footer])](#module_onem-nodejs-api..Form+footer) ⇒ <code>boolean</code> \| <code>string</code>
        * [.render()](#module_onem-nodejs-api..Form+render) ⇒ <code>Form</code>
    * [~Menu(index, template, data)](#module_onem-nodejs-api..Menu)
        * [.header([header])](#module_onem-nodejs-api..Menu+header) ⇒ <code>boolean</code> \| <code>string</code>
        * [.footer([footer])](#module_onem-nodejs-api..Menu+footer) ⇒ <code>boolean</code> \| <code>string</code>
        * [.render()](#module_onem-nodejs-api..Menu+render) ⇒ <code>Menu</code>
    * [~Form](#module_onem-nodejs-api..Form) : <code>object</code>
        * [.header([header])](#module_onem-nodejs-api..Form+header) ⇒ <code>boolean</code> \| <code>string</code>
        * [.footer([footer])](#module_onem-nodejs-api..Form+footer) ⇒ <code>boolean</code> \| <code>string</code>
        * [.render()](#module_onem-nodejs-api..Form+render) ⇒ <code>Form</code>
    * [~FormBody](#module_onem-nodejs-api..FormBody) : <code>object</code>
    * [~FormItem](#module_onem-nodejs-api..FormItem) : <code>object</code>
    * [~Menu](#module_onem-nodejs-api..Menu) : <code>object</code>
        * [.header([header])](#module_onem-nodejs-api..Menu+header) ⇒ <code>boolean</code> \| <code>string</code>
        * [.footer([footer])](#module_onem-nodejs-api..Menu+footer) ⇒ <code>boolean</code> \| <code>string</code>
        * [.render()](#module_onem-nodejs-api..Menu+render) ⇒ <code>Menu</code>
    * [~MenuItem](#module_onem-nodejs-api..MenuItem) : <code>object</code>

<a name="module_onem-nodejs-api..Service"></a>

### onem-nodejs-api~Service
**Kind**: inner class of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  

* [~Service](#module_onem-nodejs-api..Service)
    * [new Service(serviceName)](#new_module_onem-nodejs-api..Service_new)
    * [.addForm(template, data)](#module_onem-nodejs-api..Service+addForm) ⇒ <code>object</code>
    * [.addMenu(template, data)](#module_onem-nodejs-api..Service+addMenu) ⇒ <code>object</code>

<a name="new_module_onem-nodejs-api..Service_new"></a>

#### new Service(serviceName)
Instantiates a new Service with given name and optional verbs list


| Param | Type | Description |
| --- | --- | --- |
| serviceName | <code>string</code> | name of the service |

<a name="module_onem-nodejs-api..Service+addForm"></a>

#### service.addForm(template, data) ⇒ <code>object</code>
Adds a new form to the service with given pug template and data object

**Kind**: instance method of [<code>Service</code>](#module_onem-nodejs-api..Service)  
**Returns**: <code>object</code> - form object that was added  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | reference to the pug template file |
| data | <code>object</code> | form variables for injection |

<a name="module_onem-nodejs-api..Service+addMenu"></a>

#### service.addMenu(template, data) ⇒ <code>object</code>
Adds a new menu to the service with given pug template and data object

**Kind**: instance method of [<code>Service</code>](#module_onem-nodejs-api..Service)  
**Returns**: <code>object</code> - menu object that was added  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | reference to the pug template file |
| data | <code>object</code> | menu variables for injection |

<a name="module_onem-nodejs-api..Form"></a>

### onem-nodejs-api~Form(index, template, data)
Instantiates a new Form with given name and optional verbs list

**Kind**: inner method of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index to the array of forms that this form instance references |
| template | <code>string</code> | file reference of the pug template |
| data | <code>object</code> | form variables for injection |


* [~Form(index, template, data)](#module_onem-nodejs-api..Form)
    * [.header([header])](#module_onem-nodejs-api..Form+header) ⇒ <code>boolean</code> \| <code>string</code>
    * [.footer([footer])](#module_onem-nodejs-api..Form+footer) ⇒ <code>boolean</code> \| <code>string</code>
    * [.render()](#module_onem-nodejs-api..Form+render) ⇒ <code>Form</code>

<a name="module_onem-nodejs-api..Form+header"></a>

#### form.header([header]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom form header

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating header was set or the current value of the header  

| Param | Type | Description |
| --- | --- | --- |
| [header] | <code>string</code> | optional value of the header |

<a name="module_onem-nodejs-api..Form+footer"></a>

#### form.footer([footer]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom form footer

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating footer was set or the current value of the footer  

| Param | Type | Description |
| --- | --- | --- |
| [footer] | <code>string</code> | optional value of the footer |

<a name="module_onem-nodejs-api..Form+render"></a>

#### form.render() ⇒ <code>Form</code>
Processes the pug template for this form using the Form's this.data object as input and returns a JSON object ready for sending on the ONEm connection

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>Form</code> - JSON object  
<a name="module_onem-nodejs-api..Menu"></a>

### onem-nodejs-api~Menu(index, template, data)
Instantiates a new Menu with given name and optional verbs list

**Kind**: inner method of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index to the array of menu items that this form instance references |
| template | <code>string</code> | file reference of the pug template |
| data | <code>object</code> | form variables for injection |


* [~Menu(index, template, data)](#module_onem-nodejs-api..Menu)
    * [.header([header])](#module_onem-nodejs-api..Menu+header) ⇒ <code>boolean</code> \| <code>string</code>
    * [.footer([footer])](#module_onem-nodejs-api..Menu+footer) ⇒ <code>boolean</code> \| <code>string</code>
    * [.render()](#module_onem-nodejs-api..Menu+render) ⇒ <code>Menu</code>

<a name="module_onem-nodejs-api..Menu+header"></a>

#### menu.header([header]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom menu header

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating header was set or the current value of the header  

| Param | Type | Description |
| --- | --- | --- |
| [header] | <code>string</code> | optional value of the header |

<a name="module_onem-nodejs-api..Menu+footer"></a>

#### menu.footer([footer]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom menu footer

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating footer was set or the current value of the footer  

| Param | Type | Description |
| --- | --- | --- |
| [footer] | <code>string</code> | optional value of the footer |

<a name="module_onem-nodejs-api..Menu+render"></a>

#### menu.render() ⇒ <code>Menu</code>
Processes the pug template for this menu using the menu's this.data object as input and returns a JSON object ready for sending on the ONEm connection

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>Menu</code> - JSON object  
<a name="module_onem-nodejs-api..Form"></a>

### onem-nodejs-api~Form : <code>object</code>
**Kind**: inner typedef of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;form&#x27;</code> | 'Form' |
| [header] | <code>string</code> | header value |
| body | <code>FormBody</code> | form body object |
| [footer] | <code>string</code> | footer value |


* [~Form](#module_onem-nodejs-api..Form) : <code>object</code>
    * [.header([header])](#module_onem-nodejs-api..Form+header) ⇒ <code>boolean</code> \| <code>string</code>
    * [.footer([footer])](#module_onem-nodejs-api..Form+footer) ⇒ <code>boolean</code> \| <code>string</code>
    * [.render()](#module_onem-nodejs-api..Form+render) ⇒ <code>Form</code>

<a name="module_onem-nodejs-api..Form+header"></a>

#### form.header([header]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom form header

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating header was set or the current value of the header  

| Param | Type | Description |
| --- | --- | --- |
| [header] | <code>string</code> | optional value of the header |

<a name="module_onem-nodejs-api..Form+footer"></a>

#### form.footer([footer]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom form footer

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating footer was set or the current value of the footer  

| Param | Type | Description |
| --- | --- | --- |
| [footer] | <code>string</code> | optional value of the footer |

<a name="module_onem-nodejs-api..Form+render"></a>

#### form.render() ⇒ <code>Form</code>
Processes the pug template for this form using the Form's this.data object as input and returns a JSON object ready for sending on the ONEm connection

**Kind**: instance method of [<code>Form</code>](#module_onem-nodejs-api..Form)  
**Returns**: <code>Form</code> - JSON object  
<a name="module_onem-nodejs-api..FormBody"></a>

### onem-nodejs-api~FormBody : <code>object</code>
**Kind**: inner typedef of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| formItems | <code>Array.FormItem</code> |  |
| nextRoute | <code>string</code> |  |
| method | <code>&#x27;get&#x27;</code> \| <code>&#x27;post&#x27;</code> \| <code>&#x27;put&#x27;</code> \| <code>&#x27;delete&#x27;</code> | HTTP method that should be used when redirecting after successful form submission |

<a name="module_onem-nodejs-api..FormItem"></a>

### onem-nodejs-api~FormItem : <code>object</code>
**Kind**: inner typedef of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| description | <code>string</code> | description of the form item which will appear as a prompt to the user |
| name | <code>string</code> | name of the form property which will appear in the footer by default |
| type | <code>&#x27;string&#x27;</code> \| <code>&#x27;number&#x27;</code> \| <code>&#x27;date&#x27;</code> | used for field validation |

<a name="module_onem-nodejs-api..Menu"></a>

### onem-nodejs-api~Menu : <code>object</code>
**Kind**: inner typedef of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;menu&#x27;</code> | 'Menu' |
| [header] | <code>string</code> | header value |
| body | <code>Array.MenuItem</code> | form body object |
| [footer] | <code>string</code> | footer value |


* [~Menu](#module_onem-nodejs-api..Menu) : <code>object</code>
    * [.header([header])](#module_onem-nodejs-api..Menu+header) ⇒ <code>boolean</code> \| <code>string</code>
    * [.footer([footer])](#module_onem-nodejs-api..Menu+footer) ⇒ <code>boolean</code> \| <code>string</code>
    * [.render()](#module_onem-nodejs-api..Menu+render) ⇒ <code>Menu</code>

<a name="module_onem-nodejs-api..Menu+header"></a>

#### menu.header([header]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom menu header

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating header was set or the current value of the header  

| Param | Type | Description |
| --- | --- | --- |
| [header] | <code>string</code> | optional value of the header |

<a name="module_onem-nodejs-api..Menu+footer"></a>

#### menu.footer([footer]) ⇒ <code>boolean</code> \| <code>string</code>
Getter/setter for a custom menu footer

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>boolean</code> \| <code>string</code> - true indicating footer was set or the current value of the footer  

| Param | Type | Description |
| --- | --- | --- |
| [footer] | <code>string</code> | optional value of the footer |

<a name="module_onem-nodejs-api..Menu+render"></a>

#### menu.render() ⇒ <code>Menu</code>
Processes the pug template for this menu using the menu's this.data object as input and returns a JSON object ready for sending on the ONEm connection

**Kind**: instance method of [<code>Menu</code>](#module_onem-nodejs-api..Menu)  
**Returns**: <code>Menu</code> - JSON object  
<a name="module_onem-nodejs-api..MenuItem"></a>

### onem-nodejs-api~MenuItem : <code>object</code>
**Kind**: inner typedef of [<code>onem-nodejs-api</code>](#module_onem-nodejs-api)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&#x27;option&#x27;</code> \| <code>&#x27;content&#x27;</code> |  | indicating menu option or plain content |
| description | <code>string</code> |  |  |
| [nextRoute] | <code>string</code> |  | For menu options only.  Path to be used for HTTP callback (added to base path configured in app's settings in developer portal) |
| [method] | <code>&#x27;get&#x27;</code> \| <code>&#x27;post&#x27;</code> \| <code>&#x27;put&#x27;</code> \| <code>&#x27;delete&#x27;</code> | <code>get</code> | For menu options only.  HTTP method that should be used when redirecting after successful menu option submission |

