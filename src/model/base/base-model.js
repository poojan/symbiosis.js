'use strict';

class ModelInstance {

  contructor(properties, data, context) {
    this.context = context;
    this.properties = properties;
    set(data);
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

  //TODO: person.serialize(); //returns a serialized model (using the serialization handlers)

  //TODO: person.digest() //Triggers all digest listeners (computed values etc.)
  //the digest is supposed to make the model kick of an array of listeners.
  //Listeners may be validators and computed values for instance.
  //It is basically to be able to calculate different values at a given rate.
  //For example you have a $digest() in angular also that calls all watchers
  //to do different stuff on scope and trigger DOM events and changes based on the scopes data
  //digest = "eat all properties, and update your state accordingly"

  set(options) {
    var self = this;
    Object.keys(options).forEach(function (key) {
      //Don't allow overwriting interface methods and private variables (set, remove, ...)
      //TODO: Only set actual properties
      self[key] = options[key];
    });
  }
}

export class BaseModel {

  constructor(adapter) {
    //Register instances adapter, properties etc.
    this.__context = []; //Use some ES6 data structure more suited?
  }

  create(data) {
    var properties = [];
    return new ModelInstance(properties, data, this);
  }

  //TODO: Person.get(ID);
  //TODO: Person.find({name: 'Something'});
  // Returns promise that eventually should resolve into a person with proxies to the persons friends and projects
  // (or the populated data if it already is fetched somewhere else in the application
  //TODO: Person.find(/*...*/).populate('friends', 'projects');
  // Returns promise that eventually resolves into a person with its associated friends and projects populated

}
