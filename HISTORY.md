# History

---
## 0.14.0
  - Support for img and video tags in type=menu
---
## 0.13.0
  - Support for textarea tag
---
## 0.12.0
  - Support for phone and tel input types 
---
## 0.11.0
- Step:
  - Fixes for step attribute for input tag
---
## 0.6.0
- HTML API:
  - Added a bunch of new attributes on `<input>`: `min`, `min-error`,
  `minlength`, `minlength-error`, `max`, `max-error`, `maxlength`,
  `maxlength-error`, `step`, `value`
  - Added a bunch of new attributes on `<section>`: `chunking-footer`,
  `confirmation-label`, `method`, `required`, `status-exclude`,
  `status-prepend`, `url`, `validate-type-error`, `validate-type-error-footer`,
  `validate-url`
  - Added new input types: `number`, `hidden`

- NodeJS API
  - Removed `FormItemMenu` and `FormItemContent`. Use a single model instead -
  `FormItem` which achieves the functionality of both old models
  - A bunch of new properties were added on `FormItem`, taken from `<input>`
  and `<section>` tags (see changes in HTML API above).
  - Added `textSearch` property on `MenuItemFormItem`

---
## 0.5.0
- HTML API:
  - Added `text-search` attribute on `<li>` tag in order to send more context
  to ONEm Platform to search in.

- NodeJS API:
  - Added `textSearch` attribute on both `MenuItem` and `FormItemMenuItem`.
  This attribute has origin in `<li>` tag.
---
## 0.4.0
- HTML API:
  - Added `auto-select`, `multi-select` and `numbered` flags on `<section>` 
  tag. They take effect only if the `<section>` tag contains options
  - Boolean attributes are evaluated according to HTML5 (if present, a boolean
  attribute is `true`; if absent, it's `false`)

- NodeJS API:
  - Added `MenuMeta` and `FormItemMenuMeta` objects to describe `Menu` objects 
  and `FormItemMenu` objects respectively.
    - `MenuMeta` can contain `autoSelect`
    - `FormItemMenuMeta` can contain `autoSelect`, `multiSelect` and `numbered`
    - these attributes have origin in `<section>` tag
---
