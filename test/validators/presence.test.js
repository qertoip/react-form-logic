import { expect } from 'chai';

import { FormLogic } from '../../src';

describe('presence validator', () => {
  it('validates non-empty string', () => {
    const validator = FormLogic.validators.presence;
    const error = validator('abc');

    expect(error).to.be.undefined;
  });

  it('invalidates empty string', () => {
    const validator = FormLogic.validators.presence;
    const error = validator('');

    expect(error).to.deep.equal({
      key: 'blank',
      message: "can't be blank"
    });
  });
});
