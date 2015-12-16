import Ember from 'ember';
import UIDropdown from '../ui-dropdown/component';

const {computed} = Ember;

export default UIDropdown.extend({
	classNames: ['notifications'],

	subscriptions: computed.alias('session.subscriptions'),

	// allSubscriptionsReady: computed('subscriptions.[]', function(){
	// 	return this.get('subscriptions').every(subscription => {
	// 		return subscription.get('didLoadAll');
	// 	})
	// }),
	subscriptionSorting: ['notificationTime:desc'],
	sortedSubscriptions: computed.sort('subscriptions','subscriptionSorting'),


	unseenSubscriptions: computed('subscriptions','subscriptions.@each.isSeen','subscriptions.@each.notification', function(){

		console.log(this.get('subscriptions'));
		var subscriptions = this.get('subscriptions').toArray();
		let filterPromise = Ember.RSVP.filter(subscriptions, subscription => {
				var type = subscription.get('type');
				return subscription.get(type).then(() => {

					// return subscription.get('hasUnseenNotification');
					return !subscription.get('isSeen') && (subscription.get('notification') !== false);
				});
		});

		return DS.PromiseArray.create({
			promise: filterPromise
		});
	}),

	dropdownToggled(){
		if(this.get('showDropdown')){
			this.get('subscriptions').forEach(subscription => {
				subscription.set('isSeen', true);
			});
		}
	},
	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
