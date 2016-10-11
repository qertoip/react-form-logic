import React, { Component } from 'react';

import { AutofillChangeEventPolyfill } from './AutofillChangeEventPolyfill';
import { FormLogic } from './FormLogic';
import { FormState } from './FormState';

FormLogic.decorate = (form, FormComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.formState = new FormState(form, props.values, props.errors || {});

      this.state = this.formState.getState();
    }

    componentWillReceiveProps(props) {
      if(props.errors != this.props.errors) {
        this.formState.setServerErrors(props.errors);
        this.setState(this.formState.getState());
      }
    }

    handleChange(event) {
      if(this.isField(event.target)) {
        this.formState.changeField(event);
        this.setState(this.formState.getState());

        const field = form.fields[event.target.name];

        if(field.options.onChange) {
          field.options.onChange(event.target.value, this.state, this.props, event);
        }
      }
    }

    handleFocus(event) {
      if(this.isField(event.target)) {
        this.formState.focusField(event);
        this.setState(this.formState.getState());
      }
    }

    handleBlur(event) {
      if(this.isField(event.target)) {
        this.formState.blurField(event);
        this.setState(this.formState.getState());
      }
    }

    handleSubmit(event) {
      event.preventDefault();

      const valid = this.formState.submitForm();

      this.setState(this.formState.getState());

      if(valid) {
        this.props.onSubmit(this.state, this.props, this.refs.decorated.state);
      }
    }

    isField(element) {
      return element.tagName === 'INPUT' || element.tagName === 'SELECT';
    }

    resetForm() {
      this.formState.reset();
      this.setState(this.formState.getState());
    }

    get _customHandlers() {
      return this.formState.form.options
    }

    get _defaultHandlers() {
      return {
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onSubmit: this.handleSubmit
      }
    }

    get _handlers() {
      return Object.assign({}, this._defaultHandlers, this._customHandlers);
    }

    render() {
      const formProps = {
        onChange: this._handlers.onChange.bind(this),
        onFocus: this._handlers.onFocus.bind(this),
        onBlur: this._handlers.onBlur.bind(this),
        onSubmit: this._handlers.onSubmit.bind(this)
      }

      return (
          <AutofillChangeEventPolyfill>
            <FormComponent
                {...this.props}
                form={this.state}
                formProps={formProps}
                resetForm={this.resetForm.bind(this)}
                ref='decorated'
            />
          </AutofillChangeEventPolyfill>
      );
    }
  };
};
