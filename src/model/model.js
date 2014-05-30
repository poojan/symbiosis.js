'use strict';

import {ModelFactory} from './factory.js'

var definitions = {};

export var Model = {

  /**
   * Define a model
   * @param name Model name
   * @param modelDefinition Model definition object
   */
  define: function (name, modelDefinition) {
    //TODO: Use factory, and register an instance of the model
    //TODO: Pass ModelFactory dependancies (property, adapter, validation..)
    //TODO: Maybe factory should be a function that can be automatically dependancy injected?
    //di.js anyone?
    return definitions[name] = ModelFactory.create(modelDefinition);
  },

  /**
   * Get model by name
   * @param name Model name
   * @returns model
   */
  get: function (name) {
    return definitions[name];
  }

};
