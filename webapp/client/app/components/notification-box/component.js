import Ember from 'ember';
import UIDropdown from '../ui-dropdown/component';

const {computed} = Ember;

export default UIDropdown.extend({
	classNames: ['notifications'],

	subscriptions: computed.alias('session.subscriptions'),


	unseenSubscriptions: computed('subscriptions.[]', function(){

		var subscriptions = this.get('subscriptions');
		if(subscriptions.get('isFulfilled')){
			// return subscriptions.filterBy('isSeen', false);
			return subscriptions.filter((subscription) => {
				// console.log(subscription.get('isSeen'));
				return subscription.get('isSeen') === false;
			});
		}
	}),

	dropdownToggled(){
		this.notifyPropertyChange('unseenSubscriptions');
	},
	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
