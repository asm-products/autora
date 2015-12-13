import DS from 'ember-data';
import Ember from 'ember';
import TimestampSupport from 'client/mixins/timestamp-support';

const {belongsTo, hasMany, attr} = DS;
const {computed} = Ember;

export default DS.Model.extend(TimestampSupport, {

  order: attr('number'),
  content: attr('string'),
  initialAmountOfLikes: attr('number'),

  user: belongsTo('user', {async: true}),
  project: belongsTo('project', {async: true}),
  pile: belongsTo('pile', {async: true}),
  likes: hasMany('like', {async: true}), //async false for embedded likes


  likedBy: computed.mapBy('likes', 'user'),
  amountOfLikes: computed.alias('likedBy.length'),
 
});
