import Ember from 'ember';

const {inject} = Ember;

export default Ember.Mixin.create({

	session: inject.service('session'),

	
	beforeModel(transition){
		if(!this.get('session.isAuthenticated')){
			transition.abort();
			this.transitionTo('user.login');
		}
	}
});
