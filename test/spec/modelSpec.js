import {Symbiosis} from '../../../src/symbiosis.js';

describe('model specs', function () {
  describe('when model is persisted', function () {
    var User, model, id, fetched;

    beforeEach(function () {
      User = Symbiosis.Model.define('User', {
        firstname: 'string',
        lastname: 'string'
      });
    });

    beforeEach(function () {
      model = User.create({firstname: 'Kenny', lastname: 'McKormic'})
    });

    beforeEach(function (done) {
      model.save().then(function (model) {
        id = model.id;
      });
    });

    beforeEach(function (done) {
      User.get(id).then(function (model) {
        fetched = model;
      });
    });

    it('should be persisted', function () {
      expect(id).toBeDefined();
    });

    it('should be fetched', function () {
      expect(fetched.compare({firstname: 'Kenny', lastname: 'McKormic'})).toBeTruthy();
    });
  })
});
