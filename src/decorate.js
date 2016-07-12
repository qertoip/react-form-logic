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

      if(props.values != this.props.values) {
        this.formState = new FormState(form, props.values, props.errors || {});
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

        const field = form.fields[event.target.name];

        if(field.options.onFocus) {
          field.options.onFocus(event.target.value, this.state, this.props, event);
        }
      }
    }

    handleBlur(event) {
      if(this.isField(event.target)) {
        this.formState.blurField(event);
        this.setState(this.formState.getState());

        const field = form.fields[event.target.name];

        if(field.options.onBlur) {
          field.options.onBlur(event.target.value, this.state, this.props, event);
        }
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

    render() {
      const formProps = {
        onChange: this.handleChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onSubmit: this.handleSubmit.bind(this)
      };

      return (
        <AutofillChangeEventPolyfill>
          <FormComponent
            {...this.props}
            form={this.state}
            formProps={formProps}
            resetForm={this.formState.reset.bind(this.formState)}
            ref='decorated'
          />
        </AutofillChangeEventPolyfill>
      );
    }
  };
};
