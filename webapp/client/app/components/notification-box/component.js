import Ember from 'ember';
import UIDropdown from '../ui-dropdown/component';

const {computed, inject} = Ember;

export default UIDropdown.extend({
	classNames: ['notifications'],

	session: inject.service('session'),

	subscriptions: computed.alias('session.subscriptions'),
	
	subscriptionSorting: ['notificationTime:desc'],
	sortedSubscriptions: computed.sort('subscriptions','subscriptionSorting'),

	unseenSubscriptions: computed('subscriptions','subscriptions.[].notificationTime','subscriptions.[].cachedNotificationTime', function(){

		console.log(this.get('subscriptions'));
		var subscriptions = this.get('subscriptions').toArray();
		let filterPromise = Ember.RSVP.filter(subscriptions, subscription => {
				var type = subscription.get('type');
				return subscription.get(type).then(() => {

					// return subscription.get('hasUnseenNotification');
					// return !subscription.get('isSeen') && (subscription.get('notification') !== false);
					return subscription.get('notificationTime') > subscription.get('cachedNotificationTime');
				});
		});

		return DS.PromiseArray.create({
			promise: filterPromise
		});
	}),

	dropdownToggled(){
		if(this.get('showDropdown')){
			this.get('subscriptions').forEach(subscription => {
				// subscription.set('isSeen', true);
				subscription.set('cachedNotificationTime', subscription.set('notificationTime'));
			});
		}
	},
	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
