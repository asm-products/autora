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


	unseenSubscriptions: computed('subscriptions.[]','subscriptions.isFulfilled', function(){

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
		this.notifyPropertyChange('unseenSubscriptions');
		}
	},
	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
