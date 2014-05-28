/* global describe, it, expect */
'use strict';

import {Symbiosis} from '../../../src/symbiosis.js';
import {BaseModel} from '../../../src/model/base/model.js';

describe('Symbiosis', function () {
  describe('Model', function () {

    it('should be defined', function () {
      expect(Symbiosis.Model).toBeDefined();
    });

    describe('define', function () {
      it('should return a model that extends the base model', function() {
        var Person = Symbiosis.Model.define('Person', {});
        expect(Person instanceof BaseModel).toBeTruthy();
      });
    });
  });
});
