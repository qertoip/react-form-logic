import React, { Component } from 'react';

import { transform } from 'lodash';

import { FormState } from './FormState';

export function FormLogic(form) {
  return (FormComponent) => FormLogic.decorate(form, FormComponent);
};

FormLogic.config = {};

FormLogic.configure = function(config) {
  for(var key in config) {
    FormLogic.config[key] = config[key];
  }
};

FormLogic.validators = [];

FormLogic.addValidator = function(name, validator) {
  validator.validatorName = name;
  FormLogic.validators[name] = validator;
};
