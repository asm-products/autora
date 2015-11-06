import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Model.extend({
  description: DS.attr('string'),
  email: DS.attr('string'),
  photo: DS.attr('string'),
  cover: DS.attr('string'),
  username: DS.attr('string'),

  projects: DS.hasMany('project', {async: true}),

  uid: DS.attr('string'),

  createdAt: DS.attr('timestamp', {defaultValue: function(){
    return Firebase.ServerValue.TIMESTAMP;
  }}),
  updatedAt: DS.attr('firebase-timestamp'),
});
