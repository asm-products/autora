import Ember from 'ember';
import TimestampSupportMixin from '../../../mixins/timestamp-support';
import { module, test } from 'qunit';

module('Unit | Mixin | timestamp support');

// Replace this with your real tests.
test('it works', function(assert) {
  var TimestampSupportObject = Ember.Object.extend(TimestampSupportMixin);
  var subject = TimestampSupportObject.create();
  assert.ok(subject);
});
