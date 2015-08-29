import Ember from 'ember';

export default Ember.Mixin.create({
	beforeModel: function(transition){
		if(!this.get('session.isAuthenticated')){
			transition.abort();
			this.transitionTo('user.login');
		}
	}
});
