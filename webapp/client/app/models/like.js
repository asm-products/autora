import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  
  // pile: DS.belongsTo('pile', {async: true}),

  createdAt: DS.attr('timestamp', {defaultValue: function(){
    return Firebase.ServerValue.TIMESTAMP;
  }}),
  updatedAt: DS.attr('firebase-timestamp'),

});
