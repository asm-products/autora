import Ember from 'ember';

export default Ember.Route.extend({

	model() {
		return null;
	},

	actions: {
		didTransition() {
			this.controller.setProperties({'alert': '', 'email' : '', 'password' : ''});
		}
	}
});
