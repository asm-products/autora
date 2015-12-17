import Ember from 'ember';
import UIDropdown from '../ui-dropdown/component';
import DS from 'ember-data';

const {computed, inject} = Ember;

export default UIDropdown.extend({
	classNames: ['notifications'],

	session: inject.service('session'),

	subscriptions: computed.alias('session.subscriptions'),
	
	subscriptionSorting: ['notificationTime:desc'],
	sortedSubscriptions: computed.sort('subscriptions','subscriptionSorting'),

	unseenSubscriptions: computed('subscriptions','subscriptions.@each.notification','subscriptions.@each.cachedNotification', function(){

		var subscriptions = this.get('subscriptions').toArray();
		let filterPromise = Ember.RSVP.filter(subscriptions, subscription => {
				var type = subscription.get('type');
				if(type){
				return subscription.get(type).then(() => {
						// var subscription1 = 
						console.log(subscription.get('notification'), '!=', subscription.get('cachedNotification'));
					return  (subscription.get('notification') != subscription.get('cachedNotification'));
				});
				}
		});

		return DS.PromiseArray.create({
			promise: filterPromise
		});
	}),

	dropdownToggled(){
		if(!this.get('showDropdown')){
			this.get('subscriptions').forEach(subscription => {
				console.log('toggled?');
				subscription.set('isSeen', true);
				subscription.set('cachedNotification', subscription.get('notification'));
				subscription.save();
			});
		}
	},
	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
