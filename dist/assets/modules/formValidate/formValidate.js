const FormValidate = function (a, b) {
  const c = a.querySelectorAll(':required'),
        d = a.getAttribute("data-mandatory");
  let e = !0;
  var f = !0;

  this.reset = () => {
    f = !0;

    for (let a of c) a.classList.remove('valid'), a.classList.remove('error'), a.parentNode.querySelector('.error-msg').innerHTML = '';
  };

  const g = () => {
    if (!f) {
      e = !0;

      for (let b of c) {
        const c = b.parentNode.querySelector('.error-msg'),
              f = b.dataset.typemismatch,
              g = b.dataset.patternmismatch,
              h = b.validity.tooLong,
              i = b.validity.tooShort,
              j = b.validity.typeMismatch,
              k = b.validity.patternMismatch,
              l = b.validity.stepMismatch,
              m = b.validity.valueMissing;

        if (!b.checkValidity()) {
          b.classList.add('error'), b.classList.remove('valid');
          var a = "";
          (j || h || i || l) && f && (a = f), k && g && (a = g), m && d && (a = d), b.setCustomValidity(a), c.innerHTML = b.validationMessage, e = !1;
        } else b.classList.add('valid'), b.classList.remove('error'), c.innerHTML = '';
      }

      return e;
    }
  };

  for (let d of c) {
    const a = document.createElement('div');
    a.className = 'error-msg', d.parentNode.appendChild(a), d.addEventListener('input', () => g());
  }

  a.onsubmit = a => {
    a.preventDefault(), f = !1, g() && b();
  };
};

export default FormValidate;