"use strict";

var _formValidate = _interopRequireDefault(require("../../modules/formValidate/formValidate.js"));

var _placeholder = _interopRequireDefault(require("../../modules/placeholder/placeholder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const form = document.querySelector('.block-contact form');
(0, _formValidate.default)(form, () => {
  form.submit();
});
(0, _placeholder.default)();