import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	init: function(){
		// this.get('session').restore();
		this._super(...arguments);
	},

	title: 'Autora.ink | Writing Just Got Collective.',

	actions: {
		transitionToProjectList(){
			this.transitionTo('project.contribute');
		},

		sessionInvalidated(){
			this.transitionTo('project.contribute');
		},

		sessionAuthenticationFailed(error){
			
		},

		didTransition(){
		},
		willTransition(){
			this.controller.set('showNotifications', false);
		}
	}
});
