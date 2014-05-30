import {BaseModel} from './base/base-model.js';

//TODO: Maybe factory should be a function that can be automatically dependancy injected?
//di.js anyone?

export var ModelFactory = {
  create: function (modelDefinition) {
    //TODO: Extend and configure BaseModel and return configured instance
    //Factory is responsible for getting all dependencies and preparing them (properties, validation, adapters etc)
    return new BaseModel();
  }
};