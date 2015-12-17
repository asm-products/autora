import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

const {computed, isEmpty, inject} = Ember;

export default SessionService.extend({


	dataStore: inject.service('store'),

	user: computed('session.secure.user.uid', function(){
		var uid = this.get('session.secure.auth.uid');
		if (!isEmpty(uid)) {

			var store = this.get('dataStore');
			return store.find('user', uid);
		}
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
		subscriptionData[type] = record;
		if(type !== 'project'){
			subscriptionData.project = project;
		}

		if(type === 'pile'){
			let alreadyHasThisPileSubscription = this.get('subscriptions').mapBy('pile.id').contains(record.get('id'));
			console.log(alreadyHasThisPileSubscription);
			if(alreadyHasThisPileSubscription) return true;
		}

		var user = this.get('user');
		subscriptionData.user = user;
		store.createRecord('subscription', subscriptionData).save().then(() => {
			store.peekRecord('user', user.get('id')).save();
		});
	},

	deleteSubscriptionForModel(type,model){
		var id = model.get('id');
		var store = this.get('dataStore');
		model.get('subscription.content').destroyRecord();


	}
});
