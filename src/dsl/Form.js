import { FormLogic } from '../FormLogic';

FormLogic.Form = function(form) {
  form.validate = function (values) {
    const formErrors = {};

    for(const fieldName in values) {
      const value = values[fieldName];
      const fieldErrors = form.fields[fieldName].validate(value);
      if(fieldErrors.length > 0) {
        formErrors[fieldName] = fieldErrors;
      }
    }

    return formErrors;
  };

  return form;
};
