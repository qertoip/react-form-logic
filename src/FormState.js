import { each, map, size, transform, isArray } from 'lodash';

import { FormLogic } from './FormLogic';
import { FieldState } from './FieldState';

export class FormState {
  constructor(form, errors, component) {
    this.form = form;
    this.component = component;

    this.state = {};
    this.state.values = {};

    this.state.fields = transform(form.fields, (fields, field, fieldName) => {
      fields[fieldName] = new FieldState(fieldName);

      this.state.values[fieldName] = "";
    });

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
    each(this.state.fields, (fieldState) => fieldState.touch());

    return this.validate();
  }

  validate() {
    const validatedValues = transform(this.state.fields, (validatedValues, fieldState, fieldName) => {
      if(fieldState.touched) {
        validatedValues[fieldName] = this.state.values[fieldName];
      }
    });

    return this.setErrors(this.form.validate(validatedValues));
  }

  setErrors(errors) {
    let valid = true;

    each(errors, (fieldErrors, fieldName) => {
      if(fieldErrors.length > 0) valid = false;

      const processedErrors = map(fieldErrors, (error) => {
        if(FormLogic.config.errorMessageFormat) {
          error.formattedMessage =
            FormLogic.config.errorMessageFormat(error, this.state.fields[fieldName], this.component);
        }

        return error;
      });

      this.state.fields[fieldName].setErrors(processedErrors);
    });

    return valid;
  }

  getState() {
    return this.state;
  }
}
