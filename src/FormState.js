import { FormLogic } from './FormLogic';
import { FieldState } from './FieldState';

export class FormState {
  constructor(form, initialValues, serverErrors) {
    this.form = form;
    this.initialValues = initialValues;
    this.serverErrors = serverErrors;

    this.reset();
  }

  reset() {
    this.clientErrors = {};

    this.state = {};
    this.state.fields = {}
    this.state.values = {};

    const values = this.initialValues || {};

    for(const fieldName in this.form.fields) {
      this.state.fields[fieldName] = new FieldState(fieldName, values[fieldName]);
      this.state.values[fieldName] = values[fieldName] || '';
    };

    this.updateErrors();
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
    const fieldType = event.target.type;
    const fieldName = event.target.name;
    const fieldValue = fieldType === 'checkbox' ? event.target.checked : event.target.value;

    this.serverErrors[fieldName] = undefined;

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

    this.clientErrors = this.form.validate(validatedValues);

    return this.updateErrors();
  }

  setServerErrors(errors) {
    this.serverErrors = errors || {};

    return this.updateErrors();
  }

  updateErrors() {
    let valid = true;

    for(const fieldName in this.state.fields) {
      const clientErrors = this.clientErrors[fieldName] || [];
      const serverErrors = this.serverErrors[fieldName] || [];
      const fieldErrors = clientErrors.concat(serverErrors);

      if(clientErrors.length > 0) valid = false;

      const processedErrors = fieldErrors.map((error) => {
        if(FormLogic.config.errorMessageFormat) {
          error.formattedMessage =
            FormLogic.config.errorMessageFormat(error, this.form, this.state, this.state.fields[fieldName]);
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
