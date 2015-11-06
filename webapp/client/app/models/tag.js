import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  name: DS.attr('string'),
  projects: DS.hasMany('project', {async: true}),

});
