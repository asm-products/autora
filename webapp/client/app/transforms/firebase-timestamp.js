import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },

  serialize() {
    return Firebase.ServerValue.TIMESTAMP;
  }
});
