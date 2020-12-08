"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const FormValidate = (form, onSend) => {
  const fields = form.querySelectorAll(':required');
  const submit = form.querySelector('[type="submit"]');
  let validity = true;
  var valueMissing = false;
  var init = true;

  const validate = () => {
    if (init) return;
    validity = true;

    for (let field of fields) {
      const msg = field.parentNode.querySelector('.error-msg');

      if (!field.checkValidity()) {
        field.classList.add('error');
        field.classList.remove('valid');

        if (field.name === 'apply_phone') {
          msg.innerHTML = 'Veuillez saisir un numéro de téléphone valide avec 13 caractères maximum.';
        } else {
          msg.innerHTML = field.validationMessage;
        }

        validity = false;
      } else {
        field.classList.add('valid');
        field.classList.remove('error');
        msg.innerHTML = '';
      }
    }

    return validity;
  };

  for (let field of fields) {
    const msg = document.createElement('div');
    msg.className = 'error-msg';
    field.parentNode.appendChild(msg);
    const status = document.createElement('div');
    status.className = 'status';
    field.parentNode.appendChild(status);
    field.addEventListener('input', () => {
      validate();
    });
  }

  form.onsubmit = e => {
    e.preventDefault();

    if (!valueMissing) {
      init = false;
      if (validate()) onSend();
    }
  };
};

var _default = FormValidate;
exports.default = _default;