import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

const {computed, isEmpty, inject} = Ember;

export default SessionService.extend({

	// session: inject.service('session'),

	dataStore: inject.service('store'),

	user: computed('session.secure.user.uid', function(){
		var uid = this.get('session.secure.auth.uid');
		console.log(this.get('dataStore'));
		if (!isEmpty(uid)) {

			// var store = this.container.lookup('service:store');
			// this.set('store', store);
			var store = this.get('dataStore');
			return store.find('user', uid);
		}
	}),

	// store: null,


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

		if(type === 'pile'){
			console.log(this.get('subscriptions'));
			console.log(this.get('subscriptions').mapBy('pile.id'));
			// console.log(this.get('subscriptions').mapBy('pile'));
			let alreadyHasThisPileSubscription = this.get('subscriptions').mapBy('pile.id').contains(record.get('id'));
			console.log(alreadyHasThisPileSubscription);
			if(alreadyHasThisPileSubscription) return true;
		}

		var user = this.get('user');
		subscriptionData.user = user;
		store.createRecord('subscription', subscriptionData).save().then(() => {
			// user.save();
			store.peekRecord('user', user.get('id')).save();
		});
	},

	deleteSubscriptionForModel(type,model,store){
		var id = model.get('id');
		store = this.get('store');
		store.peekRecord(type, id).destroyRecord();
	}
});
