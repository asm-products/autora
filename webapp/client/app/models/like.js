import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  entry: DS.belongsTo('entry'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

});
