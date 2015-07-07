import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return null;
	},

	actions: {
		didTransition: function(){
			this.controller.setProperties({'alert': '', 'email' : '', 'password' : ''});
		}
	}
});
