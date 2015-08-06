import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),

  pile: DS.belongsTo('pile'),
  project: DS.belongsTo('project'),

  likes: DS.hasMany('like', {async: true}), //async false for embedded likes

  order: DS.attr('number'),
  content: DS.attr('string'),

  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp'),

  likedBy: Ember.computed.mapBy('likes', 'user'),
  likedByFix: Ember.computed.uniq('likedBy'),  //bugFix, might becuase EmberFire does not officialy support Ember 2.0
  amountOfLikes: Ember.computed.alias('likedByFix.length'),

  //+ likes, flags etc.
});
