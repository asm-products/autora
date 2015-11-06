import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  user: DS.belongsTo('user', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  

});
