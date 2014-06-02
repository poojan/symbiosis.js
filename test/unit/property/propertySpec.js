/* global describe, it, expect */
'use strict';

import {Symbiosis} from '../../../src/symbiosis.js';
import {BaseProperty} from '../../../src/property/base/base-property.js';

describe('ORM', function () {
  describe('Property', function () {

    it('should be defined', function () {
      expect(Symbiosis.Property).toBeDefined();
    });

    describe('define', function () {
      it('should return a property that extends the base property', function() {
        var Property = Symbiosis.Property.define('String', {});
        expect(Property instanceof BaseProperty).toBeTruthy();
      });
    });

  });

});
