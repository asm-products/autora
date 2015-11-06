import DS from 'ember-data';
import Firebase from 'firebase';

export default DS.Model.extend({
  project: DS.belongsTo('project', {async: true}),
  // successfulEntry: DS.belongsTo('entry'),
  locked: DS.attr('boolean'),
  closingDate: DS.attr('date'),

  competingEntries: DS.hasMany('entry', {async: true}),


  createdAt: DS.attr('string', {defaultValue: function(){
    return Firebase.ServerValue.TIMESTAMP;
  }}),
  updatedAt: DS.attr('firebase-timestamp'),
});
