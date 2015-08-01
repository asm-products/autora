import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.DateTransform.extend({
    serialize: function(date) {
        if (date === Firebase.ServerValue.TIMESTAMP){
            return date;
        }

        return this._super(date);
    }
});
