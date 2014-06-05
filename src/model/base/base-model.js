//Static methods!?
export class BaseModel {

  constructor(definition, adapter) {
    //Register instances adapter, properties etc.
    this.definition = definition;
    this.__context = []; //Use some ES6 data structure more suited?
  }

  create(data) {
    return new ModelInstance(data, this);
  }

  //TODO: Person.get(ID);
  //TODO: Person.find({name: 'Something'});
  // Returns promise that eventually should resolve into a person with proxies to the persons friends and projects
  // (or the populated data if it already is fetched somewhere else in the application
  //TODO: Person.find(/*...*/).populate('friends', 'projects');
  // Returns promise that eventually resolves into a person with its associated friends and projects populated

}

class ModelInstance {

  constructor(data, context) {
    this.context = context;

    this._fields = context.definition.fields;
    this._computedValues = context.definition.computedValues || {};
    this._serializationHandlers = context.definition.serializationHandlers || {};

    if (data) {
      this.set(data);
    }
  }

  remove() {
    //TODO: Interface with models adapter to tell it to remove instance
    this.__isRemoving = true;
    //TODO: Fire onRemove callbacks
    //Adapter should return a promise.
    // When resolved:
    // this.__removed = true
    // When rejeted:
    // Finally:
    // this.__isRemoving = false
  }

  //TODO: validate() {
  //returns an array of all fields, their isValid, and an optional message
  //Iterate over all properties
  //}

  //TODO: A computed value over validations state
  //person.validation.fields['age']
  //{
  //	errors: ['Field is required']
  //}

  serialize() {
    var self = this;

    var fields = this._fields;
    var serializationHandlers = this._serializationHandlers;

    var identity = function (value) {
      return value;
    };

    var serialized = {};

    Object.keys(fields).forEach(function (key) {
      if (self[key]) {
        var handler = serializationHandlers[key] || identity;
        serialized[key] = handler(self[key]);
      }
    });

    return serialized;
  }

  digest() {
    var self = this;

    var computed = this._computedValues;

    if (computed) {
      Object.keys(computed).forEach(function (key) {
        var prop = {};
        var value = computed[key](self) || '';

        prop[key] = value;
        self.set(prop);
      });
    }
  }

  set(data) {
    var self = this;

    Object.keys(data).forEach(function (key) {
      if (self._definedProperty(key)) {
        self[key] = data[key];
      } else {
        throw new Error(key + ' is not defined');
      }
    });
  }

  _definedProperty(property) {
    var ownField = this._fields.hasOwnProperty(property);
    var computedField = this._computedValues.hasOwnProperty(property);

    return ownField || computedField;
  }
}
