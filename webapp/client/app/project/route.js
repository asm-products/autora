import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate(){
		
		this.render('project.create', {
			outlet: 'newProject'
		});
		this.render();
	},
});
