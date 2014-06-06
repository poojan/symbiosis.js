/* global describe, it, expect */
'use strict';

import {Symbiosis} from '../../../src/symbiosis.js';

describe('Symbiosis', function () {
  describe('Model', function () {

    it('should be defined', function () {
      expect(Symbiosis.Model).toBeDefined();
    });

    describe('when model defined', function () {
      var definition;

      beforeEach(function () {
        definition = Symbiosis.Model.define('User', {
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
        expect(definition).toBeDefined();
      });

      describe('and model constructor requested', function () {
        beforeEach(function () {
          definition = Symbiosis.Model.get('User');
        });

        it('should return model constructor', function () {
          expect(definition).toBeDefined();
        });
      });

      describe('models behaviour', function () {
        describe('when model created', function () {
          var model;

          beforeEach(function () {
            model = definition.create();
          });

          it('should be created', function () {
            expect(model).toBeDefined();
          });

          describe('when removed', function () {
            beforeEach(function () {
              model.remove();
            });

            it('should be removed', function () {
            });

          });

          describe('when set property', function () {
            beforeEach(function () {
              model.set({firstname: 'John'});
            });

            it('should set property', function () {
              expect(model.firstname).toEqual('John');
            });

            describe('and set few properties', function () {
              beforeEach(function () {
                model.set({firstname: 'John', surname: 'Snow'});
              });

              it('should set properties', function () {
                expect(model.firstname).toEqual('John');
                expect(model.surname).toEqual('Snow');
              });
            });

            describe('and set non-defined property', function () {
              it('should thrown exception', function () {
                var create = function () {
                  model.set({firstname: 'John', lastname: 'Snow'});
                };

                expect(create).toThrow(new Error('lastname is not defined'));
              });
            })
          });

          describe('when get identifier', function () {

          });

          describe('when validated', function () {

          });

          describe('when serialized', function () {
            var serialized;

            describe('without serialization handlers', function () {
              beforeEach(function () {
                model = definition.create({firstname: 'John', surname: 'Snow'});
              });

              beforeEach(function () {
                serialized = model.serialize();
              });

              it('should serialize to object', function () {
                expect(serialized).toEqual({firstname: 'John', surname: 'Snow'});
              });
            });

            describe('with serialization handlers', function () {
              beforeEach(function () {
                definition = Symbiosis.Model.define('User', {
                  fields: {
                    id: 'String',
                    firstname: 'String',
                    surname: 'String'
                  },

                  serializationHandlers: {
                    firstname: function (value) {
                      return 'Mr. ' + value;
                    }
                  }
                });

                model = definition.create({firstname: 'John', surname: 'Snow'});
              });

              beforeEach(function () {
                serialized = model.serialize();
              });

              it('should serialize to object', function () {
                expect(serialized).toEqual({firstname: 'Mr. John', surname: 'Snow'});
              });
            });
          });

          describe('when commited', function () {

          });

          describe('when saved', function () {

          });

          describe('when custom method called', function () {

          });

          describe('when digest', function () {
            beforeEach(function () {
              model.digest();
            });

            it('should set the computed values of the model', function () {
              expect(model.fullName).toBe('');
            });

            xdescribe('and fields initalized', function () {
              beforeEach(function () {
                model.firstname = 'Kenneth';
                model.surname = 'Lynne';
              });

              beforeEach(function () {
                model.digest();
              });

              it('should be re-computed', function () {
                expect(model.fullName).toBe('Kenneth Lynne');
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
