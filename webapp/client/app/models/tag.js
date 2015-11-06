import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Model.extend({
  name: DS.attr('string'),
  projects: DS.hasMany('project', {async: true}),

  createdAt: DS.attr('string', {defaultValue: function(){
    return Firebase.ServerValue.TIMESTAMP;
  }}),
  updatedAt: DS.attr('firebase-timestamp'),
});
