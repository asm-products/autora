import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project'),
  // successfulEntry: DS.belongsTo('entry'),
  locked: DS.attr('boolean'),
  closingDate: DS.attr('date'),

  competingEntries: DS.hasMany('entry'),
  
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
