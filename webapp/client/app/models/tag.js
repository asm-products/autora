import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';

const {hasMany, attr} = DS;


export default DS.Model.extend(TimestampSupport, {
  name: attr('string'),
  projects: hasMany('project', {async: true})
});
