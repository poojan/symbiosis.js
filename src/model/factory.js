import {BaseModel} from './base/base-model.js';

export var ModelFactory = {
  create: function (modelDefinition) {
    //TODO: Extend and configure BaseModel and return configured instance
    //Factory is responsible for getting all dependencies and preparing them (properties, validation, adapters etc)
    return new BaseModel();
  }
};