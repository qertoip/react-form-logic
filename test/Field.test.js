import { expect } from 'chai';

import FormLogic from '../src';

describe('Field', () => {
  it('creates fields with presence validation', () => {
    const field = FormLogic.Field({ presence: true });

    expect(field.validations.length).to.equal(1);
    expect(field.validations[0].validationName).to.equal('presence');
  });

  it('passes validations associated with the field', () => {
    const field = FormLogic.Field({ presence: true });

    const errors = field.validate('test');

    expect(errors.length).to.equal(0);
  });

  it('fails validations associated with the field', () => {
    const field = FormLogic.Field({ presence: true });

    const errors = field.validate('');

    expect(errors.length).to.equal(1);
    expect(errors[0]).to.deep.equal({ key: 'blank', message: "can't be blank" });
  });
});
