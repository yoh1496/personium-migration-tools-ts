import { assert } from 'chai';
import { describe, it } from 'mocha';

import { convertOldNormalizedURI } from '../src/tools/convertOldNormalizedURI';

describe('convertion is excecuted correctly', () => {
  it('Returns correct uri', () => {
    assert.equal(
      'personium-localunit:unitadmin:/#unitadmin',
      convertOldNormalizedURI('personium-localunit:/unitadmin/#unitadmin')
    );
  });
  it('Returns null if non-localunit schema uri is presented', () => {
    assert.equal(
      null,
      convertOldNormalizedURI(
        'https://dummy.pds.example.com/testunit#unitadmin'
      )
    );
  });

  it('Returns null if current-style localunit schema uri is presented', () => {
    assert.equal(
      null,
      convertOldNormalizedURI(
        'https://personium-localunit:unitadmin:/#unitadmin'
      )
    );
  });
});
