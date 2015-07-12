import DS from 'ember-data';

export default DS.Model.extend({
  creator:  DS.belongsTo('user'),
  type: DS.attr('string'),
  inputLength: DS.attr('number'),
  inputType: DS.attr('string'), //paragraph, word..
  languageForm: DS.attr('string'),
  tags: DS.attr(),
  name: DS.attr('string'),
  entries: DS.hasMany('entry'),
  
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
