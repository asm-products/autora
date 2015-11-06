import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  project: DS.belongsTo('project', {async: true}),
  // successfulEntry: DS.belongsTo('entry'),
  locked: DS.attr('boolean'),
  closingDate: DS.attr('date'),

  competingEntries: DS.hasMany('entry', {async: true}),

});
