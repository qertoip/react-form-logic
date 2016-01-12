import { FormLogic } from './FormLogic';
import { FieldState } from './FieldState';

export class FormState {
  constructor(form, values, errors, component) {
    this.form = form;
    this.component = component;

    this.state = {};
    this.state.fields = {}
    this.state.values = {};

    for(const fieldName in form.fields) {
      this.state.fields[fieldName] = new FieldState(fieldName, values[fieldName]);
      this.state.values[fieldName] = values[fieldName];
    };

    this.setErrors(errors);
  }

  focusField(event) {
    const fieldName = event.target.name;
    this.state.fields[fieldName].focus();
  }

  blurField(event) {
    const fieldName = event.target.name;
    this.state.fields[fieldName].blur();

    return this.validate();
  }

  changeField(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.state.fields[fieldName].change(fieldValue);
    this.state.values[fieldName] = fieldValue;

    return this.validate();
  }

  submitForm() {
    for(const fieldName in this.state.fields) {
      this.state.fields[fieldName].touch();
    }

    return this.validate();
  }

  validate() {
    const validatedValues = {};

    for(const fieldName in this.state.fields) {
      if(this.state.fields[fieldName].touched) {
        validatedValues[fieldName] = this.state.values[fieldName];
      }
    }

    return this.setErrors(this.form.validate(validatedValues));
  }

  setErrors(errors) {
    let valid = true;

    for(const fieldName in errors) {
      const fieldErrors = errors[fieldName];

      if(fieldErrors.length > 0) valid = false;

      const processedErrors = fieldErrors.map((error) => {
        if(FormLogic.config.errorMessageFormat) {
          error.formattedMessage =
            FormLogic.config.errorMessageFormat(error, this.state.fields[fieldName], this.component);
        }

        return error;
      });

      this.state.fields[fieldName].setErrors(processedErrors);
    };

    return valid;
  }

  getState() {
    return this.state;
  }
}
