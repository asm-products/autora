import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Transform.extend({
    serialize: function(date) {
    	console.log(date);
        return date;
    },
    deserialize: function(serialized) {
   	console.log('serialized');
   	console.log(serialized);
    return serialized;
  },

});
