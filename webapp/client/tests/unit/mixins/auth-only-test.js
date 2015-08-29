import Ember from 'ember';
import AuthOnlyMixin from '../../../mixins/auth-only';
import { module, test } from 'qunit';

module('Unit | Mixin | auth only');

// Replace this with your real tests.
test('it works', function(assert) {
  var AuthOnlyObject = Ember.Object.extend(AuthOnlyMixin);
  var subject = AuthOnlyObject.create();
  assert.ok(subject);
});
