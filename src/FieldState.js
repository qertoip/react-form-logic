export class FieldState {
  constructor(fieldName, initialValue) {
    this.name = fieldName;

    this.invalid = false;
    this.errors = [];

    this.dirty = !!initialValue;
    this.touched = !!initialValue;
    this.focused = false;

    this.value = initialValue ? initialValue : '';
    this.defaultValue = initialValue ? initialValue : '';
  }

  focus() {
    this.focused = true;
  }

  blur() {
    this.touched = true;
    this.focused = false;
  }

  change(value) {
    this.invalid = false;
    this.errors = [];

    this.dirty = true;
    this.touched = true;

    this.value = value;
  }

  touch() {
    this.touched = true;
  }

  setErrors(errors) {
    if(errors.length > 0) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }

    this.errors = errors;
  }
}
