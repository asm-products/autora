import Ember from 'ember';
import DS from 'ember-data';
import Firebase from 'firebase';

export default Ember.Mixin.create({
	createdAt: DS.attr('timestamp', {defaultValue: function(){
    return Firebase.ServerValue.TIMESTAMP;
  }}),
  updatedAt: DS.attr('firebase-timestamp'),
    didCreate(){
      this.reload();
  }
});
