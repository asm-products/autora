import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),

  pile: DS.belongsTo('pile'),
  project: DS.belongsTo('project'),

  likes: DS.hasMany('like'),

  order: DS.attr('number'),
  content: DS.attr('string'),

  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp')

  //+ likes, flags etc.
});
