import React, { Component } from 'react';

import { FormLogic } from './FormLogic';
import { FormState } from './FormState';

FormLogic.decorate = (form, FormComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.formState = new FormState(form, props.errors, FormComponent);

      this.state = this.formState.getState();
    }

    componentWillReceiveProps(props) {
      this.formState.setErrors(props.errors);
    }      

    handleChange(event) {
      if(this.isField(event.target)) {
        const field = event.target;
        this.formState.changeField(field.name, field.value);
        this.setState(this.formState.getState());
      }
    }

    handleFocus(event) {
      if(this.isField(event.target)) {
        const field = event.target;
        this.formState.focusField(field.name, field.value);
        this.setState(this.formState.getState());
      }
    }

    handleBlur(event) {
      if(this.isField(event.target)) {
        const field = event.target;
        this.formState.blurField(field.name, field.value);
        this.setState(this.formState.getState());
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      
      const valid = this.formState.submitForm();

      this.setState(this.formState.getState());

      if(valid) {
        const values = this.formState.getValues();

        this.props.onSubmit(values);
      }
    }

    isField(element) {
      return element.tagName === 'INPUT' || element.tagName === 'SELECT';
    }

    render() {
      return (
        <FormComponent
          {...this.props}
          form={this.state}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
      );
    }
  };
};
