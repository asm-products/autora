import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';
import Ember from 'ember';



const {computed} = Ember;
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

  cachedPileCount: attr('number', {defaultValue: 0}),
  cachedCompetingEntryCount: attr('number', {defaultValue: 0}),
  cachedLikeCount: attr('number', {defaultValue: 0}),

  cachedProjectTimestamp: attr('', {defaultValue: Date.now()}),
  cachedPileTimestamp: attr('', {defaultValue: Date.now()}),
  cachedEntryTimestamp: attr('', {defaultValue: Date.now()}),


  likeCount: computed.alias('entry.likes.length'),
  competingEntryCount: computed.alias('pile.competingEntries.length'),
  pileCount: computed.alias('project.piles.length'),


  notification: computed('likeCount','competingEntriesCount','successfulEntriesCount', function(){
    const type = this.get('type');
    const childName = this.subscriptionTypes[type].childName;
    const childNameCap = childName.capitalize();
    const cachedCount = this.get('cached' + childNameCap + 'Count');
    const currentCount = this.get(childName + 'Count');
    const newChildCount = currentCount - cachedCount;
    if(newChildCount > 0){
      this.set('isSeen', true);
      this.cacheSubscription();
      return `${newChildCount} new ${newChildCount === 1 ? childName : this.subscriptionTypes[type].childPlural}`;
    }

  }),

  didUpdate(){
    console.log('didUpdate');
  },

  // childCountingAttr: computed('type', function(){
  // 	var type = this.get('type');

  // 	if(type === 'project') return 'entries';
  // 	if(type === 'pile') return 'competingEntries';
  // 	if(type === 'entry') return 'likes';
  // }),

  // childCount: computed('childCountingAttr', 'type', function(){

  // 	var type = this.get('type');
  // 	var capType = Ember.String.capitalize(type);
  // 	var cachedChildsCount = this.get('cached' + capType + 'Count');

  // 	var objectQuery = type + '.' + this.get('childCountingAttr') + '.length';
  // 	console.log(objectQuery);
  // 	var newChildsCount = this.get(objectQuery);
  // 	return newChildsCount;
  // }),

  cacheSubscription(){
    console.log('cache subscription');
    this.set('cachedLikeCount', this.get('likeCount'));
    this.set('cachedEntryCount', this.get('entryCount'));
    this.set('cachedPileCount', this.get('pileCount'));
    this.set('isSeen', false);
  }

});
