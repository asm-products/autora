import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Transform.extend({
	
    serialize(date) {
        return date;
    },
    deserialize(serialized) {
    return serialized;
  },

});
