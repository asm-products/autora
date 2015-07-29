import DS from 'ember-data';

export default DS.Model.extend({
  user:  DS.belongsTo('user', {async: true}),
  type: DS.attr('string'),
  inputLength: DS.attr('number'),
  inputType: DS.attr('string'), //paragraph, word..
  languageForm: DS.attr('string'),
  // tags: DS.attr(),
  name: DS.attr('string'),
  entries: DS.hasMany('entry'),

  open: DS.attr('boolean', {
    defaultValue: true
  }),
  
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
