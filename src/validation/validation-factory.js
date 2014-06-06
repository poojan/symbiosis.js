import {Validation} from './base/validation.js';

/**
 * Define a validation
 * @param validationDefinition Validation definition object
 */
export var ValidationFactory = function (validationDefinition) {
  //TODO: Extend and configure BaseValidation and return configured instance
  //Factory is responsible for getting all dependencies and preparing them (validation etc)
  return new Validation();
};
