import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';

const {belongsTo, hasMany, attr} = DS;

export default DS.Model.extend(TimestampSupport, {
  type: attr('string'),
  inputLength: attr('number'),
  inputType: attr('string'), //paragraph, word..
  languageForm: attr('string'),
  name: attr('string'),
  description: attr('string'),
  image: attr('string'),
  imageHost: attr('string'),
  open: attr('boolean', {
    defaultValue: true
  }),
  user:  belongsTo('user', {async: true}),
  tags: hasMany('tag', {async: true}),
  entries: hasMany('entry', {async: true}),
  piles: hasMany('pile', {async: true})
});
