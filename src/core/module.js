export class Module {

  constructor (factory) {
    this.factory = factory;
    this._definitions = [];
  }

  define (name, definitionObject) {
    return this._definitions[name] = this.factory(definitionObject);
  }

  get (name) {
    return this._definitions[name];
  }
}