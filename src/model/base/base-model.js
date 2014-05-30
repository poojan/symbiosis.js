'use strict';

class ModelInstance {
  remove() {
    this.removed = true;
  }

  getRemoved() {
    return this.removed;
  }

  set(options) {
    var self = this;
    Object.keys(options).forEach(function (key) {
      self[key] = options[key];
    });
  }
}

export class BaseModel {

  constructor(adapter) {
    //Register instances adapter, properties etc.
  }

  create() {
    return new ModelInstance();
  }

}
