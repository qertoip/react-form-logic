export class FieldState {
  constructor(fieldName) {
    this.name = fieldName;

    this.invalid = false;
    this.errors = [];

    this.dirty = false;
    this.touched = false;
    this.focused = false;
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
    if(errors.length > 0) this.invalid = true;    

    this.errors = errors;
  }
}
