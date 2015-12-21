import { FormLogic } from '../FormLogic';

FormLogic.Field = function(fieldValidators) {
  const field = {};

  field.validations = [];

  field.validate = function(value) {
    const errors = [];

    for(const validation of this.validations) {
      const errorsOrError = validation(value);

      if(errorsOrError) {
        if(errorsOrError.length) {
          errors.push.apply(errors, errorsOrError);
        }
        else {
          errors.push(errorsOrError);
        }
      }
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
