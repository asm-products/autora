import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';

const {belongsTo, hasMany, attr} = DS;

export default DS.Model.extend(TimestampSupport, {
  locked: attr('boolean'),
  closingDate: attr('date'),

  project: belongsTo('project', {async: true}),
  competingEntries: hasMany('entry', {async: true})
});
