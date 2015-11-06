import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Transform.extend({
    serialize: function(date) {
        // if (date === Firebase.ServerValue.TIMESTAMP){
        //     return date;
        // }

        return date;
    },
    deserialize: function(serialized) {
    return serialized;
  },
});
