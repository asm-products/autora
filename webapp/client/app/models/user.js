import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  email: DS.attr('string'),
  photo: DS.attr('string'),
  username: DS.attr('string'),

  projects: DS.hasMany('project', {async: true}),

  uid: DS.attr('string'),

  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp')
});
