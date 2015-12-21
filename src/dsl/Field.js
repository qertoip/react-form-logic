import { FormLogic } from '../FormLogic';

FormLogic.Field = function(fieldValidators) {
  const field = {};

  field.validations = [];

  field.validate = function(value) {
    const errors = [];

    for(const validation of this.validations) {
      const error = validation(value);
      if(error) errors.push(error);
    }
    
    return errors;
  };

  for(const validatorName in fieldValidators) {
    const validationOptions = fieldValidators[validatorName];

    const validation = (fieldValue) => {
      const validator = FormLogic.validators[validatorName];
      return validator(fieldValue, validationOptions);
    };
      
    validation.validationName = validatorName;
    
    field.validations.push(validation);
  }

  return field;
};
