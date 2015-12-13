import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

const {hasMany, attr} = DS;


export default DS.Model.extend(TimestampSupport, {
  description: attr('string'),
  email: attr('string'),
  photo: attr('string'),
  cover: attr('string'),
  username: attr('string'),
  admin: attr('boolean', {defaultValue: false}),

  projects: hasMany('project', {async: true}),

  uid: attr('string'), //unusued?


});
