import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),

  pile: DS.belongsTo('pile'),
  project: DS.belongsTo('project'),

  likes: DS.hasMany('like', {async: true}), //async false for embedded likes

  order: DS.attr('number'),
  content: DS.attr('string'),

  likedBy: Ember.computed.mapBy('likes', 'user'),
  amountOfLikes: Ember.computed.alias('likedBy.length'),
  initialAmountOfLikes: DS.attr('number'),
  // initialAmountOfLikes: function(){
  //   var self = this;
  //   console.log(this.get('content'));
  //   console.log(this.get('likes.length'));
  //   console.log(this.get('likedBy.length'));
  //   Ember.run.scheduleOnce('afterRender',function(){
  //     self.set('initialAmountOfLikes', self.get('amountOfLikes'));
  //     console.log(self.get('initialAmountOfLikes'));
  //   });
  // }.observes(''),
  createdAt: DS.attr('timestamp'),
  updatedAt: DS.attr('timestamp'),

  // likedByFix: Ember.computed.uniq('likedBy'),  //bugFix, might becuase EmberFire does not officialy support Ember 2.0

  //+ likes, flags etc.
});
