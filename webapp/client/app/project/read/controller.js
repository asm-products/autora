import Ember from 'ember';

export default Ember.Controller.extend({

	

	// projects: function(){
	// 	return this.store.all('project'); //testing purposes
	// }.property(),

	project: Ember.inject.controller('project'),
	filteredProjects: Ember.computed.filterBy('model', 'open', false)


	
});
