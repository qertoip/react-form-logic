import { each, map, size, transform, isArray } from 'lodash';

import { FormLogic } from './FormLogic';
import { FieldState } from './FieldState';

export class FormState {
  constructor(form, errors, component) {
    this.form = form;
    this.component = component;

    this.state = {};

    this.state.fields = transform(form.fields, (fields, field, fieldName) => {
      fields[fieldName] = new FieldState(fieldName);
    });

    this.setErrors(errors);
  }

  focusField(fieldName) {
    this.state.fields[fieldName].focus();
  }

  blurField(fieldName) {
    this.state.fields[fieldName].blur();

    return this.validate();
  }

  changeField(fieldName, fieldValue) {
    this.state.fields[fieldName].change(fieldValue);

    return this.validate();
  }

  submitForm() {
    each(this.state.fields, (fieldState) => fieldState.touch());

    return this.validate();
  }

  validate() {
    const values = transform(this.state.fields, (values, fieldState, fieldName) => {
      if(fieldState.touched) {
        values[fieldName] = fieldState.value;
      }
    });

    return this.setErrors(this.form.validate(values));
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

  getValues() {
    return transform(this.state.fields, (values, fieldState, fieldName) => {
      values[fieldName] = fieldState.value;
    });
  }
}
