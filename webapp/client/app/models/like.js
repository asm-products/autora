import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';

const {belongsTo} = DS;

export default DS.Model.extend(TimestampSupport, {
  user: belongsTo('user', {async: true}),
  entry: belongsTo('entry', {async: true})
});
