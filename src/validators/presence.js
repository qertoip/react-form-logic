import { FormLogic } from '../FormLogic';

FormLogic.addValidator('presence', (value, options) => {
  if(!value || value === '') {
    return FormLogic.ValidationError({
      key: 'blank',
      message: "can't be blank"
    });
  }
});
