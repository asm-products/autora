import DS from 'ember-data';
import Firebase from 'firebase';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  description: DS.attr('string'),
  email: DS.attr('string'),
  photo: DS.attr('string'),
  cover: DS.attr('string'),
  username: DS.attr('string'),

  projects: DS.hasMany('project', {async: true}),

  uid: DS.attr('string'),


});
