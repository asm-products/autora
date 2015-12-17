import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	init: function(){
		// this.get('session').restore();
		this._super(...arguments);
	},

	title: 'Autora.ink | Writing Just Got Collective.',

	actions: {
		transitionToProjectList: function(){
			this.transitionTo('project.contribute');
		},

		sessionInvalidated: function(){
			this.transitionTo('project.contribute');
		},

		sessionAuthenticationFailed: function(error){
			
		}
	}
});
