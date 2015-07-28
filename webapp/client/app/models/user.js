import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  email: DS.attr('string'),
  photo: DS.attr('string'),
  username: DS.attr('string'),

  projects:DS.hasMany('project'), 
  
  uid: DS.attr('string'),
  
  createdAt: DS.attr('string'),
  updatedAt: DS.attr('string')
});
