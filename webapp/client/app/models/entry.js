import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),

  pile: DS.belongsTo('pile'),
  project: DS.belongsTo('project'),

  order: DS.attr('number'),
  content: DS.attr('string'),
  
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  //+ likes, flags etc.
});
