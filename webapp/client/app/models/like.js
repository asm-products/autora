import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  
  // pile: DS.belongsTo('pile', {async: true}),

  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp'),

});
