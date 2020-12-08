"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const Placeholder = function () {
  const inputs = document.querySelectorAll('input[type="text"],input[type="email"],input[type="tel"], textarea');

  for (let input of inputs) {
    const label = input.parentNode.querySelector('label');

    if (label) {
      input.oninput = () => {
        input.value === '' ? label.classList.remove('active') : label.classList.add('active');
      };

      input.onblur = () => input.value === '' && label.classList.remove('active');

      input.value.length && label.classList.add('active');
    }
  }
};

var _default = Placeholder;
exports.default = _default;