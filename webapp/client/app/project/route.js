import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate(){
		// var projectCreateController = this.controllerFor('project.create');
		this.render('project.create', {
			outlet: 'newProject'
		});
		this.render();
	},
});
