import {Property} from './base/property.js';

/**
 * Define a property
 * @param propertyDefinition Property definition object
 */
export var PropertyFactory = function (propertyDefinition) {
  //TODO: Extend and configure BaseProperty and return configured instance
  //Factory is responsible for getting all dependencies and preparing them (validation etc)
  return new Property();
};
