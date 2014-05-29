
'use strict';

import {BaseModel} from './base/model.js';

var definitions = {};

export var Model = {

  /**
   * Define a model
   * @param name Model name
   * @param modelDefinition Model definition object
   */
  define: function (name, modelDefinition) {
    var base = new BaseModel(modelDefinition);
    definitions[name] = base;

    return base;
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
