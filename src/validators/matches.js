import { FormLogic } from '../FormLogic';

FormLogic.addValidator('matches', (value, options) => {
  const errors = [];

  for(const validation of options) {
    if(!value || !value.match(validation.regexp)) {
      errors.push(FormLogic.ValidationError({
        key: validation.errorKey,
        message: validation.errorMessage
      }));
    }
  }

  if(errors.length > 0) return errors;
});
