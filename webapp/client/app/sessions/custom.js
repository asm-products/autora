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


	subscriptions: computed('user.subscriptions.[]', function(){
		// var store = this.container.lookup('service:store');
		// return store.findAll('subscription');
		console.log('');
		var subscriptions = this.get('user.subscriptions');
		if(!subscriptions){
			subscriptions = [];
		}

		return subscriptions;
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
		var user = this.get('user');
		subscriptionData.user = user;
		store.createRecord('subscription', subscriptionData).save().then(() => {
			// user.save();
			store.peekRecord('user', user.get('id')).save();
		});
	}

	// notifications: computed.mapBy('subscriptions', 'notification')
  
});
