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

	addSubscription(record, type, store, project){
		


		var subscriptionData = {
			type: type,
			user: this.get('user'),
		};
		subscriptionData[type] = record;
		if(type !== 'project'){
			subscriptionData.project = project;
		}
		store.createRecord('subscription', subscriptionData).save();
	}

	// notifications: computed.mapBy('subscriptions', 'notification')
  
});
