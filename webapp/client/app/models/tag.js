import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  project: DS.hasMany('project', {async: true}),

  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp'),
});
