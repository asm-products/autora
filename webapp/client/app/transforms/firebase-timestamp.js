import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },

  serialize: function(deserialized) {
    return Firebase.ServerValue.TIMESTAMP;
  }
});
