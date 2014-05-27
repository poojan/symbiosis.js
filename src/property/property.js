'use strict';

import {BaseProperty} from './base/property.js';

export var Property = {

  /**
   * Define a property
   * @param name Property name
   * @param propertyDefinition Property definition object
   */
  define: function (name, propertyDefinition) {
    return new BaseProperty(name, propertyDefinition);
  }
};
