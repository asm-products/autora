import Ember from 'ember';
import DS from 'ember-data';
import Firebase from 'firebase';

const {attr} = DS;

export default Ember.Mixin.create({

	updatedAt: attr('firebase-timestamp'),
	createdAt: attr('timestamp', {defaultValue: function(){
		return Firebase.ServerValue.TIMESTAMP;
	}}),
	didCreate(){
		this.reload();
	}
});
