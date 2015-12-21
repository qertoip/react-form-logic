import { expect } from 'chai';

import { FormLogic } from '../src';

describe('Form', () => {
  it('passes validations', () => {
    const form = FormLogic.Form({
      fields: {
        email: FormLogic.Field({ presence: true }),
        password: FormLogic.Field({ presence: true })
      }
    });

    const errors = form.validate({ email: 'asdf@asdf.com' });

    expect(errors).to.deep.equal({});
  });

  it('fails validations', () => {
    const form = FormLogic.Form({
      fields: {
        email: FormLogic.Field({ presence: true }),
        password: FormLogic.Field({ presence: true })
      }
    });

    const errors = form.validate({ email: '', password: '' });

    expect(errors).to.deep.equal({
      email: [{ key: 'blank', message: "can't be blank" }],
      password: [{ key: 'blank', message: "can't be blank" }]
    });
  });

  it('fails validations on subset of all fields', () => {
    const form = FormLogic.Form({
      fields: {
        email: FormLogic.Field({ presence: true }),
        password: FormLogic.Field({ presence: true })
      }
    });

    const errors = form.validate({ email: '' });

    expect(errors).to.deep.equal({
      email: [{ key: 'blank', message: "can't be blank" }]
    });
  });
});
