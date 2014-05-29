class ModelInstance {
  constructor(definition) {
    this.definition = definition;
  }

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
  constructor(definition) {
    this.definition = definition;
  }

  create() {
    return new ModelInstance(this.definition);
  }
}
