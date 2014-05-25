import {ORM} from '../../src/orm.js';

describe('ORM', function () {
  it('should be defined', function () {
    expect(ORM).toBeDefined();
  });

  describe('Injector', function () {
    describe('register', function () {
      it('should register a new factory', function () {
        //TODO: Nah.. Needs better planning
        ORM.Core.Injector.register('name', 'something');
        ORM.Core.Injector.get('name').toBe('something');
      });
    });
  });
});