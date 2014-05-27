
'use strict';

import {BaseModel} from './base/model.js';

export var Model = {

  /**
   * Define a model
   * @param name Model name
   * @param modelDefinition Model definition object
   */
  define: function (name, modelDefinition) {
    return new BaseModel(name, modelDefinition);
  }
};
