"use strict";
import {ORM} from '../../../src/orm.js';

describe('ORM', function () {
  describe('Property', function () {

    it('should be defined', function () {
      expect(ORM.Property).toBeDefined();
    });

    describe('define', function () {
      it('should return a property that extends the base property', function() {
        var Property = ORM.Property.define('String', {});
        expect(Property instanceof BaseProperty).toBeTruthy();
      });
    });

  });

});
