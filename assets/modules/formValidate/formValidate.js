/* eslint-disable */

/**
 * formValidate
 */

const FormValidate = function(form, onSend){
    const fields = form.querySelectorAll(':required');
    const mandatory = form.getAttribute("data-mandatory");
    let validity = true;
    var init = true;

    this.reset = () => {
        init = true;
        for (let field of fields) {
            field.classList.remove('valid');
            field.classList.remove('error');
            field.parentNode.querySelector('.error-msg').innerHTML = '';
        }
    }
 
    // check error
    const validate = () => {
        if(init) return;
        validity = true;
        for (let field of fields) {
            const error_msg = field.parentNode.querySelector('.error-msg');
            const dataTypeMismatch = field.dataset.typemismatch;
            const dataPatternMismatch = field.dataset.patternmismatch;
            const tooLong = field.validity.tooLong;
            const tooShort = field.validity.tooShort;
            const typeMismatch = field.validity.typeMismatch;
            const patternMismatch = field.validity.patternMismatch;
            const stepMismatch = field.validity.stepMismatch;
            const valueMissing = field.validity.valueMissing;

            if (!field.checkValidity()) {
                field.classList.add('error');
                field.classList.remove('valid');
                var msg = "";
				if((typeMismatch || tooLong || tooShort || stepMismatch) && dataTypeMismatch) msg = dataTypeMismatch;
				if(patternMismatch && dataPatternMismatch) msg = dataPatternMismatch;
				if(valueMissing && mandatory) msg = mandatory;
				field.setCustomValidity(msg);
				error_msg.innerHTML = field.validationMessage;
                validity = false;
            } else {
                field.classList.add('valid');
                field.classList.remove('error');
                error_msg.innerHTML = '';
            }
        }
        return validity;
    };

    for (let field of fields) {
        const msg = document.createElement('div');
        msg.className = 'error-msg';
        field.parentNode.appendChild(msg);
        field.addEventListener('input', () => validate());
    }

    form.onsubmit = e => {
        e.preventDefault();
        init = false;
        validate() && onSend();
    };
};

export default FormValidate;
