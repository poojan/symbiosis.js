/* global describe, it, expect */

import {Module} from '../../../src/core/module.js';

xdescribe('Symbiosis', function () {
  describe('Core', function () {
    describe('Module', function () {

      it('should be defined', function () {
        expect(Module).toBeDefined();
      });

      describe('when module defined', function () {
        var module,
          mockFactory = jasmine.createSpy('factory.create')
            .andCallFake(function () {
              return 'Mock result';
            });

        beforeEach(function () {
          module = new Module(mockFactory);
        });

        it('should call factory', function () {
          module.define('Name', 'definition');
          expect(mockFactory).toHaveBeenCalledWith('definition');
        });

        describe('and definition requested', function () {
          var definition;

          beforeEach(function () {
            definition = module.define('Name');
          });

          it('should return the factories result', function () {
            expect(definition).toBe('Mock result');
            expect(module.get('Name')).toBe(definition);
          });
        });
      });
    });
  })
});
