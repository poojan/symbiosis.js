import {Module} from './core/module.js';
import {PropertyFactory} from './property/property-factory.js';
import {ModelFactory} from './model/model-factory.js';
import {ValidationFactory} from './validation/validation-factory.js';
import {AdapterFactory} from './adapter/adapter-factory.js';

export var Symbiosis = {
  Model: new Module(ModelFactory),
  Property: new Module(PropertyFactory),
  Validation: new Module(ValidationFactory),
  Adapter: new Module(AdapterFactory)
};

