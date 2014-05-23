"use strict";
import {ORM} from '../../../src/orm.js';

describe('ORM', function () {
  var ORM = window.ORM;

  describe('Model', function () {

    it('should be defined', function () {
      expect(ORM.Model).toBeDefined();
    });

    describe('define', function () {
      it('should return a model', function() {
        var Person = ORM.Model.define('Person', {});
      });
    });

  });

});