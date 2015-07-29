import Ember from 'ember';

export default Ember.Controller.extend({

	projectsCount: Ember.computed('model.projects',function(){
		console.log('user.index.index model.projects');
		console.log(this.get('model.projects'));
		return this.get('model.projects.length');
	}),
	openProjectsCount: Ember.computed('model.projects', function(){
		return this.get('model.projects').filterBy('open',true).get('length');
	}),
	completedProjectsCount: Ember.computed('projectsCount','openProjectsCount', function(){
		return this.get('projectsCount') - this.get('openProjectsCount');
	}),

	searchValue: '',

	filteredProjects: Ember.computed('model.projects','searchValue','sortProperty', function(){
		var projects = this.get('model.projects');

		var regex = new RegExp(this.get('searchValue'));

		return projects.filter(function(project){

			return regex.test(project.get('name'));
		});


	})
});
