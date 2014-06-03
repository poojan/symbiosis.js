/* global describe, it, expect */
'use strict';

import {Symbiosis} from '../../../src/symbiosis.js';
import {BaseModel} from '../../../src/model/base/base-model.js';

describe('Symbiosis', function () {
  describe('Model', function () {

    it('should be defined', function () {
      expect(Symbiosis.Model).toBeDefined();
    });

    describe('when model defined', function () {
      var model;

      beforeEach(function () {
        model = Symbiosis.Model.define('User', {
          fields: {
            id: 'String',
            firstname: 'String',
            surname: 'String',
            age: 'Number',
            createdDate: {
              type: 'Date',
              persistable: false
            },
            friends: {
              hasMany: 'User'
            }
          },
          computedValues: {
            fullName: function (model) {
              if (model.firstname && model.surname) {
                return model.firstname + ' ' + model.surname;
              }
            }
          },
          adapter: {
            configuration: {
              baseUrl: 'http://example.com/api/users'
            }
          }
        });
      });

      it('should return model constructor', function () {
        expect(model).toBeDefined();
      });

      describe('and model constructor requested', function () {
        beforeEach(function () {
          model = Symbiosis.Model.get('User');
        });

        it('should return model constructor', function () {
          expect(model).toBeDefined();
        });
      });

      describe('models behaviour', function () {
        describe('when instance created', function () {
          var instance;

          beforeEach(function () {
            instance = model.create();
          });

          it('should be created', function () {
            expect(instance).toBeDefined();
          });

          describe('when removed', function () {
            beforeEach(function () {
              instance.remove();
            });

            it('should be removed', function () {
            });

          });

          describe('when set property', function () {
            beforeEach(function () {
              instance.set({firstname: 'John'});
            });

            it('should set property', function () {
              expect(instance.firstname).toEqual('John');
            });
          });

          describe('when get identifier', function () {

          });

          describe('when validated', function () {

          });

          describe('when serialized', function () {

          });

          describe('when commited', function () {

          });

          describe('when saved', function () {

          });

          describe('when custom method called', function () {

          });

          describe('when digest', function () {
            beforeEach(function () {
              instance.digest();
            });

            it('should set the computed values of the model', function () {
              expect(instance.fullName).toBe('');
            });

            xdescribe('and fields initalized', function () {
              beforeEach(function () {
                instance.firstname = 'Kenneth';
                instance.surname = 'Lynne';
              });

              beforeEach(function () {
                instance.digest();
              });

              it('should be re-computed', function () {
                expect(instance.fullName).toBe('Kenneth Lynne');
              });

            });
          });

        });

        describe('when static methods', function () {

        });
      });
    });
  });
});
