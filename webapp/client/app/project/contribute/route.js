import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.store.findAll('project');
	},
	// setupController(controller, model){
	// 	var filteredProjects = model.filterBy('open', true);
	// 	controller.set('model', filteredProjects);
	// }
});
