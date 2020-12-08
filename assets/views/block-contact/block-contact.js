import FormValidate from '../../modules/formValidate/formValidate.js';
import Placeholder from '../../modules/placeholder/placeholder.js'


const form = document.querySelector('.block-contact form');
FormValidate(form, () => {
    form.submit();
});
Placeholder();
    