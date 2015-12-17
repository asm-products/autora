import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';
import Ember from 'ember';

function now(){
  return Date.now();
}

const {computed, isNone, on} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend(TimestampSupport, {

  subscriptionTypes: {
    entry: {
      childName: 'like',
      childPlural: 'likes'
    },
    pile: {
      childName: 'competingEntry',
      childPlural: 'entries'
    },
    project: {
      childName: 'pile',
      childPlural: 'piles'
    }
  },
  
  type: attr('string'),
  
  isSeen: attr('boolean', {defaultValue: false}),
  isRead: attr('boolean', {defaultValue: false}),

  user: belongsTo('user', {async: true}),
  // notification: belongsTo('notification'),

  project: belongsTo('project', {async: true}), // 
  entry: belongsTo('entry', {async: true}),
  pile: belongsTo('pile', {async: true}),

  cachedPileCount: attr('number', {defaultValue: 1}),
  cachedCompetingEntryCount: attr('number', {defaultValue: 1}),
  cachedLikeCount: attr('number', {defaultValue: 0}),

  cachedProjectTimestamp: attr('', {defaultValue: now}),
  cachedPileTimestamp: attr('', {defaultValue: now}),
  cachedEntryTimestamp: attr('', {defaultValue: now}),

  notificationTime: attr('', {defaultValue: now}),
  cachedNotificationTime: attr('', {defaultValue: now}),
  cachedNotification: attr('', {defaultValue: ''}),

  likeCount: computed.alias('entry.likes.length'),
  competingEntryCount: computed.alias('pile.competingEntries.length'),
  pileCount: computed.alias('project.piles.length'),


  notification: computed('likeCount','competingEntryCount','pileCount', function(){
    const type = this.get('type');
    console.log('notification', type);
    if(type){
      this.set('notificationTime', Date.now());
      const childName = this.subscriptionTypes[type].childName;
      const childNameCap = childName.capitalize();
      const cachedCount = this.get('cached' + childNameCap + 'Count');
      const currentCount = this.get(childName + 'Count');
      const newChildCount = currentCount - cachedCount;
      // if(newChildCount > 0){
        // this.set('notificationTime', Date.now());
        // console.log('should update notification Time');
        // return `${newChildCount} new ${newChildCount === 1 ? childName : this.subscriptionTypes[type].childPlural}`;
      // } else {
      //   return false;
      // }
      return `${currentCount} ${currentCount === 1 ? childName : this.subscriptionTypes[type].childPlural}`;
    }
  }),

  cacheSubscription(){
    console.log('cache subscription');
    this.set('cachedLikeCount', this.get('likeCount'));
    this.set('cachedEntryCount', this.get('entryCount'));
    this.set('cachedPileCount', this.get('pileCount'));
    this.set('isSeen', false);
  },

  didCreate2: on('didCreate', function(){

    console.log('didCreate');
    // this.set('notification', null);
    this.notifyPropertyChange('notification');
    
  })

});
