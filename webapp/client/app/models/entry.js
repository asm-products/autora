import DS from 'ember-data';
import Ember from 'ember';
import TimestampSupport from 'client/mixins/timestamp-support';

export default DS.Model.extend(TimestampSupport, {
  user: DS.belongsTo('user', {async: true}),

  pile: DS.belongsTo('pile', {async: true}),
  project: DS.belongsTo('project'),

  likes: DS.hasMany('like', {async: true}), //async false for embedded likes

  order: DS.attr('number'),
  content: DS.attr('string'),

  likedBy: Ember.computed.mapBy('likes', 'user'),
  amountOfLikes: Ember.computed.alias('likedBy.length'),
  initialAmountOfLikes: DS.attr('number'),
 
});
