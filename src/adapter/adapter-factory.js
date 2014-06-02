import {BaseAdapter} from './base/base-adapter.js';

/**
 * Define an adapter
 * @param adapterDefinition adapter definition object
 */
export var AdapterFactory = function (adapterDefinition) {
  //TODO: Extend and configure BaseAdapter and return configured instance
  //Factory is responsible for getting all dependencies and preparing them (Adapter etc)
  return new BaseAdapter();
};