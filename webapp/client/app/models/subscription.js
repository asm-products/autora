import DS from 'ember-data';
import TimestampSupport from 'client/mixins/timestamp-support';
import Ember from 'ember';



const {computed} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend(TimestampSupport, {

  type: attr('string'),

  user: belongsTo('user'),
  // notification: belongsTo('notification'),

  project: belongsTo('project'), // 
  entry: belongsTo('entry'),
  pile: belongsTo('pile'),

  cachedPileCount: attr('number', {defaultValue: 0}),
  cachedEntryCount: attr('number', {defaultValue: 0}),
  cachedLikeCount: attr('number', {defaultValue: 0}),

  cachedProjectTimestamp: attr('', {defaultValue: Date.now()}),
  cachedPileTimestamp: attr('', {defaultValue: Date.now()}),
  cachedEntryTimestamp: attr('', {defaultValue: Date.now()}),


  likeCount: computed.alias('entry.likes.length'),
  competingEntriesCount: computed.alias('pile.competingEntries.length'),
  successfulEntriesCount: computed.alias('project.entries.length'),

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

  }

});
