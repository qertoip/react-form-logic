import { FormLogic } from '../FormLogic';

FormLogic.Field = function(config) {
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

  field.options = config.options ? config.options : {};

  for(const validatorName in config) {
    if(validatorName === 'options') continue;

    const validationOptions = config[validatorName];

    const validation = (fieldValue) => {
      const validator = FormLogic.validators[validatorName];
      return validator(fieldValue, validationOptions);
    };
      
    validation.validationName = validatorName;
    
    field.validations.push(validation);
  }

  return field;
};
