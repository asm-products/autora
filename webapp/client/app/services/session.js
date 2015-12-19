import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

const {computed, isEmpty, inject} = Ember;

export default SessionService.extend({


	dataStore: inject.service('store'),
	subscriptionSorting: ['lastChildModelCreatedAt:desc'],
	sortedSubscriptions: computed.sort('subscriptions','subscriptionSorting'),

	user: computed('data.authenticated.auth.uid', function(){
		var uid = this.get('data.authenticated.auth.uid');
		if (!isEmpty(uid)) {

			var store = this.get('dataStore');
			return store.find('user', uid);
		}
	}),

	unseenSubscriptions: computed('subscriptions','subscriptions.@each.lastChildModelCreatedAt','subscriptions.@each.cachedLastChildModelCreatedAt', function(){

		var subscriptions = this.get('subscriptions').toArray();
		let filterPromise = Ember.RSVP.filter(subscriptions, subscription => {
				var type = subscription.get('type');
				if(type){
				return subscription.get(type).then(() => {
					// return  (subscription.get('notification') != subscription.get('cachedNotification'));
					return  (subscription.get('lastChildModelCreatedAt') != subscription.get('cachedLastChildModelCreatedAt'));
				});
				}
		});

		return DS.PromiseArray.create({
			promise: filterPromise
		});
	}),

	subscriptions: computed('user.subscriptions.[]', function(){
		var subscriptions = this.get('user.subscriptions');
		if(!subscriptions){
			subscriptions = [];
		}

		return subscriptions;
	}),

	addSubscription(record, type, project){

		var store = this.get('dataStore');

		var subscriptionData = {
			type: type,
			user: this.get('user'),
		};
		record = store.peekRecord(type, record.id);
		subscriptionData[type] = record;
		if(type !== 'project'){
			subscriptionData.project = project;
		}

		if(type === 'pile'){
			let alreadyHasThisPileSubscription = this.get('subscriptions').mapBy('pile.id').contains(record.get('id'));
			if(alreadyHasThisPileSubscription) return true;
		}

		var user = this.get('user');
		subscriptionData.user = user;
		var subscription = store.createRecord('subscription', subscriptionData);
		subscription.save().then(() => {
			store.peekRecord('user', user.get('id')).save();
		});
	},

	deleteSubscriptionForModel(type,model){
		var id = model.get('id');
		var store = this.get('dataStore');
		model.get('subscription.content').destroyRecord();


	}
});
