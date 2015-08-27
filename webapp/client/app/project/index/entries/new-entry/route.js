import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//currently returns latest pile globally, should return last pile from a particular project
		var model = this.modelFor('project.index.entries');

		return model;
		// return this.modelFor('project.index.entries');
	},

	beforeModel: function (transition) {
		if (!this.get('session.isAuthenticated')) {
			transition.abort();
			this.transitionTo('user.login');
		}
	},

	afterModel: function(model){
		if(model.get('length') === 0){
			this.transitionTo('project.index.entries');
		}
	}
});
