import { expect } from 'chai';

import FormLogic from '../../src';

describe('matches validator', () => {
  it('validates matching string', () => {
    const validator = FormLogic.validators.matches;
    const errors = validator('abc', [
      { regexp: /abc/, errorKey: 'mismatch', errorMessage: 'does not match' }
    ]);

    expect(errors).to.be.undefined;
  });

  it('invalidates non-matching string', () => {
    const validator = FormLogic.validators.matches;
    const errors = validator('abc', [
      { regexp: /def/, errorKey: 'mismatch', errorMessage: 'does not match' }
    ]);

    expect(errors).to.deep.equal([{
      key: 'mismatch',
      message: 'does not match'
    }]);
  });
});
