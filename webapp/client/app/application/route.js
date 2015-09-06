import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	init: function(){
		// this.get('session').restore();
	},

	actions: {
		transitionToProjectList: function(){
			this.transitionTo('project.contribute');
		},

		sessionAuthenticationSucceeded: function(){
			this.transitionTo('project.contribute');
		},

		sessionAuthenticationFailed: function(error){
			var alert = {};
			alert.type = 'danger';
			switch (error.code) {
		      case 'INVALID_EMAIL':
		        alert.message = 'The specified user account email is invalid.';
		        break;
		      case 'INVALID_PASSWORD':
		        alert.message = 'The specified user account password is incorrect.';
		        break;
		      case 'INVALID_USER':
		        alert.message = 'The specified user account does not exist.';
		        break;
		      default:
		        alert.message = 'Error logging user in: ' + error;
		    }
			this.controllerFor('user.login').set('alert', alert);
			this.controllerFor('user.login').set('isLoading', false);
		}
	}
});
