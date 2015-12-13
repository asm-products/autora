import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

const {belongsTo} = Ember;

export default DS.Model.extend(TimestampSupport, {
	
  user: belongsTo('user', {async: true}),
  entry: belongsTo('entry', {async: true}),
  

});
