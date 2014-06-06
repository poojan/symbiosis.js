import {Model} from './base/model.js';

/**
 * Define a model
 * @param modelDefinition Model definition object
 */
export var ModelFactory = function (modelDefinition) {
  //TODO: Extend and configure BaseModel and return configured instance
  //Factory is responsible for getting all dependencies and preparing them (properties, validation, adapters etc)
  return new Model(modelDefinition);
};
