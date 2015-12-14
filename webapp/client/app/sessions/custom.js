// app/initializers/custom-session.js
import Ember from 'ember';
import Session from 'simple-auth/session';

const {computed, isEmpty, inject} = Ember;

export default Session.extend({

	// store: inject.service('store'),

	user: computed('secure.user.uid', function(){
		var uid = this.get('secure.auth.uid');
		console.log(this.get('store'));
		if (!isEmpty(uid)) {

			var store = this.container.lookup('service:store');
			return store.find('user', uid);
		}
	}),


	subscriptions: computed('user', function(){
		var store = this.container.lookup('service:store');
		return store.findAll('subscription');

	}),

	unseenSubscriptions: computed('subscriptions.[]', function(){

		var subscriptions = this.get('subscriptions');
		if(subscriptions.get('isFulfilled')){
			return subscriptions.filterBy('isSeen', false);
		}
	}),

	// notifications: computed.mapBy('subscriptions', 'notification')
  
});
