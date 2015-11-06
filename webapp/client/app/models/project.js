import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  type: DS.attr('string'),
  inputLength: DS.attr('number'),
  inputType: DS.attr('string'), //paragraph, word..
  languageForm: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  open: DS.attr('boolean', {
    defaultValue: true
  }),

  user:  DS.belongsTo('user', {async: true}),
  tags: DS.hasMany('tag', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  piles: DS.hasMany('pile', {async: true}),

  image: DS.attr('string'),
  imageHost: DS.attr('string'),
});
