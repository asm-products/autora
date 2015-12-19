import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';
import Ember from 'ember';

function now(){
  return Date.now();
}

const {computed, isNone, on, inject} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend(TimestampSupport, {

  subscriptionTypes: {
    entry: {
      childName: 'like',
      childPlural: 'likes',
      childPluralLabel: 'likes'
    },
    pile: {
      childName: 'competingEntry',
      childPlural: 'competingEntries',
      childPluralLabel: 'entries'
    },
    project: {
      childName: 'pile',
      childPlural: 'piles',
      childPluralLabel: 'piles'
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

  // cachedPileCount: attr('number', {defaultValue: 1}),
  // cachedCompetingEntryCount: attr('number', {defaultValue: 1}),
  // cachedLikeCount: attr('number', {defaultValue: 0}),

  session: inject.service('session'),

  cachedProjectTimestamp: attr('', {defaultValue: now}),
  cachedPileTimestamp: attr('', {defaultValue: now}),
  cachedEntryTimestamp: attr('', {defaultValue: now}),

  notificationTime: attr('', {defaultValue: now}),
  cachedNotificationTime: attr('', {defaultValue: now}),
  cachedNotification: attr('', {defaultValue: ''}),

  cachedLastChildModelCreatedAt: attr('', {defaultValue: ''}),

  lastChildModel: computed.alias('subModelChildren.lastObject'),

  subModelChildren: computed('project.piles.[]', 'entry.likes.[]', 'pile.competingEntries.[]', function(){
    let type = this.get('type');
    if(type) {
      let childPlural = this.subscriptionTypes[type].childPlural;
      let childName = this.subscriptionTypes[type].childName;
      var childArray = this.get(type + '.' + childPlural);
     if(childArray){
        const currentUserId = this.get('session.user.id');
        return childArray.filter(record => {
          return record.get('user.id') !== currentUserId;
        });
      } else {
        console.log('===');
        console.log('childArray',childArray);
        console.log('childPlural',childPlural);
        console.log('type',type);
        console.log('type + . + childPlural',type + '.' + childPlural);
        console.log('===');

        return false;
      }
  }

  }),



  lastChildModelCreatedAt: computed('lastChildModel.createdAt', function(){
    // return this.get('lastChildModel.createdAt') ? this.get('lastChildModel.createdAt') : null;
    return this.getWithDefault('lastChildModel.createdAt', false);
  }),

  showNotification: computed('lastChildModel.user', function(){
    const modelCreator = this.get('lastChildModel.user');
    return !isNone(modelCreator);
  }),

  // notification: computed('subModelChildren.length', function(){
  //   let type = this.get('type');
  //   console.log('notifying');

  //   if(type && this.get('subModelChildren.isFulfilled')){

  //     const childName = this.subscriptionTypes[type].childName;
  //     const currentCount = this.get('subModelChildren.length');

  //     return `${currentCount} ${currentCount === 1 ? childName : this.subscriptionTypes[type].childPluralLabel}`;
  //   } else {
  //     return '';
  //   }
  // }),

  cacheSubscription(){
    console.log('cache subscription');
    this.set('cachedLikeCount', this.get('likeCount'));
    this.set('cachedEntryCount', this.get('entryCount'));
    this.set('cachedPileCount', this.get('pileCount'));
    this.set('isSeen', false);
  },

  didCreate2: on('ready', function(){

    this.notifyPropertyChange('notification');
    
  })

});
